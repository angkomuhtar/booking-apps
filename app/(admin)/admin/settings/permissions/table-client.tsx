"use client";

import { useState, useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { columns, PermissionColumn, PermissionTableMeta } from "./columns";
import { EditSheet } from "./edit-sheet";
import { DeleteDialog } from "./delete-dialog";

interface PermissionsClientProps {
  data: PermissionColumn[];
}

export function TableClient({ data }: PermissionsClientProps) {
  const [selectedPermission, setSelectedPermission] =
    useState<PermissionColumn | null>(null);
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);

  const meta: PermissionTableMeta = useMemo(
    () => ({
      onEdit: (data: PermissionColumn) => {
        setSelectedPermission(data);
        setDialogType("edit");
      },
      onDelete: (data: PermissionColumn) => {
        setSelectedPermission(data);
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
        searchPlaceholder='Cari Permission...'
        meta={meta}
      />

      <EditSheet
        data={selectedPermission}
        open={dialogType === "edit"}
        onOpenChange={(open) => {
          if (!open) {
            setDialogType(null);
            setSelectedPermission(null);
          }
        }}
      />

      <DeleteDialog
        data={selectedPermission}
        open={dialogType === "delete"}
        onOpenChange={(open) => {
          if (!open) {
            setDialogType(null);
            setSelectedPermission(null);
          }
        }}
      />
    </>
  );
}
