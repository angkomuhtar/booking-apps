import {
  BadgeDollarSign,
  Menu,
  ShoppingCart,
  User2,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { auth } from "@/auth";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";

const AppNav = async () => {
  const session = await auth();

  return (
    <header className='bg-white border-b sticky top-0 z-50 shadow-xs'>
      <div className='container px-4'>
        <div className='flex justify-between items-center py-4'>
          <Link href='/' className='flex items-center gap-2 group'>
            <div className='bg-primary p-2.5 rounded-lg group-hover:scale-105 transition-transform'>
              <BadgeDollarSign className='h-6 w-6 text-primary-foreground' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-secondary'>Booking</h1>
              <p className='text-xs text-muted-foreground'>Court Reservation</p>
            </div>
          </Link>

          <nav className='nav-menu'>
            <Link
              href='/venues'
              className='hover:text-primary transition-colors'>
              All Venues
            </Link>
            <Link
              href='/bookings'
              className='hover:text-primary transition-colors'>
              My Bookings
            </Link>
            <Link href='#' className='hover:text-primary transition-colors'>
              About Us
            </Link>
            <Link href='#' className='hover:text-primary transition-colors'>
              Contact
            </Link>
          </nav>

          <nav className='flex sm:gap-6 gap-3 items-center min-h-10'>
            <Sheet>
              <SheetTrigger className='cursor-pointer'>
                <ShoppingCart className='w-6 h-6 ' />
              </SheetTrigger>
              <SheetContent className='right-4 inset-y-4 rounded-md h-auto sm:max-w-lg'>
                <SheetHeader>
                  <SheetTitle>Cart</SheetTitle>
                </SheetHeader>
                <div className='grid flex-1 auto-rows-min gap-4 px-4'>
                  <div className='border border-input shadow-xs rounded-md p-4 flex gap-4'>
                    <div className='flex flex-col justify-center w-full gap-2.5'>
                      <div className='flex items-center flex-wrap justify-between gap-2.5'>
                        <a
                          className='hover:text-primary-active font-semibold text-dark leading-5.5'
                          href='#'>
                          Stadion Glora Kadrie Oening
                        </a>
                      </div>
                      <div className='grid grid-cols-2 sm:flex justify-between'>
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
                          <span className='font-semibold leading-3'>
                            badminton
                          </span>
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
                    <div className='flex flex-col items-end justify-between gap-3'>
                      <div className='flex flex-col'>
                        <span className='text-[11px] text-muted-foreground font-thin line-through'>
                          Rp.300.000
                        </span>
                        <span className='text-sm font-medium text-dark'>
                          Rp.250.000
                        </span>
                      </div>
                      <button
                        data-slot='button'
                        className='cursor-pointer group justify-center text-red-500 border border-red-500 rounded-sm p-1'>
                        <Icon icon='lucide:trash-2' className='size-3' />
                      </button>
                    </div>
                  </div>
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
            <div className='w-[1px] bg-border h-5'></div>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className='flex items-center cursor-pointer'>
                    <User2 className='sm:h-8 sm:w-8 text-white transition-colors bg-slate-700 rounded-full p-0.5' />
                    <div className='sm:flex flex-col ml-2 hidden'>
                      <p className='font-light text-[10px]'>Welcome,</p>
                      <p className='font-semibold text-sm leading-none'>
                        {session.user?.name}
                      </p>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='top' sideOffset={10} align='end'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Profile
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Billing
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Settings
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Keyboard shortcuts
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href='/login' className='flex items-center'>
                <User2 className='sm:h-8 sm:w-8 text-muted-foreground hover:text-primary transition-colors' />
                <div className='flex flex-col ml-2'>
                  <p className='font-light text-[10px]'>Welcome,</p>
                  <p className='font-semibold text-sm leading-none'>
                    Login / Register
                  </p>
                </div>
              </Link>
            )}

            <div className='w-px bg-border h-5 lg:hidden'></div>
            <Sheet>
              <SheetTrigger>
                <Menu className='w-6 h-6 cursor-pointer lg:hidden' />
              </SheetTrigger>
              <SheetContent className='w-[400px] sm:w-[540px]'>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppNav;
