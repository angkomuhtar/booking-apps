import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminOrdersPage() {
  const orders: unknown[] = [];

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Manage Orders</h1>
        <p className='text-muted-foreground'>
          {/* {isSuperAdmin 
            ? "All orders in the system" 
            : "Orders for your venues"} */}
        </p>
      </div>

      <Card>
        <CardContent className='p-0'>
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
              {/* {orders.map((order) => (
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
              ))} */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {orders.length === 0 && (
        <Card>
          <CardContent className='py-8 text-center'>
            <p className='text-muted-foreground'>No orders yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
