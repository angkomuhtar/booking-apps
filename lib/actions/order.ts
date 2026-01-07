"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth, requireVenueAccess } from "@/lib/auth-helpers";
import { OrderStatus, OrderItemType, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
  items: CreateOrderItem[];
  notes?: string;
};

export async function createOrder(input: CreateOrderInput) {
  try {
    const session = await requireAuth();

    if (!input.items || input.items.length === 0) {
      return { success: false, message: "Keranjang kosong" };
    }

    const subtotal = input.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        venueId: input.venueId,
        orderNumber: generateOrderNumber(),
        subtotal,
        discount: 0,
        totalPrice: subtotal,
        status: "PENDING",
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

export async function getOrders() {
  return await prisma.order.findMany({
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
          date: true,
          startTime: true,
          endTime: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderById(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    select: {
      id: true,
      orderNumber: true,
      subtotal: true,
      discount: true,
      totalPrice: true,
      status: true,
      paymentMethod: true,
      paymentProof: true,
      notes: true,
      paidAt: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
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
          itemId: true,
          name: true,
          price: true,
          quantity: true,
          date: true,
          startTime: true,
          endTime: true,
          duration: true,
        },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
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

export async function getPendingOrders() {
  return getOrdersByStatus("PENDING");
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
        in: ["PENDING", "PAID", "PROCESSING"],
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
      prisma.order.count({ where: { ...whereClause, status: "PENDING" } }),
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
          in: ["PENDING", "PAID", "PROCESSING", "COMPLETED"],
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
