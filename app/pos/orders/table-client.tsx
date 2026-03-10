"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table";
import { columns, OrdersColumn, TableMeta } from "./columns";
import { updateCourtStatus } from "@/lib/actions/court";
import { getOrders } from "@/lib/actions/order";
import { toast } from "sonner";
import { DetailsSheet } from "./details-sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { OrderCard } from "./order-card";
import { Input } from "@/components/ui/input";

export function TableClient() {
  const [selectedOrder, setSelectedOrder] = useState<OrdersColumn | null>(null);
  const [dialogType, setDialogType] = useState<"detail" | "delete" | null>(
    null,
  );
  const [search, setSearch] = useState("");
  const isMobile = useIsMobile();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["pos-orders"],
    queryFn: async () => {
      const result = await getOrders();
      return result.success ? (result.data ?? []) : [];
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  const handleStatusChange = async (order: OrdersColumn) => {
    const result = await updateCourtStatus(order.id);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleDetails = (data: OrdersColumn) => {
    setSelectedOrder(data);
    setDialogType("detail");
  };

  const meta: TableMeta = {
    onDetails: handleDetails,
    onStatusChange: handleStatusChange,
  };

  const filteredOrders = orders.filter((order) =>
    order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
    order.user.name.toLowerCase().includes(search.toLowerCase()) ||
    order.venue.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {isMobile ? (
        <div className="space-y-3">
          <Input
            placeholder="Cari Data Order..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onDetails={handleDetails}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Tidak ada data
            </div>
          )}
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={orders}
          searchKey="orderNumber"
          searchPlaceholder="Cari Data Order..."
          meta={meta}
        />
      )}

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
    </>
  );
}
