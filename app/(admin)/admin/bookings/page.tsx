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

export default async function AdminOrdersPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "SUPER_ADMIN" && session.user.role !== "VENUE_ADMIN") {
    redirect("/");
  }

  const isSuperAdmin = session.user.role === "SUPER_ADMIN";
  const accessibleVenueIds = await getAccessibleVenueIds();

  const orders = await prisma.order.findMany({
    where: isSuperAdmin
      ? {}
      : {
          venueId: { in: accessibleVenueIds.venueIds },
        },
    include: {
      user: true,
      venue: true,
      items: true,
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Orders</h1>
        <p className="text-muted-foreground">
          {isSuperAdmin 
            ? "All orders in the system" 
            : "Orders for your venues"}
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>{order.venue.name}</TableCell>
                  <TableCell>{order.items.length} item(s)</TableCell>
                  <TableCell>Rp {order.totalPrice.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {orders.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No orders yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
