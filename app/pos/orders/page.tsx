import PageHeader from "@/components/pos/page-header";
import { TableClient } from "./table-client";

export default function PosOrdersPage() {
  return (
    // <div className="flex flex-1 flex-col p-4 pt-0 font-sans">
    //   <div className="flex flex-wrap items-center justify-between gap-5 pb-6">
    //     <div className="flex flex-col justify-center gap-2">
    //       <h1 className="text-xl font-medium leading-none text-mono">Orders</h1>
    //       <div className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
    //         List data Pesanan di sistem
    //       </div>
    //     </div>
    //   </div>

    // </div>

    <div className='flex-1 overflow-auto [&::-webkit-scrollbar]:w-2 py-6 px-4'>
      <div className='flex flex-wrap items-center justify-between gap-5 pb-2'>
        <PageHeader title='POS' subtitle='Point of Sale' />
      </div>
      <TableClient />
    </div>
  );
}
