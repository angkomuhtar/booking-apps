import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { OrderItemType } from "@prisma/client";
import { prisma } from "./prisma";
import { Court } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "CREATED":
      return { color: "bg-green-500", text: "Menunggu Pembayaran" };
    case "WAIT_PAYMENT":
      return { color: "bg-yellow-500", text: "Menunggu Pembayaran" };
    case "PAID":
      return { color: "bg-green-500", text: "Pembayaran Berhasil" };
    case "PROCESSING":
      return { color: "bg-purple-500", text: "Diproses" };
    case "COMPLETED":
      return { color: "bg-blue-500", text: "Selesai" };
    case "CANCELLED":
      return { color: "bg-red-500", text: "Dibatalkan" };
    case "REFUNDED":
      return { color: "bg-gray-500", text: "Dikembalikan" };
    default:
      return { color: "bg-purple-500", text: "Diproses" };
  }
};

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
          status: {
            in: ["CREATED", "WAIT_PAYMENT", "PAID", "PROCESSING", "COMPLETED"],
          },
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

export const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const minutesToTime = (minutes: number) => {
  const hrs = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const mins = (minutes % 60).toString().padStart(2, "0");
  return `${hrs}:${mins}`;
};

export const generateTimeSlots = (
  court: Court,
  startTime?: string,
  endTime?: string,
  selectedDate?: string,
) => {
  const slots = [];
  const startHour = timeToMinutes(startTime || "06:00");
  const endHour = timeToMinutes(endTime || "23:00");
  const duration = court.sessionDuration;

  for (let hour = startHour; hour < endHour; hour += duration) {
    const slotStartTime = minutesToTime(hour); // e.g., "06:00"
    const slotEndTime = minutesToTime(hour + duration); // e.g., "07:00"
    if (timeToMinutes(slotEndTime) > endHour) break;

    slots.push({
      id: `${court.id}-${selectedDate}-${slotStartTime}-${slotEndTime}`,
      startTime: slotStartTime,
      endTime: slotEndTime,
      duration,
      price: court.pricePerHour,
    });
  }
  return slots;
};

export { checkItemsAvailability };
export type { AvailabilityCheckResult };
