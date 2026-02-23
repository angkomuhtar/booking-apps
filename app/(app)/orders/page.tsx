import { auth } from "@/auth";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PaymentButton } from "@/components/payment-button";
import { MidtransScript } from "@/components/midtrans-script";
import { CountdownTimer } from "@/components/countdown-timer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerCust,
} from "@/components/ui/accordion";
import { getOrders } from "@/lib/data/orders";
import { getStatusColor } from "@/lib/utils";

export default async function OrdersPage() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const orders = await getOrders();

  console.log(orders);

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
    <>
      <MidtransScript />
      <div className='min-h-screen bg-background'>
        <header className='border-b'>
          <div className='container mx-auto px-4 py-4'>
            <Button asChild variant='ghost'>
              <Link href='/'>← Back to Home</Link>
            </Button>
          </div>
        </header>

        <main className='container mx-auto px-4 py-8'>
          <h1 className='text-3xl font-bold mb-6'>My Orders</h1>
          {orders?.data?.length === 0 ? (
            <Card>
              <CardContent className='py-8 text-center'>
                <p className='text-muted-foreground mb-4'>
                  You have no orders yet
                </p>
                <Button asChild>
                  <Link href='/venues'>Browse Venues</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Accordion
              type='single'
              collapsible
              className='w-full'
              defaultValue='item-1'>
              {orders?.data?.map((order, index) => (
                <AccordionItem
                  value={`item-${index + 1}`}
                  key={index}
                  className='bg-card text-card-foreground flex flex-col rounded-xl shadow-sm py-0 border border-muted mb-6'>
                  <AccordionTriggerCust className='py-0'>
                    <div className=' flex-1 grid grid-cols-2 md:flex items-center gap-2 md:gap-6 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 bg-muted rounded-t-lg py-4'>
                      <HeaderTitle value={order.venue.name} title='Venue' />
                      <HeaderTitle
                        value={`#${order.orderNumber}`}
                        title='OrderId'
                      />
                      <HeaderTitle
                        value={`Rp ${order.totalPrice.toLocaleString()}`}
                        title='Total Price'
                      />
                      <HeaderTitle
                        value={format(order.createdAt, "PPP p")}
                        title='Order Date'
                      />
                      <HeaderTitle
                        value={
                          <Badge
                            className={getStatusColor(order.status)?.color}>
                            {getStatusColor(order.status)?.text}
                          </Badge>
                        }
                        title='Status'
                      />
                      {order.status === "WAIT_PAYMENT" &&
                        order.payment_expireAt && (
                          <HeaderTitle
                            value={
                              <CountdownTimer
                                expireAt={order.payment_expireAt}
                              />
                            }
                            title='Batas Waktu Pembayaran'
                          />
                        )}
                    </div>
                  </AccordionTriggerCust>
                  <AccordionContent className='flex flex-col gap-4 text-balance px-6 py-4'>
                    <div className='space-y-4'>
                      {order.items
                        .filter((item) => item.itemType === "COURT_BOOKING")
                        .map((item) => (
                          <div
                            key={item.id}
                            className='grid md:flex justify-between text-sm border border-muted-foreground/20 rounded-lg py-2 px-4 gap-4 grid-cols-2'>
                            <div>
                              <p className='text-muted-foreground text-xs'>
                                Court
                              </p>
                              <h2 className='font-semibold'>{item.name}</h2>
                            </div>
                            <div>
                              <p className='text-muted-foreground text-xs'>
                                Tanggal
                              </p>
                              <h2 className='font-semibold'>
                                {item.date
                                  ? format(new Date(item.date), "dd MMM yyyy")
                                  : "-"}
                              </h2>
                            </div>
                            <div>
                              <p className='text-muted-foreground text-xs'>
                                Waktu
                              </p>
                              <h2 className='font-semibold'>
                                {item.startTime} - {item.endTime}
                              </h2>
                            </div>
                            <div className='text-right md:text-left flex-1 col-span-2'>
                              <p className='text-right'>x {item.quantity}</p>
                              <p className='font-semibold text-right'>
                                Rp {item.price.toLocaleString()}{" "}
                              </p>
                            </div>
                          </div>
                        ))}

                      {order.items.filter((item) => item.itemType === "PRODUCT")
                        .length > 0 && (
                        <h3 className='font-semibold text-lg mt-4'>
                          Produk Lainnya
                        </h3>
                      )}
                      <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
                        {order.items
                          .filter((item) => item.itemType === "PRODUCT")
                          .map((item) => (
                            <div
                              key={item.id}
                              className='border rounded-xl p-2'>
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
                  {(order.status === "WAIT_PAYMENT" ||
                    order.status === "CREATED") && (
                    <CardFooter className='pb-4 flex justify-end gap-2 px-6 border-t'>
                      <Button variant='destructive' className=' cursor-pointer'>
                        Batalkan Pesanan
                      </Button>
                      <PaymentButton orderId={order.id} status={order.status} />
                    </CardFooter>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </main>
      </div>
    </>
  );
}
