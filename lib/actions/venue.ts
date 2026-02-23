"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAccessibleVenueIds, requireAuth } from "@/lib/auth-helpers";
import {
  createVenueSchema,
  updateVenueSchema,
  CreateVenueInput,
} from "@/schema/venues.schema";
import { Prisma } from "@prisma/client";
import z from "zod";
import { uploadToR2 } from "../r2";

export async function createVenue(data: CreateVenueInput) {
  try {
    const session = await requireAuth();

    const validatedData = createVenueSchema.parse(data);

    const uploadedUrls = await Promise.all(
      data.images.map(async (img, index) => {
        const buffer = Buffer.from(await img.file.arrayBuffer());
        const url = await uploadToR2(
          buffer,
          img.file.name,
          img.file.type,
          "venues",
        );
        return {
          url: url,
          order: index,
          isPrimary: img.isPrimary || index === 0,
        };
      }),
    );

    const venue = await prisma.venue.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        address: validatedData.address,
        cityId: validatedData.city,
        provinceId: validatedData.province || "",
        rules: validatedData.rules || "",
        openingTime: validatedData.openingTime,
        closingTime: validatedData.closingTime,
        venueImages: {
          createMany: {
            data: uploadedUrls.map((img) => ({
              imageUrl: img.url,
              order: img.order,
              isPrimary: img.isPrimary,
            })),
          },
        },
      },
    });

    if (validatedData.facilities && validatedData.facilities.length > 0) {
      await prisma.venueFacility.createMany({
        data: validatedData.facilities.map((facilityId) => ({
          venueId: venue.id,
          facilityId: facilityId,
        })),
      });
    }

    if (!session.user.accessAllVenues) {
      await prisma.venueAccess.create({
        data: {
          userId: session.user.id,
          venueId: venue.id,
        },
      });
    }

    revalidatePath("/admin/venues");

    return {
      success: true,
      message: "Venue berhasil dibuat",
      venueId: venue.id,
    };
  } catch (error) {
    console.error("Create venue error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Gagal membuat venue",
    };
  }
}

export async function updateVenue(
  venueId: string,
  data: z.infer<typeof updateVenueSchema>,
) {
  try {
    const session = await requireAuth();

    if (session.user.role === "Super Admin" || session.user.accessAllVenues) {
    } else {
      const venueAccess = await prisma.venueAccess.findUnique({
        where: {
          userId_venueId: {
            userId: session.user.id,
            venueId: venueId,
          },
        },
      });

      if (!venueAccess) {
        return {
          success: false,
          message: "Anda tidak memiliki akses ke venue ini",
        };
      }
    }

    const validatedData = updateVenueSchema.parse(data);

    const updateData: Prisma.VenueUpdateInput = {
      name: validatedData.name,
      description: validatedData.description,
      address: validatedData.address,
      city: validatedData.city
        ? { connect: { id: validatedData.city } }
        : undefined,
      province: validatedData.province
        ? { connect: { id: validatedData.province } }
        : undefined,
    };

    if (validatedData.images && validatedData.images.length > 0) {
      updateData.venueImages = {
        createMany: {
          data: validatedData.images.map((img, index) => ({
            imageUrl: img.url,
            order: img.order || index,
            isPrimary: img.isPrimary || index === 0,
          })),
        },
      };
    }

    await prisma.venue.update({
      where: { id: venueId },
      data: updateData,
    });
    if (validatedData.facilities) {
      await prisma.venueFacility.deleteMany({
        where: { venueId },
      });

      if (validatedData.facilities.length > 0) {
        await prisma.venueFacility.createMany({
          data: validatedData.facilities.map((facilityId) => ({
            venueId: venueId,
            facilityId: facilityId,
          })),
        });
      }
    }

    revalidatePath("/admin/venues");
    revalidatePath(`/admin/venues/${venueId}`);

    return {
      success: true,
      message: "Venue berhasil diupdate",
    };
  } catch (error) {
    console.error("Update venue error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Gagal mengupdate venue",
    };
  }
}

export async function deleteVenue(venueId: string) {
  try {
    const session = await requireAuth();

    if (session.user.role === "Super Admin" || session.user.accessAllVenues) {
    } else {
      const venueAccess = await prisma.venueAccess.findUnique({
        where: {
          userId_venueId: {
            userId: session.user.id,
            venueId: venueId,
          },
        },
      });

      if (!venueAccess) {
        return {
          success: false,
          message: "Anda tidak memiliki akses ke venue ini",
        };
      }
    }

    await prisma.venue.delete({
      where: { id: venueId },
    });

    revalidatePath("/admin/venues");

    return {
      success: true,
      message: "Venue berhasil dihapus",
    };
  } catch (error) {
    console.error("Delete venue error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Gagal menghapus venue",
    };
  }
}

export async function getFacilities() {
  try {
    const facilities = await prisma.facility.findMany({
      orderBy: { name: "asc" },
    });

    return facilities;
  } catch (error) {
    console.error("Get facilities error:", error);
    return [];
  }
}

export async function getVenues() {
  try {
    const venueslist = await getAccessibleVenueIds();

    const venues = await prisma.venue.findMany({
      where: {
        ...(venueslist.allAccess ? {} : { id: { in: venueslist.venueIds } }),
      },
      include: {
        city: true,
        province: true,
        courts: true,
        venueFacilities: {
          include: {
            facility: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: venues };
  } catch (error) {
    console.error("Get venues error:", error);
    return { success: false, data: [], message: "Gagal mengambil data venues" };
  }
}

export async function getVenueById(venueId: string) {
  try {
    const venue = await prisma.venue.findUnique({
      where: { id: venueId },
      include: {
        city: true,
        province: true,
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

export async function getVenueProduct(venueId: string, query?: string) {
  try {
    const venue = await prisma.product.findMany({
      where: {
        venueId: venueId,
        isActive: true,
        ...(query ? { name: { contains: query, mode: "insensitive" } } : {}),
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

export async function getVenueCourts(venueId: string) {
  try {
    const venue = await prisma.venue.findUnique({
      where: { id: venueId },
      include: {
        city: true,
        province: true,
        courts: {
          include: {
            courtType: true,
            floorType: true,
            pricing: true,
            courtImages: true,
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
