import { prisma } from "../prisma";

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
            in: ["CREATED", "BOOKED", "CANCELLED", "COMPLETED"],
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
