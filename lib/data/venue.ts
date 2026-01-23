import { prisma } from "@/lib/prisma";

export async function getPopularVenues() {
  const venues = await prisma.venue.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      address: true,
      city: true,
      province: true,
      totalReviews: true,
      rating: true,
      venueImages: {
        where: { isPrimary: true },
        take: 1,
      },
      createdAt: true,
      _count: {
        select: { courts: true },
      },
      courts: {
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          type: true,
          courtType: true,
          pricePerHour: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return venues.map((venue) => {
    const lowestPrice =
      venue.courts.length > 0
        ? Math.min(...venue.courts.map((court) => Number(court.pricePerHour)))
        : null;

    return {
      ...venue,
      lowestPrice,
      courtTypes: [
        ...new Set(venue.courts.map((court) => court.courtType?.name)),
      ],
    };
  });
}

export async function getVenues() {
  const venues = await prisma.venue.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      address: true,
      city: true,
      province: true,
      totalReviews: true,
      rating: true,
      venueImages: {
        where: { isPrimary: true },
        take: 1,
      },
      createdAt: true,
      _count: {
        select: { courts: true },
      },
      courts: {
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          type: true,
          courtType: true,
          pricePerHour: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return venues.map((venue) => {
    const lowestPrice =
      venue.courts.length > 0
        ? Math.min(...venue.courts.map((court) => Number(court.pricePerHour)))
        : null;

    return {
      ...venue,
      lowestPrice,
      courtTypes: [
        ...new Set(venue.courts.map((court) => court.courtType?.name)),
      ],
    };
  });
}

export async function getBookedSlots(courtIds: string[], date: string) {
  try {
    const bookedSlots = await prisma.orderItem.findMany({
      where: {
        itemType: "COURT_BOOKING",
        itemId: { in: courtIds },
        date: new Date(date),
        order: {
          status: { in: ["WAIT_PAYMENT", "PAID", "PROCESSING", "COMPLETED"] },
        },
      },
      select: {
        itemId: true,
        startTime: true,
        endTime: true,
      },
    });

    return bookedSlots;
  } catch (error) {
    console.error("Get booked slots error:", error);
    return [];
  }
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
            courtImages: true,
          },
        },
        products: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            description: true,
            imageUrl: true,
            price: true,
            stock: true,
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

export async function getProductsByVenue(venueId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        venueId,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        price: true,
        stock: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: products };
  } catch (error) {
    console.error("Get products by venue error:", error);
    return {
      success: false,
      data: [],
      message: "Gagal mengambil data produk",
    };
  }
}
