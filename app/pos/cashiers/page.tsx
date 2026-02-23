import PageHeader from "@/components/pos/page-header";
import PosCart from "@/components/pos/pos-cart";
import VenueCourt from "@/components/pos/venue-court";
import VenueProduct from "@/components/pos/venue-product";
import {
  BanknoteArrowUp,
  BanknoteX,
  FolderArchive,
  Pencil,
  Trash,
} from "lucide-react";
import React from "react";

const Page = async () => {
  return (
    <>
      <div className='flex-1 overflow-auto [&::-webkit-scrollbar]:w-2 py-6 px-4'>
        <div className='flex flex-wrap items-center justify-between gap-5 pb-2'>
          <PageHeader title='POS' subtitle='Point of Sale' />
        </div>

        <VenueCourt />

        <VenueProduct />
      </div>

      <PosCart />
    </>
  );
};

export default Page;
