"use client";

import { useState, useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { columns, RoleColumn, RoleTableMeta } from "./columns";
import { RoleEditSheet } from "./role-edit-sheet";
import { RoleDeleteDialog } from "./role-delete-dialog";

interface RolesClientProps {
  data: RoleColumn[];
  permissions: any[];
}

export function RolesClient({ data, permissions }: RolesClientProps) {
  const [selectedRole, setSelectedRole] = useState<RoleColumn | null>(null);
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);

  const meta: RoleTableMeta = useMemo(
    () => ({
      onEdit: (role: RoleColumn) => {
        setSelectedRole(role);
        setDialogType("edit");
      },
      onDelete: (role: RoleColumn) => {
        setSelectedRole(role);
        setDialogType("delete");
      },
    }),
    []
  );

  const columnsWithMeta = useMemo(() => columns, []);

  return (
    <>
      <DataTable
        columns={columnsWithMeta}
        data={data}
        searchKey='name'
        searchPlaceholder='Cari role...'
        meta={meta}
      />

      <RoleEditSheet
        role={selectedRole}
        open={dialogType === "edit"}
        permissions={permissions}
        onOpenChange={(open) => {
          if (!open) {
            setDialogType(null);
            setSelectedRole(null);
          }
        }}
      />

      <RoleDeleteDialog
        role={selectedRole}
        open={dialogType === "delete"}
        onOpenChange={(open) => {
          if (!open) {
            setDialogType(null);
            setSelectedRole(null);
          }
        }}
      />
    </>
  );
}
