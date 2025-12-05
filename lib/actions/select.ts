"use server";

import { prisma } from "@/lib/prisma";

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
