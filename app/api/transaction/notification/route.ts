import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { snap } from "@/lib/midtrans";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const statusResponse = await snap.transaction.notification(body);
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    const order = await prisma.order.findUnique({
      where: { orderNumber: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    let newStatus = order.status;

    if (transactionStatus === "capture") {
      if (fraudStatus === "accept") {
        newStatus = "PAID";
      }
    } else if (transactionStatus === "settlement") {
      newStatus = "PAID";
    } else if (
      transactionStatus === "cancel" ||
      transactionStatus === "deny" ||
      transactionStatus === "expire"
    ) {
      newStatus = "CANCELLED";
    } else if (transactionStatus === "pending") {
      newStatus = "WAIT_PAYMENT";
    } else if (transactionStatus === "refund") {
      newStatus = "REFUNDED";
    }

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: newStatus,
        paymentMethod: statusResponse.payment_type,
        paidAt: newStatus === "PAID" ? new Date() : null,
      },
    });

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Error processing notification:", error);
    return NextResponse.json(
      { error: "Failed to process notification" },
      { status: 500 },
    );
  }
}
