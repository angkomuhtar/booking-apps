import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default async function VenuesPage() {
  const venues = await prisma.venue.findMany({
    include: {
      courts: true,
    },
  });

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
        <h1 className="text-3xl font-bold mb-6">All Venues</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <Card key={venue.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{venue.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {venue.description && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {venue.description}
                  </p>
                )}
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p>{venue.address}</p>
                      <p className="text-muted-foreground">{venue.city}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {venue.courts.length} court(s) available
                  </p>
                </div>
                <Button asChild className="w-full" variant="outline">
                  <Link href={`/venues/${venue.id}`}>View & Book</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {venues.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No venues available yet</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
