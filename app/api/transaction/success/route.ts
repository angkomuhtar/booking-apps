import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 },
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const isSettlement = order.dpAmount && order.dpAmount > 0 ? false : true;

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "BOOKED",
        paymentStatus: isSettlement
          ? "FULLY_PAID"
          : order.dpAmount && order.dpAmount > 0
            ? "DP_PAID"
            : "FULLY_PAID",
        remainingAmount: isSettlement ? 0 : order.remainingAmount,
        paidAt: isSettlement ? order.paidAt : new Date(),
        dpPaidAt: !isSettlement && order.dpAmount ? new Date() : order.dpPaidAt,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 },
    );
  }
}
