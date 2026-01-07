import { prisma } from "@/lib/prisma";

export async function getPopularVenues() {
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
      createdAt: true,
      _count: {
        select: { courts: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getVenueById(venueId: string) {
  try {
    const venue = await prisma.venue.findUnique({
      where: { id: venueId },
      include: {
        city: true,
        province: true,
        venueImages: {
          orderBy: { order: "asc" },
        },
        venueFacilities: {
          include: {
            facility: true,
          },
        },
        courts: {
          include: {
            courtType: true,
            floorType: true,
            pricing: true,
          },
        },
        venueReviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            venueReviewImages: {
              select: {
                id: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    if (!venue) {
      return { success: false, data: null, message: "Venue tidak ditemukan" };
    }

    return { success: true, data: venue };
  } catch (error) {
    console.error("Get venue by ID error:", error);
    return {
      success: false,
      data: null,
      message: "Gagal mengambil data venue",
    };
  }
}
