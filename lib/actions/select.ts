"use server";

import { prisma } from "@/lib/prisma";
import { getAccessibleVenueIds } from "../auth-helpers";

export async function getProvince({ name = "" }: { name?: string }) {
  try {
    const province = await prisma.province.findMany({
      where: {
        name: { contains: name, mode: "insensitive" },
      },
      orderBy: { name: "asc" },
    });

    return province;
  } catch (error) {
    console.error("Get facilities error:", error);
    return [];
  }
}

export async function getCity({
  province,
}: {
  name?: string;
  province?: string;
}) {
  try {
    const data = await prisma.city.findMany({
      where: {
        provinceId: province,
      },
    });

    return data;
  } catch (error) {
    console.error("Get facilities error:", error);
    return [];
  }
}

export async function getVenuesAsSelect({
  searchParams,
}: {
  searchParams: string;
}) {
  const venueslist = await getAccessibleVenueIds();

  const venues = await prisma.venue.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      ...(venueslist.allAccess ? {} : { id: { in: venueslist.venueIds } }),
      name: {
        contains: searchParams || "",
        mode: "insensitive",
      },
    },
    orderBy: { name: "desc" },
  });

  return venues;
}

export async function getFloorTypes() {
  const floorTypes = await prisma.floorType.findMany({
    orderBy: { name: "asc" },
  });
  return floorTypes;
}

export async function getCourtType() {
  const courtTypes = await prisma.courtType.findMany({
    orderBy: { name: "asc" },
  });
  return courtTypes;
}

export type Province = {
  id: string;
  name: string;
};

export type Facility = {
  id: string;
  name: string;
  icon: string | null;
};

export type City = {
  id: string;
  name: string;
  provinceId: string;
};

export type VenueSelect = {
  id: string;
  name: string;
};

export type FloorType = {
  id: string;
  name: string;
};

export type CourtType = {
  id: string;
  name: string;
};
