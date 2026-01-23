"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GripVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export type ProductColumn = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  stock: number;
  isActive: boolean;
  venue: {
    id: string;
    name: string;
  };
  createdAt: Date;
};

export type TableMeta = {
  onEdit: (data: ProductColumn) => void;
  onDelete: (data: ProductColumn) => void;
  onStatusChange: (data: ProductColumn) => void;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Nama Product",
  },
  {
    id: "venue",
    header: "Venue",
    cell: ({ row }) => {
      return `${row.original.venue.name}`;
    },
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => {
      return `Rp ${row.original.price.toLocaleString("id-ID")}`;
    },
  },

  {
    accessorKey: "stock",
    header: "Stok",
    cell: ({ row }) => {
      return `${row.original.stock}`;
    },
  },
  {
    accessorKey: "imageUrl",
    header: "Gambar",
    cell: ({ row }) => {
      return row.original.imageUrl ? (
        <img
          src={row.original.imageUrl}
          alt={row.original.name}
          className='w-16 h-16 object-cover rounded'
        />
      ) : (
        "No Image"
      );
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
      const product = row.original;
      const meta = table.options.meta as TableMeta | undefined;

      return (
        <div className='flex gap-2 items-center'>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className='focus-visible:outline-none'>
              <GripVertical className='cursor-pointer size-4 text-muted-foreground' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' alignOffset={-32}>
              <DropdownMenuLabel>Action</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => meta?.onEdit(product)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-red-600 focus:text-red-600'
                onSelect={() => meta?.onDelete(product)}>
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
