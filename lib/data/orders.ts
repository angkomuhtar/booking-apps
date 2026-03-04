import { requireAuth } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function getOrders(status?: OrderStatus) {
  try {
    const session = await requireAuth();
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
        ...(status ? { status } : {}),
      },
      include: {
        venue: true,
        items: {
          orderBy: {
            itemType: "asc",
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!orders) {
      return { success: false, data: null, message: "Orders tidak ditemukan" };
    }

    return { success: true, data: orders, message: "Berhasil mengambil data" };
  } catch {
    return {
      success: false,
      data: null,
      message: "Gagal mengambil data orders",
    };
  }
}

export async function getBookedCourts(venueId: string, date: string) {
  try {
    const data = await prisma.orderItem.findMany({
      select: {
        itemId: true,
      },
      where: {
        date,
        order: {
          venueId,
          status: {
            in: ["WAIT_PAYMENT", "PAID", "PROCESSING", "COMPLETED"],
          },
        },
      },
    });

    if (!data) {
      return { success: false, data: null, message: "Data tidak ditemukan" };
    }
    return { success: true, data, message: "Berhasil mengambil data" };
  } catch (error) {
    console.error("Get booked courts error:", error);
    return {
      success: false,
      data: null,
      message: "Gagal mengambil data booked courts",
    };
  }
}
