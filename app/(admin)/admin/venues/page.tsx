import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getAccessibleVenues } from "@/lib/auth-helpers";

export default async function AdminVenuesPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "SUPER_ADMIN" && session.user.role !== "VENUE_ADMIN") {
    redirect("/");
  }

  const venues = await getAccessibleVenues();

  const isSuperAdmin = session.user.role === "SUPER_ADMIN";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Venues</h1>
          <p className="text-muted-foreground">
            {isSuperAdmin ? "All venues in the system" : "Your assigned venues"}
          </p>
        </div>
        {isSuperAdmin && (
          <Button asChild>
            <Link href="/admin/venues/new">+ Add Venue</Link>
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Courts</TableHead>
                <TableHead>Admins</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {venues.map((venue) => (
                <TableRow key={venue.id}>
                  <TableCell className="font-medium">{venue.name}</TableCell>
                  <TableCell>{venue.city}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {venue.address}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{venue.courts.length}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{venue.admins.length}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/venues/${venue.id}`}>View</Link>
                      </Button>
                      {isSuperAdmin && (
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/venues/${venue.id}/edit`}>Edit</Link>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {venues.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground mb-4">
              {isSuperAdmin 
                ? "No venues yet" 
                : "You haven't been assigned to any venues"}
            </p>
            {isSuperAdmin && (
              <Button asChild>
                <Link href="/admin/venues/new">Add Your First Venue</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
