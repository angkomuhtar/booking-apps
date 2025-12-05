import { prisma } from "@/lib/prisma";
import { requireAuth, requireVenueAccess } from "@/lib/auth-helpers";
import { BookingStatus, Prisma } from "@prisma/client";

export async function getBookings() {
  return await prisma.booking.findMany({
    select: {
      id: true,
      date: true,
      startTime: true,
      endTime: true,
      totalPrice: true,
      status: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      court: {
        select: {
          id: true,
          name: true,
          venue: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getBookingById(id: string) {
  const booking = await prisma.booking.findUnique({
    where: { id },
    select: {
      id: true,
      date: true,
      startTime: true,
      endTime: true,
      duration: true,
      totalPrice: true,
      status: true,
      paymentProof: true,
      notes: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      court: {
        select: {
          id: true,
          name: true,
          type: true,
          venue: {
            select: {
              id: true,
              name: true,
              address: true,
              city: true,
            },
          },
        },
      },
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking;
}

export async function getUserBookings(userId: string) {
  const session = await requireAuth();
  
  if (session.user.id !== userId && session.user.role === "USER") {
    throw new Error("Forbidden: Cannot access other user's bookings");
  }

  return await prisma.booking.findMany({
    where: { userId },
    select: {
      id: true,
      date: true,
      startTime: true,
      endTime: true,
      totalPrice: true,
      status: true,
      createdAt: true,
      court: {
        select: {
          id: true,
          name: true,
          type: true,
          venue: {
            select: {
              id: true,
              name: true,
              address: true,
              city: true,
            },
          },
        },
      },
    },
    orderBy: [{ date: "desc" }, { startTime: "desc" }],
  });
}

export async function getVenueBookings(venueId: string) {
  await requireVenueAccess(venueId);

  return await prisma.booking.findMany({
    where: {
      court: { venueId },
    },
    select: {
      id: true,
      date: true,
      startTime: true,
      endTime: true,
      totalPrice: true,
      status: true,
      paymentProof: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      court: {
        select: {
          id: true,
          name: true,
          type: true,
        },
      },
    },
    orderBy: [{ date: "desc" }, { startTime: "desc" }],
  });
}

export async function getCourtBookings(
  courtId: string,
  startDate?: Date,
  endDate?: Date
) {
  const court = await prisma.court.findUnique({
    where: { id: courtId },
    select: { venueId: true },
  });

  if (!court) {
    throw new Error("Court not found");
  }

  await requireVenueAccess(court.venueId);

  const whereClause: Prisma.BookingWhereInput = { courtId };

  if (startDate || endDate) {
    whereClause.date = {};
    if (startDate) {
      whereClause.date.gte = startDate;
    }
    if (endDate) {
      whereClause.date.lte = endDate;
    }
  }

  return await prisma.booking.findMany({
    where: whereClause,
    select: {
      id: true,
      date: true,
      startTime: true,
      endTime: true,
      totalPrice: true,
      status: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
  });
}

export async function getBookingsByStatus(status: BookingStatus) {
  return await prisma.booking.findMany({
    where: { status },
    select: {
      id: true,
      date: true,
      startTime: true,
      endTime: true,
      totalPrice: true,
      status: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      court: {
        select: {
          id: true,
          name: true,
          venue: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPendingBookings() {
  return getBookingsByStatus("PENDING");
}

export async function getUpcomingBookings(userId: string) {
  const session = await requireAuth();
  
  if (session.user.id !== userId && session.user.role === "USER") {
    throw new Error("Forbidden: Cannot access other user's bookings");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return await prisma.booking.findMany({
    where: {
      userId,
      date: {
        gte: today,
      },
      status: {
        in: ["PENDING", "CONFIRMED"],
      },
    },
    select: {
      id: true,
      date: true,
      startTime: true,
      endTime: true,
      totalPrice: true,
      status: true,
      court: {
        select: {
          id: true,
          name: true,
          type: true,
          venue: {
            select: {
              id: true,
              name: true,
              address: true,
              city: true,
            },
          },
        },
      },
    },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
  });
}

export async function getBookingStats(venueId?: string) {
  const whereClause: Prisma.BookingWhereInput = {};

  if (venueId) {
    await requireVenueAccess(venueId);
    whereClause.court = { venueId };
  }

  const [total, pending, confirmed, cancelled, completed] = await Promise.all([
    prisma.booking.count({ where: whereClause }),
    prisma.booking.count({ where: { ...whereClause, status: "PENDING" } }),
    prisma.booking.count({ where: { ...whereClause, status: "CONFIRMED" } }),
    prisma.booking.count({ where: { ...whereClause, status: "CANCELLED" } }),
    prisma.booking.count({ where: { ...whereClause, status: "COMPLETED" } }),
  ]);

  return {
    total,
    pending,
    confirmed,
    cancelled,
    completed,
  };
}
