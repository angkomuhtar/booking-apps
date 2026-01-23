"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/data-table";
import { columns, OrdersColumn, TableMeta } from "./columns";
import { updateCourtStatus } from "@/lib/actions/court";
import { toast } from "sonner";
import { DetailsSheet } from "./details-sheet";

interface OrdersClientProps {
  data: OrdersColumn[];
}

export function TableClient({ data }: OrdersClientProps) {
  const [selectedOrder, setSelectedOrder] = useState<OrdersColumn | null>(null);
  const [dialogType, setDialogType] = useState<"detail" | "delete" | null>(
    null,
  );

  const handleStatusChange = async (order: OrdersColumn) => {
    const result = await updateCourtStatus(order.id);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const meta: TableMeta = useMemo(
    () => ({
      onDetails: (data: OrdersColumn) => {
        setSelectedOrder(data);
        setDialogType("detail");
      },
      // onDelete: (data: OrdersColumn) => {
      //   setSelectedOrder(data);
      //   setDialogType("delete");
      // },
      onStatusChange: handleStatusChange,
    }),
    [],
  );

  const columnsWithMeta = useMemo(() => columns, []);

  return (
    <>
      <DataTable
        columns={columnsWithMeta}
        data={data}
        searchKey='orderNumber'
        searchPlaceholder='Cari Data Order...'
        meta={meta}
      />

      <DetailsSheet
        data={selectedOrder}
        open={dialogType === "detail"}
        onOpenChange={(open) => {
          if (!open) {
            setDialogType(null);
            setSelectedOrder(null);
          }
        }}
      />

      {/* <DeleteDialog
        data={selectedCourt}
        open={dialogType === "delete"}
        onOpenChange={(open) => {
          if (!open) {
            setDialogType(null);
            setSelectedCourt(null);
          }
        }}
      /> */}
    </>
  );
}
