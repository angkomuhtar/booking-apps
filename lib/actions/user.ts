import { prisma } from "@/lib/prisma";
import { requireAuth, requireSuperAdmin } from "@/lib/auth-helpers";

export async function getUsers() {
  await requireSuperAdmin();

  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          orders: true,
          venueAccess: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserById(id: string) {
  const session = await requireAuth();

  if (session.user.id !== id && session.user.role !== "Super Admin") {
    throw new Error("Forbidden: Cannot access other user's data");
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function getUserProfile(id: string) {
  const session = await requireAuth();

  if (session.user.id !== id && session.user.role !== "Super Admin") {
    throw new Error("Forbidden: Cannot access other user's profile");
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      orders: {
        select: {
          id: true,
          orderNumber: true,
          totalPrice: true,
          status: true,
          createdAt: true,
          venue: {
            select: {
              id: true,
              name: true,
              city: true,
            },
          },
          items: {
            where: { itemType: "COURT_BOOKING" },
            select: {
              id: true,
              name: true,
              date: true,
              startTime: true,
              endTime: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function getVenueAdmins() {
  await requireSuperAdmin();

  return await prisma.user.findMany({
    where: {
      role: {
        name: "Venue Admin",
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
      venueAccess: {
        select: {
          venue: {
            select: {
              id: true,
              name: true,
              city: true,
            },
          },
        },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function getUsersByRoleName(roleName: string) {
  await requireSuperAdmin();

  return await prisma.user.findMany({
    where: {
      role: {
        name: roleName,
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
    },
    orderBy: { name: "asc" },
  });
}

export async function searchUsers(query: string) {
  await requireSuperAdmin();

  return await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
    },
    take: 20,
  });
}
