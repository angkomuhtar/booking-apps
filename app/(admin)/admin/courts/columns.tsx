"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export type CourtColumn = {
  id: string;
  name: string;
  type: string | null;
  floor: string | null;
  pricePerHour: number;
  sessionDuration: number;
  isActive: boolean;
  venue: {
    id: string;
    name: string;
    city: {
      id: string;
      name: string;
    } | null;
  };
  floorType?: {
    id: string;
    name: string;
  } | null;
  courtType?: {
    id: string;
    name: string;
  } | null;
};

export type TableMeta = {
  onEdit: (data: CourtColumn) => void;
  onDelete: (data: CourtColumn) => void;
  onStatusChange: (data: CourtColumn) => void;
};

export const columns: ColumnDef<CourtColumn>[] = [
  {
    accessorKey: "name",
    header: "Nama Court",
  },
  {
    id: "venue",
    header: "Venue",
    cell: ({ row }) => {
      return `${row.original.venue.name}`;
    },
  },
  {
    accessorKey: "type",
    header: "Jenis Court",
    cell: ({ row }) => {
      return (
        <div className='max-w-xs truncate'>
          {row.original.courtType?.name || "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "sessionDuration",
    header: "Durasi Per Sesi",
    cell: ({ row }) => `${row.original.sessionDuration} Menit` || "-",
  },
  {
    accessorKey: "floorType",
    header: "Jenis Permukaan",
    cell: ({ row }) => row.original.floorType?.name || "-",
  },
  {
    id: "pricePerHour",
    header: "Harga Per Sesi",
    cell: ({ row }) => {
      return `${row.original.pricePerHour.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      })}`;
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row, table }) => {
      const meta = table.options.meta as TableMeta | undefined;
      return (
        <div className='flex items-center space-x-2'>
          <Switch
            id={`status-${row.original.id}`}
            checked={row.original.isActive}
            onCheckedChange={() => meta?.onStatusChange(row.original)}
          />
          <Label htmlFor={`status-${row.original.id}`}>
            {row.original.isActive ? "Active" : "Inactive"}
          </Label>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row, table }) => {
      const data = row.original;
      const meta = table.options.meta as TableMeta | undefined;
      return (
        <div className='flex gap-2 items-center'>
          {/* <button className='text-green-600 hover:text-white border-green-500 hover:bg-green-500 p-1 rounded-sm border  transition cursor-pointer'>
            <Link href={`/admin/venues/${data.id}/edit`}>
              <Icon icon='heroicons:pencil' className='size-3' />
            </Link>
          </button> */}
          <button
            onClick={() => {
              meta?.onDelete(data);
            }}
            className='text-red-600 hover:text-white border-red-500 hover:bg-red-500 p-1 rounded-sm border  transition cursor-pointer'>
            <Icon icon='heroicons:trash' className='size-3' />
          </button>
        </div>
      );
    },
  },
  {
    id: "details",
    header: "",
    cell: ({ row }) => {
      const court = row.original;
      return (
        <div className='flex gap-2 items-center'>
          <button className='p-1 cursor-pointer'>
            <Link href={`/admin/courts/${court.id}`}>
              <Icon icon='heroicons-solid:chevron-right' className='size-4' />
            </Link>
          </button>
        </div>
      );
    },
  },
];
