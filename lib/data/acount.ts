"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function updateUser(
  id: string,
  data: { name?: string; phone?: string },
) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized" };
  }

  const name = formData.get("name") as string | null;
  const phone = formData.get("phone") as string | null;

  const data: { name?: string; phone?: string } = {};
  if (name) data.name = name;
  if (phone) data.phone = phone;

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data,
    });

    revalidatePath("/account");
    return { success: true, message: "Profil berhasil diperbarui" };
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint")
    ) {
      return { success: false, message: "Nomor telepon sudah digunakan" };
    }
    return { success: false, message: "Gagal memperbarui profil" };
  }
}
