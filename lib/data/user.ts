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
          bookings: true,
          venueAdmins: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserById(id: string) {
  const session = await requireAuth();

  if (session.user.id !== id && session.user.role !== "SUPER_ADMIN") {
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

  if (session.user.id !== id && session.user.role !== "SUPER_ADMIN") {
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
      bookings: {
        select: {
          id: true,
          date: true,
          startTime: true,
          endTime: true,
          totalPrice: true,
          status: true,
          court: {
            select: {
              id: true,
              name: true,
              type: true,
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
        orderBy: { date: "desc" },
        take: 10,
      },
      _count: {
        select: {
          bookings: true,
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
      role: "VENUE_ADMIN",
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
      venueAdmins: {
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

export async function getUsersByRole(role: "USER" | "VENUE_ADMIN" | "SUPER_ADMIN") {
  await requireSuperAdmin();

  return await prisma.user.findMany({
    where: { role },
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
