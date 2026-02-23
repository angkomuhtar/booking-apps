"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

export type OrdersColumn = {
  user: {
    name: string;
    id: string;
    email: string;
  };
  id: string;
  createdAt: Date;
  orderNumber: string;
  totalPrice: number;
  status: string;
  notes: string | null;
  venue: {
    name: string;
    id: string;
  };
  items: {
    name: string;
    id: string;
    price: number;
    startTime: string | null;
    endTime: string | null;
    itemType: string;
    quantity: number;
    date: Date | null;
  }[];
};

export type TableMeta = {
  onDetails: (data: OrdersColumn) => void;
  // onDelete: (data: OrdersColumn) => void;
  onStatusChange: (data: OrdersColumn) => void;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "CREATED":
      return { color: "bg-green-500", text: "Menunggu Pembayaran" };
    case "WAIT_PAYMENT":
      return { color: "bg-yellow-500", text: "Menunggu Pembayaran" };
    case "PAID":
      return { color: "bg-green-500", text: "Pembayaran Berhasil" };
    case "CANCELLED":
      return { color: "bg-red-500", text: "Dibatalkan" };
    case "COMPLETED":
      return { color: "bg-blue-500", text: "Selesai" };
    case "PROCESSING":
      return { color: "bg-purple-500", text: "Diproses" };
    case "REFUNDED":
      return { color: "bg-gray-500", text: "Dikembalikan" };
    default:
      return { color: "bg-purple-500", text: "Diproses" };
  }
};

export const columns: ColumnDef<OrdersColumn>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order #",
  },
  {
    id: "venue",
    header: "Venue",
    cell: ({ row }) => {
      return `${row.original.venue.name}`;
    },
  },
  {
    id: "user",
    header: "User",
    cell: ({ row }) => {
      return (
        <div className='flex flex-col'>
          <span>{row.original.user.name}</span>
          <span className='text-xs text-muted-foreground'>
            {row.original.user.email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "court",
    header: "Courts",
    cell: ({ row }) => {
      const data = row.original.items.filter(
        (item) => item.itemType === "COURT_BOOKING",
      );
      return `${data.length} Sesi`;
    },
  },
  {
    accessorKey: "product",
    header: "Products",
    cell: ({ row }) => {
      const data = row.original.items.filter(
        (item) => item.itemType === "PRODUCT",
      );
      return `${data.length} item(s)`;
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ row }) => {
      return `Rp ${row.original.totalPrice.toLocaleString()}`;
    },
  },
  {
    accessorKey: "status",
    cell: ({ row }) => {
      const statusInfo = getStatusColor(row.original.status);
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium text-white ${statusInfo.color}`}>
          {statusInfo.text}
        </span>
      );
    },
  },

  {
    accessorKey: "notes",
    header: "Catatan",
    cell: ({ row }) => {
      return (
        <div className='max-w-sm truncate'>{row.original.notes || "-"}</div>
      );
    },
  },

  {
    id: "details",
    header: "",
    cell: ({ row, table }) => {
      const court = row.original;
      const meta = table.options.meta as TableMeta | undefined;
      return (
        <div className='flex gap-2 items-center'>
          <Button
            variant='link'
            className='cursor-pointer'
            onClick={() => {
              meta?.onDetails(court);
            }}>
            <Icon icon='heroicons-solid:chevron-right' className='size-4' />
          </Button>
        </div>
      );
    },
  },
];
