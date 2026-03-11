import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { snap } from "@/lib/midtrans";
import { OrderStatus, PaymentStatus } from "@prisma/client";

function getPaymentMethod(statusResponse: Record<string, unknown>): string {
  const paymentType = statusResponse.payment_type as string;

  if (paymentType === "bank_transfer") {
    const vaNumbers = statusResponse.va_numbers as { bank: string }[];
    if (vaNumbers?.[0]?.bank) {
      return `VA_${vaNumbers[0].bank.toUpperCase()}`;
    }
    const permataVa = statusResponse.permata_va_number;
    if (permataVa) return "VA_PERMATA";
    return "BANK_TRANSFER";
  }

  return paymentType?.toUpperCase() ?? "ONLINE";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const statusResponse = await snap.transaction.notification(body);

    const midtransOrderId = statusResponse.order_id as string;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;
    const grossAmount = parseFloat(
      statusResponse.gross_amount as string,
    ).toFixed(2);

    const [orderNumber, paymentSuffix] = midtransOrderId.split(/-(?=[^-]+$)/);
    const isSettlement = paymentSuffix === "SETTLE";

    const order = await prisma.order.findUnique({
      where: { orderNumber },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const paymentMethod = getPaymentMethod(
      statusResponse as unknown as Record<string, unknown>,
    );
    let newStatus: OrderStatus = order.status;
    let newPaymentStatus: PaymentStatus = order.paymentStatus;
    const isPaid =
      transactionStatus === "settlement" ||
      (transactionStatus === "capture" && fraudStatus === "accept");

    if (isPaid) {
      newStatus = "BOOKED";
      if (isSettlement) {
        newPaymentStatus = "FULLY_PAID";
      } else {
        newPaymentStatus = order.dpAmount ? "DP_PAID" : "FULLY_PAID";
      }
    } else if (
      transactionStatus === "cancel" ||
      transactionStatus === "deny" ||
      transactionStatus === "expire"
    ) {
      if (order.paymentStatus === "UNPAID") {
        newStatus = "CANCELLED";
      }
    } else if (transactionStatus === "refund") {
      newStatus = "REFUNDED";
    }

    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: newStatus,
          paymentStatus: newPaymentStatus,
          paymentMethod,
          paidAt: isPaid && !isSettlement ? new Date() : order.paidAt,
          dpPaidAt:
            isPaid && !isSettlement && order.dpAmount
              ? new Date()
              : order.dpPaidAt,
          remainingAmount: isPaid && isSettlement ? 0 : order.remainingAmount,
        },
      });

      if (isPaid) {
        await tx.paymentHistory.create({
          data: {
            orderId: order.id,
            amount: grossAmount,
            paymentMethod,
            paymentType: isSettlement
              ? "FULL_PAYMENT"
              : order.dpAmount
                ? "DOWN_PAYMENT"
                : "FULL_PAYMENT",
            transactionId: statusResponse.transaction_id as string,
          },
        });
      }
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
