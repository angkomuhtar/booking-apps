import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Calendar, DollarSign } from "lucide-react";
import { redirect } from "next/navigation";
import { getAccessibleVenueIds } from "@/lib/auth-helpers";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (
    session.user.role !== "SUPER_ADMIN" &&
    session.user.role !== "VENUE_ADMIN"
  ) {
    redirect("/");
  }

  const accessibleVenueIds = await getAccessibleVenueIds();

  const isSuperAdmin = session.user.role === "SUPER_ADMIN";

  const [userCount, venueCount, bookingCount, totalRevenue] = await Promise.all(
    [
      isSuperAdmin ? prisma.user.count() : 0,
      isSuperAdmin ? prisma.venue.count() : accessibleVenueIds.length,
      isSuperAdmin
        ? prisma.booking.count()
        : prisma.booking.count({
            where: {
              court: {
                venueId: { in: accessibleVenueIds },
              },
            },
          }),
      isSuperAdmin
        ? prisma.booking.aggregate({
            _sum: { totalPrice: true },
            where: { status: "CONFIRMED" },
          })
        : prisma.booking.aggregate({
            _sum: { totalPrice: true },
            where: {
              status: "CONFIRMED",
              court: {
                venueId: { in: accessibleVenueIds },
              },
            },
          }),
    ]
  );

  return (
    <div className='space-y-6'>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {isSuperAdmin && (
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
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
              {isSuperAdmin ? "Total Bookings" : "Venue Bookings"}
            </CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{bookingCount}</div>
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
  );
}
