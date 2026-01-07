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

export type PermissionColumn = {
  id: string;
  name: string;
  description: string | null;
  code: string;
  group: string;
  createdAt: Date;
};

export type PermissionTableMeta = {
  onEdit: (permission: PermissionColumn) => void;
  onDelete: (permission: PermissionColumn) => void;
};

export const columns: ColumnDef<PermissionColumn>[] = [
  {
    accessorKey: "name",
    header: "Permission Name",
  },
  {
    accessorKey: "group",
    header: "Group",
  },
  {
    accessorKey: "code",
    header: "Permission Code",
    cell: ({ row }) => row.original.code,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.original.description || "-",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row, table }) => {
      const permission = row.original;
      const meta = table.options.meta as PermissionTableMeta | undefined;

      return (
        <div className='flex gap-2 items-center'>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className='focus-visible:outline-none'>
              <GripVertical className='cursor-pointer size-4 text-muted-foreground' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' alignOffset={-32}>
              <DropdownMenuLabel>Action</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => meta?.onEdit(permission)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-red-600 focus:text-red-600'
                onSelect={() => meta?.onDelete(permission)}>
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
