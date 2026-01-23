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

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (order.status !== "CREATED" && order.status !== "WAIT_PAYMENT") {
      return NextResponse.json(
        { error: "Order is not pending" },
        { status: 400 },
      );
    }

    if (order.status == "WAIT_PAYMENT") {
      return NextResponse.json({
        token: order.snap_token,
        redirect_url: order.payment_url,
      });
    }

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
        status: "WAIT_PAYMENT",
        payment_expireAt: new Date(Date.now() + 10 * 60 * 1000), // 30 minutes from now
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
