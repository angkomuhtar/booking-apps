import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { forbidden, redirect } from "next/navigation";

export async function getSession() {
  return await auth();
}

export async function requireAuth() {
  const session = await getSession();
  if (!session?.user) {
    // throw new Error("Unauthorized");
    return redirect("/login");
  }
  return session;
}

export async function requireSuperAdmin() {
  const session = await requireAuth();
  if (session.user.role !== "Super Admin") {
    throw new Error("Forbidden: Super Admin access required");
  }
  return session;
}

export async function requireVenueAdmin() {
  const session = await requireAuth();
  if (
    session.user.role !== "Venue Admin" &&
    session.user.role !== "Super Admin"
  ) {
    throw new Error("Forbidden: Venue Admin access required");
  }
  return session;
}

export async function canAccessVenue(venueId: string) {
  const session = await requireAuth();

  if (session.user.role === "Super Admin" || session.user.accessAllVenues) {
    return true;
  }

  const venueAccess = await prisma.venueAccess.findUnique({
    where: {
      userId_venueId: {
        userId: session.user.id,
        venueId: venueId,
      },
    },
  });
  return !!venueAccess;
}

export async function getAccessibleVenues() {
  const session = await requireAuth();
  if (session.user.accessAllVenues) {
    const venues = await prisma.venue.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        city: true,
      },
    });
    return venues;
  } else {
    const venueAccessList = await prisma.venueAccess.findMany({
      where: { userId: session.user.id },
      include: {
        venue: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true,
          },
        },
      },
    });
    return venueAccessList.map((va) => va.venue);
  }
}

// get all venue ids that the user has access to
export async function getAccessibleVenueIds() {
  const session = await requireAuth();

  if (session.user.accessAllVenues) {
    return {
      allAccess: true,
      venueIds: [],
    };
  }

  const venueAccessList = await prisma.venueAccess.findMany({
    where: { userId: session.user.id },
    select: { venueId: true },
  });
  return {
    allAccess: false,
    venueIds: venueAccessList.map((va) => va.venueId),
  };
}

// require that the user has access to a specific venue
export async function requireVenueAccess(venueId: string) {
  const hasAccess = await canAccessVenue(venueId);
  if (!hasAccess) {
    throw new Error("Forbidden: You do not have access to this venue");
  }
}

export async function hasPermission(permissionCode: string) {
  const session = await requireAuth();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!user?.role) return false;

  return user.role.permissions.some(
    (rp) => rp.permission.code === permissionCode,
  );
}

export async function requirePermission(permissionCode: string) {
  const hasPerm = await hasPermission(permissionCode);
  if (!hasPerm) {
    return forbidden();
  }
}
