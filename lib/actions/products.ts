"use server";

import { prisma } from "@/lib/prisma";
import {
  getAccessibleVenueIds,
  requireAuth,
  requirePermission,
  requireVenueAccess,
} from "@/lib/auth-helpers";
import { OrderStatus, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from "zod";
import { ProductSchema } from "@/schema/products.schema";
import { uploadToR2 } from "../r2";

export async function getProducts() {
  try {
    const venues = await getAccessibleVenueIds();
    await requirePermission("products.view");
    const data = await prisma.product.findMany({
      where: {
        ...(venues.allAccess ? {} : { venueId: { in: venues.venueIds } }),
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        isActive: true,
        imageUrl: true,
        createdAt: true,
        venue: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data };
  } catch (error) {
    console.error("Get orders error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Gagal mengambil data orders" };
  }
}

export async function createProduct(input: z.infer<typeof ProductSchema>) {
  try {
    await requirePermission("products.create");

    const validatedData = ProductSchema.parse(input);

    const buffer = Buffer.from(
      await validatedData.imageUrl?.file.arrayBuffer(),
    );

    const url = await uploadToR2(
      buffer,
      validatedData.imageUrl?.file.name,
      validatedData.imageUrl?.file.type,
      "products",
    );

    if (!url) {
      throw new Error("Gagal mengupload gambar produk");
    }

    const product = await prisma.product.create({
      data: {
        venueId: input.venueId,
        name: input.name,
        description: input.description,
        price: input.price,
        stock: input.stock,
        imageUrl: url || null,
        isActive: input.isActive,
      },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product berhasil dibuat",
      data: product,
    };
  } catch (error) {
    console.error("Create product error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Gagal membuat product" };
  }
}

export async function deleteProduct(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return { success: false, message: "Product tidak ditemukan" };
    }

    await requireVenueAccess(product.venueId);
    await requirePermission("products.delete");

    await prisma.product.update({
      where: { id: productId },
      data: { isActive: false },
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product berhasil dihapus" };
  } catch (error) {
    console.error("Delete product error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Gagal menghapus product" };
  }
}

export async function updateProductStatus(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return { success: false, message: "Product tidak ditemukan" };
    }

    await requireVenueAccess(product.venueId);
    await requirePermission("products.update");

    await prisma.product.update({
      where: { id: productId },
      data: { isActive: !product.isActive },
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product berhasil diupdate" };
  } catch (error) {
    console.error("Update product error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Gagal mengupdate product" };
  }
}

export async function updateProduct(
  productId: string,
  input: z.infer<typeof ProductSchema>,
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return { success: false, message: "Product tidak ditemukan" };
    }

    await requireVenueAccess(product.venueId);
    await requirePermission("products.update");

    const validatedData = ProductSchema.parse(input);

    let imageUrl = product.imageUrl;

    if (validatedData.imageUrl?.file) {
      const buffer = Buffer.from(
        await validatedData.imageUrl.file.arrayBuffer(),
      );

      const url = await uploadToR2(
        buffer,
        validatedData.imageUrl.file.name,
        validatedData.imageUrl.file.type,
        "products",
      );

      if (url) {
        imageUrl = url;
      }
    }

    await prisma.product.update({
      where: { id: productId },
      data: {
        venueId: validatedData.venueId,
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        stock: validatedData.stock,
        imageUrl: imageUrl,
        isActive: validatedData.isActive,
      },
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product berhasil diupdate" };
  } catch (error) {
    console.error("Update product error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Gagal mengupdate product" };
  }
}

export async function getUserOrders(userId: string) {
  const session = await requireAuth();

  if (session.user.id !== userId && session.user.role === "USER") {
    throw new Error("Forbidden: Cannot access other user's orders");
  }

  return await prisma.order.findMany({
    where: { userId },
    select: {
      id: true,
      orderNumber: true,
      totalPrice: true,
      status: true,
      createdAt: true,
      venue: {
        select: {
          id: true,
          name: true,
          address: true,
          city: true,
        },
      },
      items: {
        select: {
          id: true,
          itemType: true,
          name: true,
          price: true,
          quantity: true,
          date: true,
          startTime: true,
          endTime: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getVenueOrders(venueId: string) {
  await requireVenueAccess(venueId);

  return await prisma.order.findMany({
    where: { venueId },
    select: {
      id: true,
      orderNumber: true,
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
      items: {
        select: {
          id: true,
          itemType: true,
          name: true,
          price: true,
          quantity: true,
          date: true,
          startTime: true,
          endTime: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrdersByStatus(status: OrderStatus) {
  return await prisma.order.findMany({
    where: { status },
    select: {
      id: true,
      orderNumber: true,
      totalPrice: true,
      status: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      venue: {
        select: {
          id: true,
          name: true,
        },
      },
      items: {
        select: {
          id: true,
          itemType: true,
          name: true,
          price: true,
          quantity: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUpcomingCourtBookings(userId: string) {
  const session = await requireAuth();

  if (session.user.id !== userId && session.user.role === "USER") {
    throw new Error("Forbidden: Cannot access other user's orders");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return await prisma.order.findMany({
    where: {
      userId,
      status: {
        in: ["WAIT_PAYMENT", "PAID", "PROCESSING"],
      },
      items: {
        some: {
          itemType: "COURT_BOOKING",
          date: {
            gte: today,
          },
        },
      },
    },
    select: {
      id: true,
      orderNumber: true,
      totalPrice: true,
      status: true,
      venue: {
        select: {
          id: true,
          name: true,
          address: true,
          city: true,
        },
      },
      items: {
        where: {
          itemType: "COURT_BOOKING",
          date: {
            gte: today,
          },
        },
        select: {
          id: true,
          itemId: true,
          name: true,
          price: true,
          date: true,
          startTime: true,
          endTime: true,
          duration: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderStats(venueId?: string) {
  const whereClause: Prisma.OrderWhereInput = {};

  if (venueId) {
    await requireVenueAccess(venueId);
    whereClause.venueId = venueId;
  }

  const [total, pending, paid, processing, completed, cancelled] =
    await Promise.all([
      prisma.order.count({ where: whereClause }),
      prisma.order.count({ where: { ...whereClause, status: "WAIT_PAYMENT" } }),
      prisma.order.count({ where: { ...whereClause, status: "PAID" } }),
      prisma.order.count({ where: { ...whereClause, status: "PROCESSING" } }),
      prisma.order.count({ where: { ...whereClause, status: "COMPLETED" } }),
      prisma.order.count({ where: { ...whereClause, status: "CANCELLED" } }),
    ]);

  return {
    total,
    pending,
    paid,
    processing,
    completed,
    cancelled,
  };
}

export async function getCourtBookingsForDate(courtId: string, date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return await prisma.orderItem.findMany({
    where: {
      itemType: "COURT_BOOKING",
      itemId: courtId,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
      order: {
        status: {
          in: ["WAIT_PAYMENT", "PAID", "PROCESSING", "COMPLETED"],
        },
      },
    },
    select: {
      id: true,
      startTime: true,
      endTime: true,
      duration: true,
      order: {
        select: {
          id: true,
          status: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: { startTime: "asc" },
  });
}
