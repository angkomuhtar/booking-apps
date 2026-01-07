import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function OrdersPage() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      venue: true,
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });

  console.log(orders);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-500";
      case "PENDING":
        return "bg-yellow-500";
      case "CANCELLED":
        return "bg-red-500";
      case "COMPLETED":
        return "bg-blue-500";
      case "PROCESSING":
        return "bg-purple-500";
      case "REFUNDED":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
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
        {orders.length === 0 ? (
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
          <div className='grid gap-4'>
            {orders.map((order) => (
              <Card key={order.id} className='py-0 border border-muted'>
                <CardHeader className='bg-muted rounded-t-lg py-4'>
                  <div className='grid grid-cols-2 md:flex items-center gap-2 md:gap-6'>
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
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      }
                      title='Status'
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4 mb-4'>
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className='grid md:flex justify-between text-sm border border-muted-foreground/20 rounded-lg py-2 px-4 gap-4 grid-cols-2'>
                        <div>
                          <p className='text-muted-foreground text-xs'>Court</p>
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
                          <p className='text-muted-foreground text-xs'>Waktu</p>
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
                  </div>
                  {/* <div className='flex justify-between border-t pt-2'>
                    <span className='font-medium'>Total</span>
                    <span className='font-bold'>
                      Rp {order.totalPrice.toLocaleString()}
                    </span>
                  </div> */}
                  {order.notes && (
                    <div className='mt-4 text-sm'>
                      <p className='text-muted-foreground'>Notes</p>
                      <p>{order.notes}</p>
                    </div>
                  )}

                  {order.status === "PENDING" && (
                    <CardFooter className='pb-4 flex justify-end px-0'>
                      <Button variant='outline' className=' cursor-pointer'>
                        Lanjutkan Pembayaran
                      </Button>
                    </CardFooter>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
