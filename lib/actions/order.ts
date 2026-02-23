"use server";

import { prisma } from "@/lib/prisma";
import {
  canAccessVenue,
  getAccessibleVenueIds,
  requireAuth,
  requirePermission,
  requireVenueAccess,
} from "@/lib/auth-helpers";
import { OrderStatus, OrderItemType, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { checkItemsAvailability } from "../utils";
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
  items: CreateOrderItem[];
  notes?: string;
};

export async function createOrder(input: CreateOrderInput) {
  try {
    const session = await requireAuth();

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

    const subtotal = input.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        venueId: input.venueId,
        orderNumber: generateOrderNumber(),
        subtotal,
        discount: 0,
        totalPrice: subtotal,
        status: "WAIT_PAYMENT",
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
        order_id: order.orderNumber,
        gross_amount: order.totalPrice,
      },
      item_details: order.items.map((item) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        name: item.name.substring(0, 50),
      })),
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
    };

    const transaction = await snap.createTransaction(parameter);

    await prisma.order.update({
      where: { id: order.id },
      data: {
        payment_url: transaction.redirect_url,
        snap_token: transaction.token,
        status: "WAIT_PAYMENT",
        payment_expireAt: new Date(Date.now() + 10 * 60 * 1000), // 30 minutes from now
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
  try {
    const venues = await getAccessibleVenueIds();
    await requirePermission("orders.view");
    const data = await prisma.order.findMany({
      where: {
        ...(venues.allAccess ? {} : { venueId: { in: venues.venueIds } }),
        status: { not: "CANCELLED" },
      },
      select: {
        id: true,
        orderNumber: true,
        totalPrice: true,
        status: true,
        notes: true,
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

    return { success: true, data: data };
  } catch (error) {
    console.error("Get orders error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Gagal mengambil data orders" };
  }
}

export async function getOrderById(id: string) {
  try {
    await getAccessibleVenueIds();
    await requirePermission("orders.view");
    const data = await prisma.order.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        orderNumber: true,
        totalPrice: true,
        status: true,
        notes: true,
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
    });

    if (data) {
      await canAccessVenue(data.venue.id);
      return { success: true, data };
    } else {
      return { success: false, message: "Order not found" };
    }
  } catch (error) {
    console.error("Get orders error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Gagal mengambil data orders" };
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
