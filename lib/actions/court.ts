"use server";

import { prisma } from "@/lib/prisma";
import {
  getAccessibleVenueIds,
  requirePermission,
  requireVenueAccess,
} from "@/lib/auth-helpers";
import { CourtSchema } from "@/schema/courts.schema";
import z from "zod";
import { revalidatePath } from "next/cache";

export async function getCourts() {
  const venues = await getAccessibleVenueIds();
  const courts = await prisma.court.findMany({
    where: {
      ...(venues.allAccess ? {} : { venueId: { in: venues.venueIds } }),
    },
    select: {
      id: true,
      name: true,
      type: true,
      floor: true,
      pricePerHour: true,
      isActive: true,
      sessionDuration: true,
      venue: {
        select: {
          id: true,
          name: true,
          city: true,
        },
      },
      courtType: {
        select: {
          id: true,
          name: true,
        },
      },
      floorType: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });

  return { success: true, data: courts };
}

export async function createCourt(data: z.infer<typeof CourtSchema>) {
  try {
    await requireVenueAccess(data.venueId);
    await requirePermission("courts.create");

    const validatedData = CourtSchema.parse(data);

    const court = await prisma.court.create({
      data: {
        name: validatedData.name,
        type: validatedData.type,
        floor: validatedData.floor,
        pricePerHour: validatedData.pricePerHour,
        sessionDuration: validatedData.sessionDuration,
        venueId: validatedData.venueId,
        isActive: validatedData.isActive,
      },
    });

    revalidatePath("/admin/courts");
    return {
      success: true,
      message: "Court berhasil dibuat",
      courtId: court.id,
    };
  } catch (error) {
    console.error("Create court error:", error);
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Gagal membuat court",
    };
  }
}

export async function updateCourt(
  courtId: string,
  data: z.infer<typeof CourtSchema>
) {
  try {
    const court = await prisma.court.findUnique({
      where: { id: courtId },
    });

    if (!court) {
      return { success: false, message: "Court not found" };
    }

    await requireVenueAccess(court.venueId);
    await requirePermission("courts.update");

    const validatedData = CourtSchema.parse(data);

    await prisma.court.update({
      where: { id: courtId },
      data: {
        name: validatedData.name,
        type: validatedData.type,
        floor: validatedData.floor,
        pricePerHour: validatedData.pricePerHour,
        sessionDuration: validatedData.sessionDuration,
        isActive: validatedData.isActive,
      },
    });

    revalidatePath("/admin/courts");

    return {
      success: true,
      message: "Court berhasil diupdate",
    };
  } catch (error) {
    console.error("Update court error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Gagal mengupdate court" };
  }
}

export async function deleteCourt(courtId: string) {
  try {
    const court = await prisma.court.findUnique({
      where: { id: courtId },
    });

    if (!court) {
      return {
        success: false,
        message: "Court not found",
      };
    }

    await requireVenueAccess(court.venueId);
    await requirePermission("courts.delete");

    await prisma.court.delete({
      where: { id: courtId },
    });

    revalidatePath("/admin/courts");

    return {
      success: true,
      message: "Court berhasil dihapus",
    };
  } catch (error) {
    console.error("Delete court error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Gagal menghapus court",
    };
  }
}

export async function updateCourtStatus(courtId: string) {
  try {
    const court = await prisma.court.findUnique({
      where: { id: courtId },
    });

    if (!court) {
      return {
        success: false,
        message: "Court not found",
      };
    }
    await requireVenueAccess(court.venueId);
    await requirePermission("courts.update");

    await prisma.court.update({
      where: { id: courtId },
      data: {
        isActive: !court.isActive,
      },
    });

    revalidatePath("/admin/courts");

    return {
      success: true,
      message: "Status court berhasil diupdate",
    };
  } catch (error) {
    console.error("Update court status error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Gagal mengupdate status court",
    };
  }
}

export async function getCourtById(id: string) {
  const court = await prisma.court.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      type: true,
      floorType: true,
      pricePerHour: true,
      sessionDuration: true,
      isActive: true,
      venueId: true,
      venue: {
        select: {
          id: true,
          name: true,
          address: true,
          city: true,
        },
      },
      pricing: {
        select: {
          id: true,
          dayType: true,
          startTime: true,
          endTime: true,
          price: true,
          discount: true,
        },
        orderBy: { startTime: "asc" },
      },
    },
  });

  if (!court) {
    return { success: false, message: "Court not found" };
  }
  await requireVenueAccess(court.venueId);
  return { success: true, data: court };
}

export async function getCourtsByVenueId(venueId: string) {
  return await prisma.court.findMany({
    where: {
      venueId,
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      type: true,
      floorType: true,
      pricePerHour: true,
      sessionDuration: true,
    },
    orderBy: { name: "asc" },
  });
}

export async function getCourtsByType(type: string) {
  return await prisma.court.findMany({
    where: {
      type,
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      type: true,
      floorType: true,
      pricePerHour: true,
      sessionDuration: true,
      venue: {
        select: {
          id: true,
          name: true,
          city: true,
        },
      },
    },
    orderBy: [{ venue: { name: "asc" } }, { name: "asc" }],
  });
}

export async function getCourtsForAdmin(venueId: string) {
  await requireVenueAccess(venueId);

  return await prisma.court.findMany({
    where: { venueId },
    include: {
      pricing: {
        orderBy: { startTime: "asc" },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function getCourtWithBookings(courtId: string, date: Date) {
  const court = await prisma.court.findUnique({
    where: { id: courtId },
    select: {
      id: true,
      name: true,
      type: true,
      pricePerHour: true,
      sessionDuration: true,
      venue: {
        select: {
          id: true,
          name: true,
          openingTime: true,
          closingTime: true,
        },
      },
    },
  });

  if (!court) {
    throw new Error("Court not found");
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const bookings = await prisma.orderItem.findMany({
    where: {
      itemType: "COURT_BOOKING",
      itemId: courtId,
      date: {
        gte: startOfDay,
        lt: endOfDay,
      },
      order: {
        status: {
          in: ["PENDING", "PAID", "PROCESSING"],
        },
      },
    },
    select: {
      id: true,
      startTime: true,
      endTime: true,
      order: {
        select: {
          status: true,
        },
      },
    },
    orderBy: { startTime: "asc" },
  });

  return {
    ...court,
    bookings: bookings.map((b) => ({
      id: b.id,
      startTime: b.startTime,
      endTime: b.endTime,
      status: b.order.status,
    })),
  };
}

export async function getAvailableTimeSlots(courtId: string, date: Date) {
  const court = await getCourtWithBookings(courtId, date);

  const bookedSlots = court.bookings.map((booking) => ({
    start: booking.startTime,
    end: booking.endTime,
  }));

  return {
    court,
    bookedSlots,
  };
}
