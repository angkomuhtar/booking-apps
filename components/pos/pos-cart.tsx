"use client";
import { usePosStore } from "@/store/usePosStore";
import { BanknoteArrowUp, BanknoteX, FolderArchive, Trash } from "lucide-react";
import React from "react";
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
} from "../ui/alert-dialog";
import SheetDraft from "./sheet-draft";
import { useDraftPosStore } from "@/store/useDraftPosStore";

const PosCart = () => {
  const {
    getItemsByType,
    removeCart,
    getSubTotalPrice,
    getTotalPrice,
    clearCart,
  } = usePosStore();

  const { addtoDraft } = useDraftPosStore();

  return (
    <div className='p-2 w-72 flex flex-col justify-between gap-2.5'>
      <div className='rounded-lg shadow-sm bg-white w-full flex-1 overflow-auto [&::-webkit-scrollbar]:w-2'>
        <div className='p-4 border-b border-dashed flex justify-between items-center'>
          <h3 className='text-sm font-semibold'>
            Order <span className='font-light'>#f4235</span>
          </h3>
          <div className='flex items-center gap-3'>
            <SheetDraft />
            {/* <button
              className='cursor-pointer text-red-500 hover:text-red-600'
              onClick={() => {
                clearCart();
              }}>
              <Trash className='size-3.5' />
            </button> */}
          </div>
        </div>
        <div className='p-4 space-y-2'>
          <h3 className='text-sm font-semibold'>Court Item</h3>

          <div className='grid'>
            {getItemsByType("COURT_BOOKING").length == 0 ? (
              <div className='w-full flex items-center justify-center text-sm text-gray-500 font-semibold'>
                <p>No court bookings</p>
              </div>
            ) : (
              getItemsByType("COURT_BOOKING").map((item, index) => (
                <div
                  className='flex justify-between items-center w-full relative py-2 px-0.5 group hover:px-2'
                  key={index}>
                  <div className='flex-1'>
                    <p className='text-xs font-semibold line-clamp-1'>
                      {item.name}
                    </p>
                    <p className='text-[11px] text-gray-800 font-mono line-clamp-1'>
                      {item.date} | {item.startTime} - {item.endTime}
                    </p>
                  </div>
                  <span className='font-medium text-xs'>
                    Rp {item.price.toLocaleString("id-ID")}
                  </span>
                  <div className='absolute left-0 top-0 w-full h-full rounded-lg group-hover:visible invisible bg-white/90 border border-red-100 flex items-center justify-end px-2'>
                    <button
                      className='border bg-red-500 rounded-md py-1 px-2 flex items-center gap-1 text-white text-xs font-semibold cursor-pointer'
                      onClick={() => {
                        removeCart(item.id);
                        toast.error("Item removed from cart");
                      }}>
                      <Trash className='size-3 text-white' /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className='flex justify-between'>
            <span className='text-xs text-gray-600'>SubTotal</span>
            <span className='font-bold text-sm'>
              Rp {getSubTotalPrice("COURT_BOOKING").toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <div className='p-4 space-y-2'>
          <h3 className='text-sm font-semibold'>Products Item</h3>

          <div className='grid gap-2'>
            {getItemsByType("PRODUCT").length == 0 ? (
              <div className='w-full flex items-center justify-center text-sm text-gray-500 font-semibold'>
                <p>No product bookings</p>
              </div>
            ) : (
              getItemsByType("PRODUCT").map((item, index) => (
                <div className='flex justify-between gap-2' key={index}>
                  <span className='text-xs text-gray-600'>
                    {item.quantity}x
                  </span>
                  <span className='text-xs text-gray-600 line-clamp-1 flex-1 font-semibold'>
                    {item.name}
                  </span>
                  <span className='font-medium text-xs'>
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className='flex justify-between'>
            <span className='text-xs text-gray-600'>Total</span>
            <span className='font-bold text-sm'>
              Rp {getSubTotalPrice("PRODUCT").toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>
      <div className='rounded-lg shadow-sm bg-white w-full p-4'>
        <h3 className='text-sm font-semibold'>Order Summary</h3>
        <div className='py-4 space-y-1.5'>
          <div className='flex justify-between'>
            <span className='text-xs text-gray-600'>Subtotal</span>
            <span className='font-medium text-xs'>
              Rp {getTotalPrice().toLocaleString("id-ID")}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-xs text-gray-600'>Tax (11%)</span>
            <span className='font-medium text-xs'>
              Rp {(getTotalPrice() * 0.11).toLocaleString("id-ID")}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-xs text-gray-600'>Total</span>
            <span className='font-bold text-sm'>
              Rp {(getTotalPrice() * 1.11).toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>
      <div className='rounded-lg w-full flex gap-2 mb-2.5 py-2.5'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              disabled={
                getItemsByType("COURT_BOOKING").length == 0 &&
                getItemsByType("PRODUCT").length == 0
              }
              className='border border-red-500 text-red-500 bg-white text-xs py-1.5 px-2.5 rounded-md font-semibold cursor-pointer flex items-center justify-center gap-2'>
              <BanknoteX className='size-4' />
              Hapus
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className='w-sm'>
            <AlertDialogHeader>
              <AlertDialogTitle>Anda Yakin Akan Menghapus.?</AlertDialogTitle>
              <AlertDialogDescription>
                Aksi ini akan menghapus secara permanen dan tidak dapat
                dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <button
                  className='border border-teal-500 bg-white text-teal-500 px-4 py-2 rounded-md font-semibold cursor-pointer hover:bg-teal-500 hover:text-white'
                  onClick={() => {
                    addtoDraft({
                      id: Date.now().toString(),
                      name: `Draft Order #${Date.now()}`,
                      item: [
                        ...getItemsByType("COURT_BOOKING"),
                        ...getItemsByType("PRODUCT"),
                      ],
                      totalCourtPrice: getSubTotalPrice("COURT_BOOKING"),
                      totalProductPrice: getSubTotalPrice("PRODUCT"),
                      grandTotal: getTotalPrice(),
                    });
                    clearCart();
                    toast.success("Added to draft successfully");
                  }}>
                  Draft
                </button>
              </AlertDialogAction>
              <AlertDialogAction asChild>
                <button
                  className='border border-red-500 bg-white text-red-500 px-4 py-2 rounded-md font-semibold cursor-pointer hover:bg-red-500 hover:text-white'
                  onClick={() => {
                    clearCart();
                    toast.success("Cart cleared successfully");
                  }}>
                  Hapus
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <button className='flex-1 bg-teal-500 text-white text-xs py-1.5 rounded-md font-semibold cursor-pointer flex items-center justify-center gap-2'>
          <BanknoteArrowUp className='size-4' />
          Bayar
        </button>
      </div>
    </div>
  );
};

export default PosCart;
