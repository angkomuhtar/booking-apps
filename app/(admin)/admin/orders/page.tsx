import { hasPermission } from "@/lib/auth-helpers";
import { TableClient } from "./table-client";
import { getOrders } from "@/lib/actions/order";

export default async function AdminVenuesPage() {
  await hasPermission("orders.view");

  const result = await getOrders();

  return (
    <div className='flex flex-1 flex-col p-4 pt-0 font-sans'>
      <div className='flex flex-wrap items-center justify-between gap-5 pb-6'>
        <div className='flex flex-col justify-center gap-2'>
          <h1 className='text-xl font-medium leading-none text-mono'>Orders</h1>
          <div className='flex items-center gap-2 text-sm font-normal text-muted-foreground'>
            List data Pesanan di sistem
          </div>
        </div>
      </div>

      {result.success ? (
        <TableClient data={result?.data || []} />
      ) : (
        <div className='bg-sidebar-accent min-h-72 rounded-md flex items-center justify-center'>
          <p className='text-muted-foreground'>No data available</p>
        </div>
      )}
    </div>
  );
}
