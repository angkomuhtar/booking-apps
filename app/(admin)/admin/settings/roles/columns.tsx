"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GripVertical } from "lucide-react";

export type RoleColumn = {
  id: string;
  name: string;
  description: string | null;
  isSystem: boolean;
  permissions?: {
    permission: {
      id: string;
      name: string;
      code: string;
    };
  }[];
  createdAt: Date;
};

export type RoleTableMeta = {
  onEdit: (role: RoleColumn) => void;
  onDelete: (role: RoleColumn) => void;
};

export const columns: ColumnDef<RoleColumn>[] = [
  {
    accessorKey: "name",
    header: "Role Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => (
      <div className='flex flex-wrap gap-1'>
        {row.original.permissions?.length == 0 ? (
          <span className='text-xs py-1 rounded-md bg-red-500 px-2 text-white font-semibold'>
            No Permissions
          </span>
        ) : (
          <>
            {row.original.permissions?.slice(0, 5).map((perm) => (
              <span
                key={perm.permission.id}
                className='bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded-md self-start'>
                {perm.permission.name}
              </span>
            ))}
            {(row.original.permissions?.length ?? 0) > 5 && (
              <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <span className='inline-block bg-gray-300 text-gray-600 text-xs font-semibold px-2 py-1 rounded-md mr-1 mb-1 cursor-pointer'>
                    +{(row.original.permissions?.length ?? 0) - 5} more
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className='w-md p-2' align='start'>
                  <div className='flex flex-wrap gap-1'>
                    {row.original.permissions?.slice(5).map((perm) => (
                      <span
                        key={perm.permission.id}
                        className='bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded-md self-start'>
                        {perm.permission.name}
                      </span>
                    ))}
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </>
        )}
      </div>
    ),
  },
  {
    accessorKey: "isSystem",
    header: "System Role",
    cell: ({ row }) => (row.original.isSystem ? "Yes" : "No"),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row, table }) => {
      const role = row.original;
      const meta = table.options.meta as RoleTableMeta | undefined;

      return (
        <div className='flex gap-2 items-center'>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className='focus-visible:outline-none'>
              <GripVertical className='cursor-pointer size-4 text-muted-foreground' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' alignOffset={-32}>
              <DropdownMenuLabel>Action</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => meta?.onEdit(role)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-red-600 focus:text-red-600'
                onSelect={() => meta?.onDelete(role)}>
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
