"use client";

import { useState, useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { columns, CourtColumn, TableMeta } from "./columns";
import { EditSheet } from "./edit-sheet";
import { DeleteDialog } from "./delete-dialog";
import { updateCourtStatus } from "@/lib/actions/court";
import { toast } from "sonner";

interface CourtsClientProps {
  data: CourtColumn[];
}

export function TableClient({ data }: CourtsClientProps) {
  const [selectedCourt, setSelectedCourt] = useState<CourtColumn | null>(null);
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);

  const handleStatusChange = async (court: CourtColumn) => {
    const result = await updateCourtStatus(court.id);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const meta: TableMeta = useMemo(
    () => ({
      onEdit: (data: CourtColumn) => {
        setSelectedCourt(data);
        setDialogType("edit");
      },
      onDelete: (data: CourtColumn) => {
        setSelectedCourt(data);
        setDialogType("delete");
      },
      onStatusChange: handleStatusChange,
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
        searchPlaceholder='Cari Data Court...'
        meta={meta}
      />

      {/* <EditSheet
        data={selectedCourt}
        open={dialogType === "edit"}
        onOpenChange={(open) => {
          if (!open) {
            setDialogType(null);
            setSelectedCourt(null);
          }
        }}
      /> */}

      <DeleteDialog
        data={selectedCourt}
        open={dialogType === "delete"}
        onOpenChange={(open) => {
          if (!open) {
            setDialogType(null);
            setSelectedCourt(null);
          }
        }}
      />
    </>
  );
}
