"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { PaymentButton } from "@/components/payment-button";
import { CountdownTimer } from "@/components/countdown-timer";
import { getStatusColor } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { OrderWithItems } from "./types";
import { useState } from "react";
import { cancelOrder } from "@/lib/data/orders";
import { toast } from "sonner";

interface MobileOrderCardProps {
  order: OrderWithItems;
}

export function MobileOrderCard({ order }: MobileOrderCardProps) {
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

  return (
    <Card className='mb-4 overflow-hidden py-0'>
      <CardContent className='p-0'>
        <details className='group'>
          <summary className='flex cursor-pointer list-none items-center justify-between p-4 bg-muted/50'>
            <div className='flex-1'>
              <div className='flex items-center justify-between mb-2 border-b pb-2'>
                <div>
                  <p className='text-[10px]'>
                    {format(order.createdAt, "dd MMM yyyy")}
                  </p>
                  <h3 className='font-semibold leading-tight'>
                    {order.venue.name}
                  </h3>
                </div>
                <Badge className={getStatusColor(order.status)?.color}>
                  {getStatusColor(order.status)?.text}
                </Badge>
              </div>
              <div className='flex items-center justify-between text-sm'>
                <div>
                  <p className='text-muted-foreground text-[10px]'>Order ID</p>
                  <p className='font-semibold text-sm'>
                    #{String(order.orderNumber).slice(-4).toUpperCase()}
                  </p>
                </div>
                {order.status === "CREATED" && order.payment_expireAt ? (
                  <div>
                    <p className='text-muted-foreground text-[10px]'>
                      Batas Waktu Pembayaran
                    </p>
                    <CountdownTimer expireAt={order.payment_expireAt} />
                  </div>
                ) : (
                  <div>
                    <p className='text-muted-foreground text-[10px]'>
                      Sisa Pembayaran
                    </p>
                    <p className='font-semibold text-sm'>
                      {order.remainingAmount
                        ? `Rp ${order.remainingAmount?.toLocaleString()}`
                        : "Lunas"}
                    </p>
                  </div>
                )}
              </div>
              <div className='flex items-center justify-between mt-1'>
                <span className='text-xs text-muted-foreground'></span>
              </div>
            </div>
            {/* <ChevronDown className='ml-2 h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180' /> */}
          </summary>

          <div className='border-t p-4 space-y-3'>
            {courtItems.map((item) => (
              <div
                key={item.id}
                className='bg-muted/30 rounded-lg p-3 space-y-1'>
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='font-semibold text-sm'>{item.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      {item.date
                        ? format(new Date(item.date), "dd MMM yyyy")
                        : "-"}
                    </p>
                  </div>
                  <p className='font-semibold text-sm'>
                    Rp {item.price.toLocaleString()}
                  </p>
                </div>
                <p className='text-xs text-muted-foreground'>
                  {item.startTime} - {item.endTime}
                </p>
              </div>
            ))}

            {productItems.length > 0 && (
              <>
                <p className='font-semibold text-sm pt-2'>Produk Lainnya</p>
                <div className='grid gap-2'>
                  {productItems.map((item) => (
                    <div
                      key={item.id}
                      className='bg-muted/30 rounded-lg p-2 text-sm'>
                      <p className='font-medium line-clamp-1'>{item.name}</p>
                      <div className='flex justify-between items-center mt-1'>
                        <span className='text-xs text-muted-foreground'>
                          x{item.quantity}
                        </span>
                        <span className='font-semibold text-xs'>
                          Rp {item.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {order.notes && (
              <div className='pt-2 text-sm'>
                <p className='text-muted-foreground text-xs'>Notes</p>
                <p>{order.notes}</p>
              </div>
            )}
          </div>
        </details>
      </CardContent>

      {order.status === "CREATED" && (
        <CardFooter className='p-3 flex justify-end gap-2 border-t'>
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
    </Card>
  );
}
