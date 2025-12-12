"use client";

import React from "react";
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

const CartList = () => {
  const { items, removeItem } = useCartStore();

  return (
    <Sheet>
      <SheetTrigger className='cursor-pointer'>
        <ShoppingCart className='w-6 h-6 ' />
      </SheetTrigger>
      <SheetContent className='inset-y-4 sm:right-4 rounded-md h-auto w-full sm:max-w-lg gap-0'>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <div className='grid flex-1 auto-rows-min gap-4 px-4 overflow-y-auto [&::-webkit-scrollbar]:w-2 py-2 border-t border-b '>
          {items.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-full mt-10'>
              <Icon
                icon='mdi:cart-off'
                className='w-16 h-16 text-muted-foreground mb-4'
              />
              <p className='text-sm text-muted-foreground'>
                Your cart is empty
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className='border border-input shadow-xs rounded-md p-4 flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col justify-center w-full gap-2.5'>
                  <div className='flex items-center flex-wrap justify-between gap-2.5'>
                    <a
                      className='hover:text-primary-active font-semibold text-dark leading-5.5'
                      href='#'>
                      Stadion Glora Kadrie Oening
                    </a>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex flex-col text-[11px]'>
                      <span className='text-muted-foreground font-light'>
                        Court :
                      </span>
                      <span className='font-semibold leading-3'>
                        Lapangan A
                      </span>
                    </div>
                    <div className='flex flex-col text-[11px]'>
                      <span className='text-muted-foreground font-light'>
                        Tipe :
                      </span>
                      <span className='font-semibold leading-3'>badminton</span>
                    </div>
                    <div className='flex flex-col text-[11px]'>
                      <span className='text-muted-foreground font-light'>
                        Sesi :
                      </span>
                      <span className='font-semibold leading-3'>
                        10:00 - 11:00
                      </span>
                    </div>
                    <div className='flex flex-col text-[11px]'>
                      <span className='text-muted-foreground font-light'>
                        Tanggal :
                      </span>
                      <span className='font-semibold leading-3'>
                        20 Nov 2024
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex sm:flex-col items-center sm:items-end justify-between gap-3'>
                  <div className='flex flex-col flex-1'>
                    <span className='text-[11px] text-muted-foreground font-thin line-through'>
                      Rp.300.000
                    </span>
                    <span className='text-sm font-medium text-dark'>
                      Rp.250.000
                    </span>
                  </div>
                  <Button
                    data-slot='button'
                    type='button'
                    variant='outline'
                    onClick={() => {
                      removeItem(item.id);
                    }}
                    className='cursor-pointer group text-red-500 border border-red-500 rounded-sm hover:bg-red-500 py-1 px-2 h-7 hover:text-white transition-colors text-sm'>
                    <Icon icon='lucide:trash-2' className='size-3' />
                    <span className='text-xs font-semibold'>Hapus</span>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        <SheetFooter className='flex-row gap-2 mt-4'>
          <Button variant='outline' className=''>
            Clear Cart
          </Button>
          <Button type='submit' className='bg-primary flex-1'>
            <Icon
              icon='material-symbols:shopping-cart-checkout-rounded'
              className='w-5 h-5'
            />
            Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartList;
