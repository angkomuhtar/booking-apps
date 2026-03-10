import { OrderItemType } from "@prisma/client";
import { prisma } from "./prisma";

type CreateOrderItem = {
  itemType: OrderItemType;
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  date?: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
};

type AvailabilityCheckResult = {
  available: boolean;
  unavailableItems: {
    name: string;
    reason: string;
  }[];
};

async function checkItemsAvailability(
  items: CreateOrderItem[],
): Promise<AvailabilityCheckResult> {
  const unavailableItems: { name: string; reason: string }[] = [];

  const courtItems = items.filter((item) => item.itemType === "COURT_BOOKING");
  const productItems = items.filter((item) => item.itemType === "PRODUCT");

  for (const item of courtItems) {
    if (!item.date || !item.startTime || !item.endTime) {
      unavailableItems.push({
        name: item.name,
        reason: "Data booking tidak lengkap",
      });
      continue;
    }

    const court = await prisma.court.findUnique({
      where: { id: item.itemId },
      select: { id: true, isActive: true },
    });

    if (!court) {
      unavailableItems.push({
        name: item.name,
        reason: "Lapangan tidak ditemukan",
      });
      continue;
    }

    if (!court.isActive) {
      unavailableItems.push({
        name: item.name,
        reason: "Lapangan tidak aktif",
      });
      continue;
    }

    const bookingDate = new Date(item.date);
    const startOfDay = new Date(bookingDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(bookingDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingBookings = await prisma.orderItem.findMany({
      where: {
        itemType: "COURT_BOOKING",
        itemId: item.itemId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        order: {
          OR: [
            {
              status: {
                in: ["BOOKED", "COMPLETED"],
              },
            },
            {
              status: "CREATED",
              paymentStatus: "UNPAID",
              payment_expireAt: {
                gt: new Date(),
              },
            },
          ],
        },
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    const hasConflict = existingBookings.some((booking) => {
      if (!booking.startTime || !booking.endTime) return false;
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;
      const itemStart = item.startTime!;
      const itemEnd = item.endTime!;
      return itemStart < bookingEnd && itemEnd > bookingStart;
    });

    if (hasConflict) {
      unavailableItems.push({
        name: item.name,
        reason: `Jadwal ${item.startTime} - ${item.endTime} sudah dibooking`,
      });
    }
  }

  if (productItems.length > 0) {
    const productIds = productItems.map((item) => item.itemId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true, stock: true, isActive: true },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    for (const item of productItems) {
      const product = productMap.get(item.itemId);

      if (!product) {
        unavailableItems.push({
          name: item.name,
          reason: "Produk tidak ditemukan",
        });
        continue;
      }

      if (!product.isActive) {
        unavailableItems.push({
          name: item.name,
          reason: "Produk tidak tersedia",
        });
        continue;
      }

      if (product.stock < item.quantity) {
        unavailableItems.push({
          name: item.name,
          reason:
            product.stock === 0
              ? "Stok habis"
              : `Stok tersisa ${product.stock}`,
        });
      }
    }
  }

  return {
    available: unavailableItems.length === 0,
    unavailableItems,
  };
}

export { checkItemsAvailability };
export type { AvailabilityCheckResult, CreateOrderItem };
