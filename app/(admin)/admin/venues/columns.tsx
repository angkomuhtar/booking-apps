"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { deleteVenue } from "@/lib/actions/venue";
import { toast } from "sonner";

export type VenueColumn = {
  id: string;
  name: string;
  address: string;
  city: { name: string } | null;
  province: { name: string } | null;
  venueFacilities: { facility: { name: string } }[];
  createdAt: Date;
};

export const columns: ColumnDef<VenueColumn>[] = [
  {
    accessorKey: "name",
    header: "Nama Venue",
  },
  {
    accessorKey: "address",
    header: "Alamat",
    cell: ({ row }) => {
      const address = row.original.address;
      return <div className='max-w-xs truncate'>{address}</div>;
    },
  },
  {
    accessorKey: "city.name",
    header: "Kota",
    cell: ({ row }) => row.original.city?.name || "-",
  },
  {
    accessorKey: "province.name",
    header: "Provinsi",
    cell: ({ row }) => row.original.province?.name || "-",
  },
  {
    id: "courts",
    header: "Lapangan",
    cell: ({ row }) => {
      return `${row.original.venueFacilities.length} Lapangan`;
    },
  },
  {
    id: "facilities",
    header: "Fasilitas",
    cell: ({ row }) => {
      return `${row.original.venueFacilities.length} fasilitas`;
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const venue = row.original;

      const handleDelete = async () => {
        if (
          confirm(`Apakah Anda yakin ingin menghapus venue "${venue.name}"?`)
        ) {
          const result = await deleteVenue(venue.id);
          if (result.success) {
            toast.success(result.message);
            window.location.reload();
          } else {
            toast.error(result.message);
          }
        }
      };

      return (
        <div className='flex gap-2 items-center'>
          <button className='text-green-600 hover:text-white border-green-500 hover:bg-green-500 p-1 rounded-sm border  transition cursor-pointer'>
            <Link href={`/admin/venues/${venue.id}/edit`}>
              <Icon icon='heroicons:pencil' className='size-3' />
            </Link>
          </button>
          <button
            onClick={handleDelete}
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
      const venue = row.original;
      return (
        <div className='flex gap-2 items-center'>
          <button className='p-1 cursor-pointer'>
            <Link href={`/admin/venues/${venue.id}`}>
              <Icon icon='heroicons-solid:chevron-right' className='size-4' />
            </Link>
          </button>
        </div>
      );
    },
  },
];
