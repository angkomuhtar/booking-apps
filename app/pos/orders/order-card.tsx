"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { OrdersColumn } from "./columns";
import { getStatusColor } from "@/lib/utils";
import { format } from "date-fns";

interface OrderCardProps {
  order: OrdersColumn;
  onDetails: (order: OrdersColumn) => void;
}

export function OrderCard({ order, onDetails }: OrderCardProps) {
  const statusInfo = getStatusColor(order.status);
  const courtItems = order.items.filter((i) => i.itemType === "COURT_BOOKING");
  const productItems = order.items.filter((i) => i.itemType === "PRODUCT");

  return (
    <Card className="py-0 gap-0">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold text-sm">#{order.orderNumber}</p>
            <p className="text-xs text-muted-foreground">{order.venue.name}</p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium text-white ${statusInfo?.color}`}>
            {statusInfo?.text}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Icon icon="heroicons:user" className="size-4 text-muted-foreground" />
          <span>{order.user.name}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Icon icon="heroicons:calendar" className="size-4 text-muted-foreground" />
            <span>{format(new Date(order.createdAt), "dd MMM yyyy")}</span>
          </div>
          <div className="text-right font-semibold">
            Rp {order.totalPrice.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
          <div className="flex gap-3">
            <span>{courtItems.length} Sesi</span>
            <span>{productItems.length} Produk</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 cursor-pointer"
            onClick={() => onDetails(order)}>
            Detail
            <Icon icon="heroicons:chevron-right" className="size-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
