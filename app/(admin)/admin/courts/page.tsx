import { getCourts } from "@/lib/actions/court";
import { hasPermission } from "@/lib/auth-helpers";
import AddForm from "./add-form";
import {
  getCourtType,
  getFloorTypes,
  getVenuesAsSelect,
} from "@/lib/actions/select";
import { Table } from "lucide-react";
import { TableClient } from "./table-client";

export default async function AdminVenuesPage() {
  await hasPermission("courts.view");

  const result = await getCourts();
  console.log(result.data);

  const venues = await getVenuesAsSelect({ searchParams: "" });
  const courtTypes = await getCourtType();
  const floorTypes = await getFloorTypes();

  return (
    <div className='flex flex-1 flex-col p-4 pt-0 font-sans'>
      <div className='flex flex-wrap items-center justify-between gap-5 pb-6'>
        <div className='flex flex-col justify-center gap-2'>
          <h1 className='text-xl font-medium leading-none text-mono'>Court</h1>
          <div className='flex items-center gap-2 text-sm font-normal text-muted-foreground'>
            List data court yang terdaftar di sistem
          </div>
        </div>
        <div className='flex items-center gap-2.5'>
          <AddForm
            venues={venues}
            courtType={courtTypes}
            floorType={floorTypes}
          />
        </div>
      </div>

      {result.success ? (
        <TableClient data={result.data} />
      ) : (
        <div className='bg-sidebar-accent min-h-72 rounded-md flex items-center justify-center'>
          <p className='text-muted-foreground'>No data available</p>
        </div>
      )}
    </div>
  );
}
