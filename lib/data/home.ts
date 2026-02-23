import { prisma } from "@/lib/prisma";
import { requireVenueAccess } from "@/lib/auth-helpers";



export async function getVenueById(id: string) {
  const venue = await prisma.venue.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      address: true,
      city: true,
      province: true,
      location: true,
      openingTime: true,
      closingTime: true,
      venueImages: true,
      createdAt: true,
      courts: {
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          type: true,
          floorType: true,
          pricePerHour: true,
          sessionDuration: true,
        },
        orderBy: { name: "asc" },
      },
      venueFacilities: {
        select: {
          facility: {
            select: {
              id: true,
              name: true,
              icon: true,
            },
          },
        },
      },
    },
  });

  if (!venue) {
    throw new Error("Venue not found");
  }

  return venue;
}

export async function getVenuesWithCourts() {
  return await prisma.venue.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      address: true,
      city: true,
      province: true,
      venueImages: {
        where: { isPrimary: true },
        take: 1,
      },
      courts: {
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          type: true,
          pricePerHour: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function searchVenues(query: string) {
  return await prisma.venue.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { city: { name: { contains: query, mode: "insensitive" } } },
        { address: { contains: query, mode: "insensitive" } },
      ],
      courts: {
        some: { isActive: true },
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
      address: true,
      city: true,
      venueImages: {
        where: { isPrimary: true },
        take: 1,
      },
      _count: {
        select: { courts: true },
      },
    },
  });
}

export async function getVenueForAdmin(id: string) {
  await requireVenueAccess(id);

  return await prisma.venue.findUnique({
    where: { id },
    include: {
      courts: {
        orderBy: { name: "asc" },
      },
      venueAccess: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      },
      venueFacilities: {
        include: {
          facility: true,
        },
      },
      venueImages: true,
    },
  });
}

export async function getVenuesByCity(city: string) {
  return await prisma.venue.findMany({
    where: {
      city: {
        name: {
          contains: city,
          mode: "insensitive",
        },
      },
      courts: {
        some: { isActive: true },
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
      address: true,
      city: true,
      venueImages: {
        where: { isPrimary: true },
        take: 1,
      },
      _count: {
        select: { courts: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function getVenueStats(venueId: string) {
  await requireVenueAccess(venueId);

  const [totalCourts, activeCourts, totalOrders, pendingOrders] =
    await Promise.all([
      prisma.court.count({
        where: { venueId },
      }),
      prisma.court.count({
        where: { venueId, isActive: true },
      }),
      prisma.order.count({
        where: { venueId },
      }),
      prisma.order.count({
        where: {
          venueId,
          status: "WAIT_PAYMENT",
        },
      }),
    ]);

  return {
    totalCourts,
    activeCourts,
    totalOrders,
    pendingOrders,
  };
}
