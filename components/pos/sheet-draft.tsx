import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { BookUp, FolderArchive, Trash, X } from "lucide-react";
import { useDraftPosStore } from "@/store/useDraftPosStore";
import { usePosStore } from "@/store/usePosStore";

const SheetDraft = () => {
  const { draft, addtoDraft, getDraftById, removeDraft } = useDraftPosStore();
  const { addBulkToCart } = usePosStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='cursor-pointer text-green-500 hover:text-green-600'>
          <FolderArchive className='size-3.5' />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Draft Item</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          {draft.length === 0 ? (
            <div className='w-full flex items-center justify-center text-sm text-gray-500 font-semibold'>
              <p>No draft items</p>
            </div>
          ) : (
            draft.map((item, index) => (
              <div
                className='flex justify-between gap-2 border rounded-md py-2 px-3'
                key={index}>
                <div className='flex-1'>
                  <span className='text-xs text-gray-600 line-clamp-1 flex-1 font-semibold'>
                    {item.name}
                  </span>
                  <span className='font-medium text-xs'>
                    Rp {item.grandTotal.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className='grid gap-1'>
                  <button
                    onClick={() => removeDraft(item.id)}
                    className='flex justify-center items-center gap-2 border border-red-500 rounded-md py-0.5 px-2'>
                    <Trash className='size-2.5 text-red-500 hover:text-red-600' />
                    <span className='text-[11px] font-semibold text-red-500'>
                      Hapus
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      addBulkToCart(item.item);
                      removeDraft(item.id);
                    }}
                    className='flex justify-center items-center gap-2 border border-green-500 rounded-md py-0.5 px-2'>
                    <BookUp className='size-2.5 text-green-500 hover:text-green-600' />
                    <span className='text-[11px] font-semibold text-green-500'>
                      Cart
                    </span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetDraft;
