"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth, requirePermission } from "@/lib/auth-helpers";
import z from "zod";
import { PermissionSchema, RoleSchema } from "@/schema/roles.schema";

export async function createPermission(data: z.infer<typeof PermissionSchema>) {
  try {
    const session = await requireAuth();
    await requirePermission("permissions.create");

    const validatedData = PermissionSchema.parse(data);

    const permission = await prisma.permission.create({
      data: {
        name: validatedData.name,
        code: validatedData.code,
        group: validatedData.group,
        description: validatedData.description,
      },
    });

    revalidatePath("/admin/settings/permissions");

    return {
      success: true,
      message: "Permission berhasil dibuat",
      permissionId: permission.id,
    };
  } catch (error) {
    console.error("Create permission error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Gagal membuat permission",
    };
  }
}

export async function getPermissions() {
  try {
    await requireAuth();
    await requirePermission("permissions.view");

    const permissions = await prisma.permission.findMany({
      orderBy: { group: "desc" },
    });

    return {
      success: true,
      data: permissions,
      message: "Permissions fetched successfully",
    };
  } catch (error) {
    console.error("Get permissions error:", error);
    return {
      success: false,
      data: [],
      message: "Gagal mengambil data permissions",
    };
  }
}

export async function updatePermission(
  dataId: string,
  data: z.infer<typeof PermissionSchema>
) {
  try {
    await requirePermission("permissions.update");

    const validatedData = PermissionSchema.parse(data);

    await prisma.permission.update({
      where: { id: dataId },
      data: validatedData,
    });

    revalidatePath("/admin/settings/permissions");

    return {
      success: true,
      message: "Permission berhasil diupdate",
    };
  } catch (error) {
    console.error("Update permission error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Gagal mengupdate permission",
    };
  }
}

export async function deletePermission(dataId: string) {
  try {
    // const session = await requireAuth();
    await requirePermission("permissions.delete");

    await prisma.permission.delete({
      where: { id: dataId },
    });

    revalidatePath("/admin/settings/permissions");
    return {
      success: true,
      message: "Permission berhasil dihapus",
    };
  } catch (error) {
    console.error("Delete permission error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Gagal menghapus permission",
    };
  }
}
