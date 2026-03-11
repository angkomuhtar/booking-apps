"use server";

import { requireAuth } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { OrderItemType, OrderStatus, PaymentType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { checkItemsAvailability } from "../availability";
import { snap } from "../midtrans";

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

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

type CreateOrderInput = {
  venueId: string;
  paymentType: "DOWN_PAYMENT" | "FULL_PAYMENT";
  notes?: string;
  items: CreateOrderItem[];
};

export async function getOrders(status?: OrderStatus) {
  try {
    const session = await requireAuth();

    const where =
      status == "CREATED"
        ? {
            userId: session.user.id,
            status: status as OrderStatus,
            paymentStatus: "UNPAID" as const,
          }
        : {
            userId: session.user.id,
            status: status as OrderStatus | undefined,
          };

    const orders = await prisma.order.findMany({
      where: where,
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

export async function createOrder(input: CreateOrderInput) {
  try {
    const session = await requireAuth();

    if (!session) {
      return { success: false, message: "Unauthorized" };
    }
    if (!input.items || input.items.length === 0) {
      return { success: false, message: "Keranjang kosong" };
    }

    const availability = await checkItemsAvailability(input.items);
    if (!availability.available) {
      const reasons = availability.unavailableItems
        .map((item) => `${item.name}: ${item.reason}`)
        .join(", ");
      return {
        success: false,
        message: `Beberapa item tidak tersedia: ${reasons}`,
        unavailableItems: availability.unavailableItems,
      };
    }

    const discount = 0; // Contoh diskon, bisa dihitung berdasarkan kode promo atau aturan lainnya
    const subtotal = input.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const subtotalAfterDiscount = subtotal - discount;
    const tax = Math.ceil(subtotalAfterDiscount * 0.11); // Contoh pajak 11%
    const total = subtotalAfterDiscount + tax;
    const dpAmount =
      input.paymentType === "DOWN_PAYMENT" ? Math.ceil(total * 0.5) : 0;
    const remainingAmount = total - dpAmount;

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        venueId: input.venueId,
        orderNumber: generateOrderNumber(),
        subtotal,
        discount,
        tax,
        dpAmount,
        remainingAmount,
        totalPrice: total,
        status: "CREATED",
        paymentStatus: "UNPAID",
        notes: input.notes,
        items: {
          create: input.items.map((item) => ({
            itemType: item.itemType,
            itemId: item.itemId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            date: item.date ? new Date(item.date) : null,
            startTime: item.startTime,
            endTime: item.endTime,
            duration: item.duration,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    const parameter = {
      transaction_details: {
        order_id: `${order.orderNumber}-${input.paymentType === "DOWN_PAYMENT" ? "DP" : "SETTLE"}`,
        gross_amount: input.paymentType === "DOWN_PAYMENT" ? dpAmount : total,
      },
      item_details: [
        {
          id: order.id,
          price: input.paymentType === "DOWN_PAYMENT" ? dpAmount : total,
          quantity: 1,
          name: `Pembayaran ${input.paymentType === "DOWN_PAYMENT" ? "DP" : "Penuh"}`,
          payment_type: input.paymentType,
        },
      ],
      expiry: {
        unit: "minutes",
        duration: 10,
      },
      customer_details: {
        first_name: session.user.name || "Customer",
        email: session.user.email || undefined,
      },
      callbacks: {
        finish: `${process.env.NEXTAUTH_URL}/orders`,
      },
      custom_field1: input.paymentType,
      custom_field2: order.id,
    };

    const transaction = await snap.createTransaction(parameter);

    await prisma.order.update({
      where: { id: order.id },
      data: {
        payment_url: transaction.redirect_url,
        snap_token: transaction.token,
        payment_expireAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
      },
    });

    revalidatePath("/bookings");

    return {
      success: true,
      message: "Order berhasil dibuat",
      data: {
        id: order.id,
        orderNumber: order.orderNumber,
        totalPrice: order.totalPrice,
      },
    };
  } catch (error) {
    console.error("Create order error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Gagal membuat order" };
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

export async function cancelOrder(orderId: string) {
  try {
    // const session = await requireAuth();
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return { success: false, message: "Order tidak ditemukan" };
    }

    if (order.status === "COMPLETED" || order.status === "BOOKED") {
      return {
        success: false,
        message: "Order sudah dibayar, tidak bisa dibatalkan",
      };
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" },
    });
    revalidatePath("/orders");
    return { success: true, message: "Order berhasil dibatalkan" };
  } catch (error) {
    console.error("Cancel order error:", error);
    return { success: false, message: "Gagal membatalkan order" };
  }
}
