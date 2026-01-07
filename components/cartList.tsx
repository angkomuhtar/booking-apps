"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import { useCartStore } from "@/store/useCartStore";
import { createOrder } from "@/lib/actions/order";
import { toast } from "sonner";
import moment from "moment";

const CartList = () => {
  const { getItemsByType, removeItem, clearCart, getTotalPrice, venueId } =
    useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [open, setOpen] = useState(false);
  const items = getItemsByType("COURT_BOOKING");

  const handleCheckout = async () => {
    if (!venueId || items.length === 0) {
      toast.error("Keranjang kosong");
      return;
    }

    setIsCheckingOut(true);
    try {
      const result = await createOrder({
        venueId,
        items: items.map((item) => ({
          itemType: item.itemType,
          itemId: item.itemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          date: item.date,
          startTime: item.startTime,
          endTime: item.endTime,
          duration: item.duration,
        })),
      });

      if (result.success) {
        toast.success(`Order ${result.data?.orderNumber} berhasil dibuat!`);
        clearCart();
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Gagal membuat order");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className='cursor-pointer relative'>
        <ShoppingCart className='w-6 h-6' />
        {items.length > 0 && (
          <span className='absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
            {items.length}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className='inset-y-4 sm:right-4 rounded-md h-auto w-full sm:max-w-lg gap-0'>
        <SheetHeader>
          <SheetTitle>Keranjang</SheetTitle>
        </SheetHeader>
        <div className='grid flex-1 auto-rows-min gap-4 px-4 overflow-y-auto [&::-webkit-scrollbar]:w-2 py-2 border-t border-b'>
          {items.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-full mt-10'>
              <Icon
                icon='mdi:cart-off'
                className='w-16 h-16 text-muted-foreground mb-4'
              />
              <p className='text-sm text-muted-foreground'>Keranjang kosong</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className='border border-input shadow-xs rounded-md p-4 flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col justify-center w-full gap-2.5'>
                  <div className='flex items-center flex-wrap justify-between gap-2.5'>
                    <span className='font-semibold text-dark leading-5.5'>
                      {item.venueName}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex flex-col text-[11px]'>
                      <span className='text-muted-foreground font-light'>
                        Court :
                      </span>
                      <span className='font-semibold leading-3'>
                        {item.name.split(" - ")[0]}
                      </span>
                    </div>
                    {item.startTime && item.endTime && (
                      <div className='flex flex-col text-[11px]'>
                        <span className='text-muted-foreground font-light'>
                          Sesi :
                        </span>
                        <span className='font-semibold leading-3'>
                          {item.startTime} - {item.endTime}
                        </span>
                      </div>
                    )}
                    {item.date && (
                      <div className='flex flex-col text-[11px]'>
                        <span className='text-muted-foreground font-light'>
                          Tanggal :
                        </span>
                        <span className='font-semibold leading-3'>
                          {moment(item.date).format("DD MMM YYYY")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex sm:flex-col items-center sm:items-end justify-between gap-3'>
                  <div className='flex flex-col flex-1'>
                    <span className='text-sm font-medium text-dark'>
                      Rp {item.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => removeItem(item.id)}
                    className='cursor-pointer group text-red-500 border border-red-500 rounded-sm hover:bg-red-500 py-1 px-2 h-7 hover:text-white transition-colors text-sm'>
                    <Icon icon='lucide:trash-2' className='size-3' />
                    <span className='text-xs font-semibold'>Hapus</span>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className='px-4 py-2 border-b'>
            <div className='flex justify-between items-center'>
              <span className='font-medium'>Total</span>
              <span className='font-bold text-lg'>
                Rp {getTotalPrice().toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        )}
        <SheetFooter className='flex-row gap-2 mt-4'>
          <Button
            variant='outline'
            onClick={clearCart}
            disabled={items.length === 0}>
            Clear
          </Button>
          <Button
            type='button'
            className='bg-primary flex-1'
            disabled={items.length === 0 || isCheckingOut}
            onClick={handleCheckout}>
            <Icon
              icon='material-symbols:shopping-cart-checkout-rounded'
              className='w-5 h-5'
            />
            {isCheckingOut ? "Memproses..." : "Checkout"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartList;
