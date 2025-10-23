import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { getAccessibleVenueIds } from "@/lib/auth-helpers";

export default async function AdminBookingsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "SUPER_ADMIN" && session.user.role !== "VENUE_ADMIN") {
    redirect("/");
  }

  const isSuperAdmin = session.user.role === "SUPER_ADMIN";
  const accessibleVenueIds = await getAccessibleVenueIds();

  const bookings = await prisma.booking.findMany({
    where: isSuperAdmin
      ? {}
      : {
          court: {
            venueId: { in: accessibleVenueIds },
          },
        },
    include: {
      user: true,
      court: {
        include: {
          venue: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-500";
      case "PENDING":
        return "bg-yellow-500";
      case "CANCELLED":
        return "bg-red-500";
      case "COMPLETED":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Bookings</h1>
        <p className="text-muted-foreground">
          {isSuperAdmin 
            ? "All bookings in the system" 
            : "Bookings for your venues"}
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Court</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-mono text-xs">
                    {booking.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell>{booking.user.name}</TableCell>
                  <TableCell>{booking.court.venue.name}</TableCell>
                  <TableCell>{booking.court.name}</TableCell>
                  <TableCell>
                    {format(new Date(booking.date), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {booking.startTime} - {booking.endTime}
                  </TableCell>
                  <TableCell>Rp {booking.totalPrice.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {bookings.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No bookings yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
