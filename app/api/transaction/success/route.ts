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

    const isSettlement = order.paymentStatus === "DP_PAID";
    // const paymentAmount = isSettlement
    //   ? (order.remainingAmount ?? 0)
    //   : (order.dpAmount ?? order.totalPrice);
    // const paymentType = isSettlement
    //   ? "FULL_PAYMENT"
    //   : order.dpAmount
    //     ? "DOWN_PAYMENT"
    //     : "FULL_PAYMENT";

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
        dpPaidAt:
          !isSettlement && order.dpAmount ? new Date() : order.dpPaidAt,
      },
    });

    // PaymentHistory dibuat dari webhook notification Midtrans
    // prisma.paymentHistory.create({
    //   data: {
    //     orderId,
    //     amount: paymentAmount,
    //     paymentMethod: order.paymentMethod ?? "ONLINE",
    //     paymentType,
    //     transactionId: `${order.orderNumber}-${paymentType === "DOWN_PAYMENT" ? "DP" : "SETTLE"}`,
    //     paidBy: session.user.id,
    //   },
    // }),

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 },
    );
  }
}
