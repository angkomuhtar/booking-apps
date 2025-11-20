import { prisma } from "@/lib/prisma";
import { requireVenueAccess } from "@/lib/auth-helpers";
import { CourtType } from "@prisma/client";

export async function getCourts() {
  return await prisma.court.findMany({
    where: { isActive: true },
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
    orderBy: { name: "asc" },
  });
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
    throw new Error("Court not found");
  }

  return court;
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

export async function getCourtsByType(type: CourtType) {
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
      _count: {
        select: { bookings: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function getCourtWithBookings(
  courtId: string,
  date: Date
) {
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
        },
      },
      bookings: {
        where: {
          date: {
            gte: new Date(date.setHours(0, 0, 0, 0)),
            lt: new Date(date.setHours(23, 59, 59, 999)),
          },
          status: {
            in: ["PENDING", "CONFIRMED"],
          },
        },
        select: {
          id: true,
          startTime: true,
          endTime: true,
          status: true,
        },
        orderBy: { startTime: "asc" },
      },
    },
  });

  if (!court) {
    throw new Error("Court not found");
  }

  return court;
}

export async function getAvailableTimeSlots(
  courtId: string,
  date: Date
) {
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
