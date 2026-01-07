import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Calendar, DollarSign } from "lucide-react";
import { redirect } from "next/navigation";
import { getAccessibleVenueIds } from "@/lib/auth-helpers";

export default async function AdminPage() {
  const session = await auth();
  if (!session || session.user.role == "User") {
    redirect("/login");
  }

  const accessibleVenueIds = await getAccessibleVenueIds();

  const isSuperAdmin = session?.user.role === "Super Admin";

  const [userCount, venueCount, orderCount, totalRevenue] = await Promise.all([
    isSuperAdmin ? prisma.user.count() : 0,
    isSuperAdmin ? prisma.venue.count() : accessibleVenueIds.venueIds.length,
    isSuperAdmin
      ? prisma.order.count()
      : prisma.order.count({
          where: {
            venueId: { in: accessibleVenueIds.venueIds },
          },
        }),
    isSuperAdmin
      ? prisma.order.aggregate({
          _sum: { totalPrice: true },
          where: { status: "COMPLETED" },
        })
      : prisma.order.aggregate({
          _sum: { totalPrice: true },
          where: {
            status: "COMPLETED",
            venueId: { in: accessibleVenueIds.venueIds },
          },
        }),
  ]);

  return (
    <div className='flex flex-1 flex-col p-4 pt-0 font-sans'>
      <div className='flex flex-wrap items-center justify-between gap-5 pb-6'>
        <div className='flex flex-col justify-center gap-2'>
          <h1 className='text-xl font-medium leading-none text-mono'>
            Dashboard
          </h1>
          <div className='flex items-center gap-2 text-sm font-normal text-muted-foreground'>
            Central Hub for Personal Customization
          </div>
        </div>
      </div>
      <div className='space-y-6'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {isSuperAdmin && (
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Users
                </CardTitle>
                <Users className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{userCount}</div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {isSuperAdmin ? "Total Venues" : "My Venues"}
              </CardTitle>
              <Building2 className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{venueCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {isSuperAdmin ? "Total Orders" : "Venue Orders"}
              </CardTitle>
              <Calendar className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{orderCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {isSuperAdmin ? "Total Revenue" : "Venue Revenue"}
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                Rp {(totalRevenue._sum.totalPrice || 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
