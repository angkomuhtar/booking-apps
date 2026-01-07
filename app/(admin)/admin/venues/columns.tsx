"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { deleteVenue } from "@/lib/actions/venue";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export type VenueColumn = {
  id: string;
  name: string;
  address: string;
  city: { name: string } | null;
  province: { name: string } | null;
  venueFacilities: { facility: { name: string } }[];
  openingTime: string;
  closingTime: string;
  createdAt: Date;
  courts: { id: string; name: string }[];
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
      return `${row.original.courts.length} Lapangan`;
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
    header: "Jam Operasional",
    cell: ({ row }) => {
      return row.original.openingTime + " - " + row.original.closingTime;
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const venue = row.original;

      const handleDelete = async () => {
        const result = await deleteVenue(venue.id);
        if (result.success) {
          toast.success(result.message);
          // window.location.reload();
        } else {
          toast.error(result.message);
        }
      };

      return (
        <div className='flex gap-2 items-center'>
          <button className='text-green-600 hover:text-white border-green-500 hover:bg-green-500 p-1 rounded-sm border  transition cursor-pointer'>
            <Link href={`/admin/venues/${venue.id}/edit`}>
              <Icon icon='heroicons:pencil' className='size-3' />
            </Link>
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className='text-red-600 hover:text-white border-red-500 hover:bg-red-500 p-1 rounded-sm border  transition cursor-pointer'>
                <Icon icon='heroicons:trash' className='size-3' />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
