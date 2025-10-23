import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function BookingsPage() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: {
      court: {
        include: {
          venue: true,
        },
      },
    },
    orderBy: { date: "desc" },
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
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="ghost">
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

        {bookings.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">You have no bookings yet</p>
              <Button asChild>
                <Link href="/venues">Browse Venues</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{booking.court.venue.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {booking.court.name}
                      </p>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium">
                        {format(new Date(booking.date), "PPP")}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Time</p>
                      <p className="font-medium">
                        {booking.startTime} - {booking.endTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{booking.duration} hour(s)</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Price</p>
                      <p className="font-medium">
                        Rp {booking.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {booking.notes && (
                    <div className="mt-4 text-sm">
                      <p className="text-muted-foreground">Notes</p>
                      <p>{booking.notes}</p>
                    </div>
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
