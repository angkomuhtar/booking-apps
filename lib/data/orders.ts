import { requireAuth } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export async function getOrders() {
  try {
    const session = await requireAuth();
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
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
      return { success: false, data: null, message: "Venue tidak ditemukan" };
    }

    return { success: true, data: orders, message: "Berhasil mengambil data" };
  } catch {
    return {
      success: false,
      data: null,
      message: "Gagal mengambil data venue",
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
