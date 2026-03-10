"use client";
import { CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { PaymentButton } from "@/components/payment-button";
import { CountdownTimer } from "@/components/countdown-timer";
import {
  AccordionContent,
  AccordionItem,
  AccordionTriggerCust,
} from "@/components/ui/accordion";
import { getStatusColor } from "@/lib/utils";
import { OrderWithItems } from "./types";
import { toast } from "sonner";
import { cancelOrder } from "@/lib/data/orders";
import { useState } from "react";

interface DesktopOrderCardProps {
  order: OrderWithItems;
  index: number;
}

export function DesktopOrderCard({ order, index }: DesktopOrderCardProps) {
  const [loading, setLoading] = useState(false);

  const courtItems = order.items.filter(
    (item) => item.itemType === "COURT_BOOKING",
  );
  const productItems = order.items.filter(
    (item) => item.itemType === "PRODUCT",
  );

  const handleCancel = async (orderId: string) => {
    setLoading(true);
    const result = await cancelOrder(orderId);
    setLoading(false);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const HeaderTitle = ({
    value,
    title,
  }: {
    value: string | React.ReactNode;
    title: string;
  }) => (
    <div className='gap-2'>
      <p className='text-xs text-muted-foreground mb-1.5'>{title}</p>
      <h2 className='text-sm font-semibold'>{value}</h2>
    </div>
  );

  return (
    <AccordionItem
      value={`item-${index + 1}`}
      className='bg-card text-card-foreground flex flex-col rounded-xl shadow-sm py-0 border border-muted mb-6'>
      <AccordionTriggerCust className='py-0'>
        <div className='flex-1 flex items-center gap-6 px-6 bg-muted rounded-t-lg py-4'>
          <HeaderTitle value={order.venue.name} title='Venue' />
          <HeaderTitle
            value={`#${String(order.orderNumber).slice(-4).toUpperCase()}`}
            title='OrderId'
          />
          <HeaderTitle
            value={`Rp ${order.totalPrice.toLocaleString()}`}
            title='Total Price'
          />
          <HeaderTitle
            value={format(order.createdAt, "dd MMM yyyy")}
            title='Order Date'
          />
          <HeaderTitle
            value={
              <Badge className={getStatusColor(order.status)?.color}>
                {getStatusColor(order.status)?.text}
              </Badge>
            }
            title='Status'
          />
          {order.status === "CREATED" &&
            order.paymentStatus === "UNPAID" &&
            order.payment_expireAt && (
              <HeaderTitle
                value={<CountdownTimer expireAt={order.payment_expireAt} />}
                title='Batas Waktu Pembayaran'
              />
            )}
          {order.status === "BOOKED" && order.paymentStatus === "DP_PAID" && (
            <HeaderTitle
              value={`Rp ${order.remainingAmount?.toLocaleString() ?? 0}`}
              title='Sisa Pembayaran'
            />
          )}
        </div>
      </AccordionTriggerCust>

      <AccordionContent className='flex flex-col gap-4 text-balance px-6 py-4'>
        <div className='space-y-4'>
          {courtItems.map((item) => (
            <div
              key={item.id}
              className='flex justify-between text-sm border border-muted-foreground/20 rounded-lg py-2 px-4 gap-4'>
              <div>
                <p className='text-muted-foreground text-xs'>Court</p>
                <h2 className='font-semibold'>{item.name}</h2>
              </div>
              <div>
                <p className='text-muted-foreground text-xs'>Tanggal</p>
                <h2 className='font-semibold'>
                  {item.date ? format(new Date(item.date), "dd MMM yyyy") : "-"}
                </h2>
              </div>
              <div>
                <p className='text-muted-foreground text-xs'>Waktu</p>
                <h2 className='font-semibold'>
                  {item.startTime} - {item.endTime}
                </h2>
              </div>
              <div className='text-left flex-1'>
                <p className='text-right'>x {item.quantity}</p>
                <p className='font-semibold text-right'>
                  Rp {item.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          {productItems.length > 0 && (
            <h3 className='font-semibold text-lg mt-4'>Produk Lainnya</h3>
          )}
          <div className='grid grid-cols-5 gap-3'>
            {productItems.map((item) => (
              <div key={item.id} className='border rounded-xl p-2'>
                <div className='flex flex-col h-full'>
                  <div className='flex-1'>
                    <h2 className='font-semibold mb-3 text-sm line-clamp-1'>
                      {item.name}
                    </h2>
                  </div>
                  <div className='flex items-center justify-end gap-2'>
                    <p className='font-semibold text-sm text-right'>
                      Rp {item.price.toLocaleString()}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      x {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {order.notes && (
            <div className='mt-4 text-sm'>
              <p className='text-muted-foreground'>Notes</p>
              <p>{order.notes}</p>
            </div>
          )}
        </div>
      </AccordionContent>

      {order.status === "CREATED" && (
        <CardFooter className='pb-4 flex justify-end gap-2 px-6 border-t'>
          <Button
            variant='destructive'
            className='cursor-pointer'
            disabled={loading}
            onClick={() => {
              handleCancel(order.id);
            }}>
            {loading ? "Memproses..." : "Batalkan Pesanan"}
          </Button>
          <PaymentButton orderId={order.id} status={order.status} />
        </CardFooter>
      )}
    </AccordionItem>
  );
}
