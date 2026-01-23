"use client";

import { useState, useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { columns, ProductColumn, TableMeta } from "./columns";
import { DeleteDialog } from "./delete-dialog";
import { updateCourtStatus } from "@/lib/actions/court";
import { toast } from "sonner";
import { updateProductStatus } from "@/lib/actions/products";
import { EditSheet } from "./edit-sheet";
import { VenueSelect } from "@/lib/actions/select";

interface ProductsClientProps {
  data: ProductColumn[];
  venues: VenueSelect[];
}

export function TableClient({ data, venues }: ProductsClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductColumn | null>(
    null,
  );
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);

  const handleStatusChange = async (product: ProductColumn) => {
    const result = await updateProductStatus(product.id);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const meta: TableMeta = useMemo(
    () => ({
      onEdit: (data: ProductColumn) => {
        setSelectedProduct(data);
        setDialogType("edit");
      },
      onDelete: (data: ProductColumn) => {
        setSelectedProduct(data);
        setDialogType("delete");
      },
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
        searchKey='name'
        searchPlaceholder='Cari Data Produk...'
        meta={meta}
      />

      <EditSheet
        data={selectedProduct}
        venues={venues}
        open={dialogType === "edit"}
        onOpenChange={(open) => {
          if (!open) {
            setDialogType(null);
            setSelectedProduct(null);
          }
        }}
      />

      <DeleteDialog
        data={selectedProduct}
        open={dialogType === "delete"}
        onOpenChange={(open) => {
          if (!open) {
            setDialogType(null);
            setSelectedProduct(null);
          }
        }}
      />
    </>
  );
}
