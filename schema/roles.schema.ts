import * as z from "zod";

export const RolePermissionSchema = z.object({
  permissionId: z.string(),
  code: z.string(),
  name: z.string(),
});

export const RoleSchema = z.object({
  name: z.string().min(4, "Nama venue minimal 5 karakter"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter").optional(),
  isSystem: z.boolean(),
  permissions: z.array(RolePermissionSchema).optional(),
});

export const PermissionSchema = z.object({
  name: z.string().min(4, "Nama permission minimal 5 karakter"),
  code: z.string().min(4, "Kode permission minimal 5 karakter"),
  group: z.string().min(4, "Group permission minimal 5 karakter"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter").optional(),
});
