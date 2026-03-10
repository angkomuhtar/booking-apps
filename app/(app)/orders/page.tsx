import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MidtransScript } from "@/components/midtrans-script";
import { Accordion } from "@/components/ui/accordion";
import { getOrders } from "@/lib/data/orders";
import { OrderStatus } from "@prisma/client";
import { MobileOrderCard, DesktopOrderCard } from "@/components/orders";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: OrderStatus }>;
}) {
  const session = await auth();
  const { status } = await searchParams;

  if (!session) {
    return null;
  }

  const orders = await getOrders(status);

  return (
    <>
      <MidtransScript />
      <div className='min-h-screen bg-background'>
        <div className='container'>
          <Button asChild variant='link' className='px-0'>
            <Link href='/'>← Back to Home</Link>
          </Button>
        </div>

        <main className='container mx-auto px-4 py-0 sm:py-8'>
          <h1 className='text-3xl font-bold'>My Orders</h1>
          <div className='flex space-x-2 py-2 overflow-x-auto w-full mb-4'>
            <Button
              asChild
              variant='outline'
              size='sm'
              className={`rounded-full ${!status ? "bg-primary text-primary-foreground" : "border border-primary text-primary"}`}>
              <Link href='/orders'>Semua</Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='sm'
              className={`rounded-full ${status === "BOOKED" ? "bg-primary text-primary-foreground" : "border border-primary text-primary"}`}>
              <Link href='/orders?status=BOOKED'>Sukses</Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='sm'
              className={`rounded-full ${status === "CREATED" ? "bg-primary text-primary-foreground" : "border border-primary text-primary"}`}>
              <Link href='/orders?status=CREATED'>Menunggu Pembayaran</Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='sm'
              className={`rounded-full ${status === "CANCELLED" ? "bg-primary text-primary-foreground" : "border border-primary text-primary"}`}>
              <Link href='/orders?status=CANCELLED'>Gagal</Link>
            </Button>
          </div>

          {orders?.data?.length === 0 ? (
            <Card>
              <CardContent className='py-8 text-center'>
                <p className='text-muted-foreground mb-4'>
                  Tidak ada pesanan yang ditemukan.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Mobile View */}
              <div className='block md:hidden'>
                {orders?.data?.map((order, index) => (
                  <MobileOrderCard key={index} order={order} />
                ))}
              </div>

              {/* Desktop View */}
              <div className='hidden md:block'>
                <Accordion
                  type='single'
                  collapsible
                  className='w-full'
                  defaultValue='item-1'>
                  {orders?.data?.map((order, index) => (
                    <DesktopOrderCard key={index} order={order} index={index} />
                  ))}
                </Accordion>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}
