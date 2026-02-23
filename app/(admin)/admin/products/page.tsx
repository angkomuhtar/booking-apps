import { hasPermission, requirePermission } from "@/lib/auth-helpers";
import AddForm from "./add-form";
import { getVenuesAsSelect } from "@/lib/actions/select";
import { TableClient } from "./table-client";
import { getProducts } from "@/lib/actions/products";

export default async function AdminVenuesPage() {
  await requirePermission("products.view");

  const result = await getProducts();
  console.log(result.data);

  const venues = await getVenuesAsSelect({ searchParams: "" });

  return (
    <div className='flex flex-1 flex-col p-4 pt-0 font-sans'>
      <div className='flex flex-wrap items-center justify-between gap-5 pb-6'>
        <div className='flex flex-col justify-center gap-2'>
          <h1 className='text-xl font-medium leading-none text-mono'>Produk</h1>
          <div className='flex items-center gap-2 text-sm font-normal text-muted-foreground'>
            List data Produk di sistem
          </div>
        </div>
        <div className='flex items-center gap-2.5'>
          <AddForm venues={venues} />
        </div>
      </div>

      {result.success ? (
        <TableClient data={result.data ?? []} venues={venues} />
      ) : (
        <div className='bg-sidebar-accent min-h-72 rounded-md flex items-center justify-center'>
          <p className='text-muted-foreground'>No data available</p>
        </div>
      )}
    </div>
  );
}
