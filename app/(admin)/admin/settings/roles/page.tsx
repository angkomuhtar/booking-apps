import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Icon } from "@iconify/react";
import { getVenues } from "@/lib/actions/venue";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export default async function AdminVenuesPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (
    session.user.role !== "SUPER_ADMIN" &&
    session.user.role !== "VENUE_ADMIN"
  ) {
    redirect("/");
  }

  const result = await getVenues();

  return (
    <div className='flex flex-1 flex-col p-4 pt-0 font-sans'>
      <div className='flex flex-wrap items-center justify-between gap-5 pb-6'>
        <div className='flex flex-col justify-center gap-2'>
          <h1 className='text-xl font-medium leading-none text-mono'>Roles</h1>
          <div className='flex items-center gap-2 text-sm font-normal text-muted-foreground'></div>
        </div>
        <div className='flex items-center gap-2.5'>
          <Link
            href='/admin/venues/add'
            className='bg-white border border-muted-foreground rounded-md px-4 py-2 inline-flex justify-center items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer hover:bg-black hover:text-white transition-colors'>
            <Icon icon='heroicons:plus-16-solid' className='size-4' />
            Tambah Data
          </Link>
        </div>
      </div>

      {result.success ? (
        <DataTable
          columns={columns}
          data={result.data}
          searchKey='name'
          searchPlaceholder='Cari venue...'
        />
      ) : (
        <div className='bg-sidebar-accent min-h-72 rounded-md flex items-center justify-center'>
          <p className='text-muted-foreground'>{result.message}</p>
        </div>
      )}
    </div>
  );
}
