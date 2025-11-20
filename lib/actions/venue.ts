"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireVenueAdmin } from "@/lib/auth-helpers";
import {
  createVenueSchema,
  updateVenueSchema,
  type CreateVenueInput,
  type UpdateVenueInput,
} from "@/schema/venues.schema";

export async function createVenue(data: CreateVenueInput) {
  try {
    const session = await requireVenueAdmin();
    
    const validatedData = createVenueSchema.parse(data);

    const venue = await prisma.venue.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        address: validatedData.address,
        city: validatedData.city,
        province: validatedData.province,
        rules: validatedData.rules,
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

    if (session.user.role === "VENUE_ADMIN") {
      await prisma.venueAdmin.create({
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

export async function updateVenue(venueId: string, data: UpdateVenueInput) {
  try {
    const session = await requireAuth();
    
    if (session.user.role === "SUPER_ADMIN") {
    } else if (session.user.role === "VENUE_ADMIN") {
      const venueAdmin = await prisma.venueAdmin.findUnique({
        where: {
          userId_venueId: {
            userId: session.user.id,
            venueId: venueId,
          },
        },
      });

      if (!venueAdmin) {
        return {
          success: false,
          message: "Anda tidak memiliki akses ke venue ini",
        };
      }
    } else {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const validatedData = updateVenueSchema.parse(data);

    await prisma.venue.update({
      where: { id: venueId },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        address: validatedData.address,
        city: validatedData.city,
        province: validatedData.province,
        rules: validatedData.rules,
      },
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

    if (session.user.role === "SUPER_ADMIN") {
    } else if (session.user.role === "VENUE_ADMIN") {
      const venueAdmin = await prisma.venueAdmin.findUnique({
        where: {
          userId_venueId: {
            userId: session.user.id,
            venueId: venueId,
          },
        },
      });

      if (!venueAdmin) {
        return {
          success: false,
          message: "Anda tidak memiliki akses ke venue ini",
        };
      }
    } else {
      return {
        success: false,
        message: "Unauthorized",
      };
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
