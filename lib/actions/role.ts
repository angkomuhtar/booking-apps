"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth, requirePermission } from "@/lib/auth-helpers";
import z from "zod";
import { RoleSchema } from "@/schema/roles.schema";

export async function createRole(data: z.infer<typeof RoleSchema>) {
  try {
    await requirePermission("roles.create");

    const validatedData = RoleSchema.parse(data);

    const role = await prisma.role.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        isSystem: validatedData.isSystem,
      },
    });

    if (validatedData.permissions) {
      for (const permission of validatedData.permissions) {
        await prisma.rolePermission.create({
          data: {
            roleId: role.id,
            permissionId: permission.permissionId,
          },
        });
      }
    }

    revalidatePath("/admin/settings/roles");
    return {
      success: true,
      message: "Role berhasil dibuat",
      roleId: role.id,
    };
  } catch (error) {
    console.error("Create role error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Gagal membuat role",
    };
  }
}

export async function getRoles() {
  try {
    await requireAuth();
    await requirePermission("roles.view");

    const roles = await prisma.role.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return { success: true, data: roles };
  } catch (error) {
    console.error("Get roles error:", error);
    return { success: false, data: [], message: "Gagal mengambil data roles" };
  }
}

export async function updateRole(
  roleId: string,
  data: z.infer<typeof RoleSchema>
) {
  try {
    await requirePermission("roles.update");

    const validatedData = RoleSchema.parse(data);

    await prisma.role.update({
      where: { id: roleId },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        isSystem: validatedData.isSystem,
      },
    });

    await prisma.rolePermission.deleteMany({
      where: { roleId },
    });

    if (validatedData.permissions) {
      for (const permission of validatedData.permissions) {
        await prisma.rolePermission.create({
          data: {
            roleId,
            permissionId: permission.permissionId,
          },
        });
      }
    }

    revalidatePath("/admin/settings/roles");
    return {
      success: true,
      message: "Role berhasil diupdate",
    };
  } catch (error) {
    console.error("Update role error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Gagal mengupdate role",
    };
  }
}

export async function deleteRole(roleId: string) {
  try {
    // const session = await requireAuth();
    await requirePermission("roles.delete");

    await prisma.role.delete({
      where: { id: roleId },
    });

    revalidatePath("/admin/settings/roles");

    return {
      success: true,
      message: "Role berhasil dihapus",
    };
  } catch (error) {
    console.error("Delete role error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Gagal menghapus role",
    };
  }
}
