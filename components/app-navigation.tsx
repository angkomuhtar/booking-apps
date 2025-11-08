import { BadgeDollarSign, Menu, ShoppingCart, User2, X } from "lucide-react";
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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { auth } from "@/auth";

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
            <Link href='/venues' className='flex items-center'>
              <ShoppingCart className='w-6 h-6 ' />
            </Link>
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
