import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getSession() {
  return await auth();
}

export async function requireAuth() {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requireSuperAdmin() {
  const session = await requireAuth();
  if (session.user.role !== "SUPER_ADMIN") {
    throw new Error("Forbidden: Super Admin access required");
  }
  return session;
}

export async function requireVenueAdmin() {
  const session = await requireAuth();
  if (session.user.role !== "VENUE_ADMIN" && session.user.role !== "SUPER_ADMIN") {
    throw new Error("Forbidden: Venue Admin access required");
  }
  return session;
}

export async function canAccessVenue(venueId: string) {
  const session = await requireAuth();
  
  if (session.user.role === "SUPER_ADMIN") {
    return true;
  }
  
  if (session.user.role === "VENUE_ADMIN") {
    const venueAdmin = await prisma.venueAdmin.findUnique({
      where: {
        userId_venueId: {
          userId: session.user.id,
          venueId: venueId,
        },
      },
    });
    return !!venueAdmin;
  }
  
  return false;
}

export async function requireVenueAccess(venueId: string) {
  const hasAccess = await canAccessVenue(venueId);
  if (!hasAccess) {
    throw new Error("Forbidden: You do not have access to this venue");
  }
}

export async function getAccessibleVenues() {
  const session = await requireAuth();
  
  if (session.user.role === "SUPER_ADMIN") {
    return await prisma.venue.findMany({
      include: {
        courts: true,
        admins: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
  
  if (session.user.role === "VENUE_ADMIN") {
    const venueAdmins = await prisma.venueAdmin.findMany({
      where: { userId: session.user.id },
      include: {
        venue: {
          include: {
            courts: true,
            admins: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return venueAdmins.map((va) => va.venue);
  }
  
  return [];
}

export async function getAccessibleVenueIds() {
  const session = await requireAuth();
  
  if (session.user.role === "SUPER_ADMIN") {
    const venues = await prisma.venue.findMany({
      select: { id: true },
    });
    return venues.map((v) => v.id);
  }
  
  if (session.user.role === "VENUE_ADMIN") {
    const venueAdmins = await prisma.venueAdmin.findMany({
      where: { userId: session.user.id },
      select: { venueId: true },
    });
    return venueAdmins.map((va) => va.venueId);
  }
  
  return [];
}
