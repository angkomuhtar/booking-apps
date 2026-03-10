import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { snap } from "@/lib/midtrans";

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
      include: {
        items: true,
        user: true,
        venue: true,
      },
    });

    console.log(order);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (order.status !== "CREATED" || order.paymentStatus !== "UNPAID") {
      return NextResponse.json(
        { error: "Order is not pending" },
        { status: 400 },
      );
    }

    if (order.status == "CREATED" && order.paymentStatus == "UNPAID") {
      return NextResponse.json({
        token: order.snap_token,
        redirect_url: order.payment_url,
      });
    }

    const paymentType =
      order.dpAmount && order.dpAmount > 0 ? "DOWN_PAYMENT" : "FULL_PAYMENT";

    const parameter = {
      transaction_details: {
        order_id: order.orderNumber,
        gross_amount: order.totalPrice,
      },
      item_details: [
        {
          id: order.id,
          price:
            paymentType === "DOWN_PAYMENT" ? order.dpAmount! : order.totalPrice,
          quantity: 1,
          name: `Pembayaran ${paymentType === "DOWN_PAYMENT" ? "Down Payment" : "Penuh"} untuk Order ${order.orderNumber}`,
          payment_type: paymentType,
        },
      ],
      expiry: {
        unit: "minutes",
        duration: 10,
      },
      customer_details: {
        first_name: order.user.name || "Customer",
        email: order.user.email || undefined,
      },
      callbacks: {
        finish: `${process.env.NEXTAUTH_URL}/orders`,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    await prisma.order.update({
      where: { id: orderId },
      data: {
        payment_url: transaction.redirect_url,
        snap_token: transaction.token,
        status: "CREATED",
        paymentStatus: "UNPAID",
        payment_expireAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
      },
    });

    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 },
    );
  }
}
