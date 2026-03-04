"use client";

import { Menu, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { signOut, useSession } from "next-auth/react";
import CartList from "./cartList";
import { useIsMobile } from "@/hooks/use-mobile";
import { Icon } from "@iconify/react";

const AppNav = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isMobile = useIsMobile();

  console.log("from isMobile", isMobile, pathname);

  return (
    <>
      <header className='bg-white border-b sticky top-0 z-50 shadow-xs'>
        <div className='container px-4'>
          <div className='flex justify-between items-center py-4'>
            <Link href='/' className='flex items-center gap-2 group'>
              <div className='bg-primary p-1 rounded-lg group-hover:scale-105 transition-transform'>
                <img src='/image/logo.png' alt='Logo' className='size-9' />
              </div>
              <div>
                <h1 className='text-xl font-bold text-primary tracking-tighter'>
                  palmpadel.id
                </h1>
                <p className='text-xs text-muted-foreground tracking-tight'>
                  court & cafe booking
                </p>
              </div>
            </Link>

            {!isMobile && (
              <nav className='nav-menu'>
                <Link
                  href='/venues'
                  className='hover:text-primary transition-colors group'>
                  <span>Venue</span>
                  <div className='h-1 w-0 group-hover:w-1/2 duration-500 bg-primary'></div>
                </Link>
                <Link
                  href='/orders'
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
            )}

            {isMobile ? (
              <CartList />
            ) : (
              <nav className='flex md:gap-6 gap-3 items-center min-h-10'>
                <CartList />
                <div className='w-px bg-border h-5'></div>
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
                        <DropdownMenuItem asChild className='cursor-pointer'>
                          <Link href='/orders'>My Orders</Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        {session.user?.role != "User" && (
                          <DropdownMenuItem asChild className='cursor-pointer'>
                            <Link href='/admin'>Admin Page</Link>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className='cursor-pointer'
                        onClick={() => {
                          signOut({ callbackUrl: "/" });
                        }}>
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
            )}
          </div>
        </div>
      </header>

      {isMobile && (
        <nav className='bg-white px-6 py-2 fixed w-full bottom-0 left-0 right-0 flex justify-between items-center rounded-t-xl border border-border z-50'>
          <Link
            href='/'
            className='flex justify-center items-center flex-col space-y-1'>
            <Icon icon='ion:home-outline' className='size-5 text-primary' />
            <span className='text-[11px] text-muted-foreground font-semibold'>
              Home
            </span>
          </Link>
          <Link
            href='/venues'
            className='flex justify-center items-center flex-col space-y-1'>
            <Icon icon='ion:calendar-outline' className='size-5 text-primary' />
            <span className='text-[11px] text-muted-foreground font-semibold'>
              Book
            </span>
          </Link>
          <Link
            href='/orders'
            className='flex justify-center items-center flex-col space-y-1'>
            <Icon
              icon='ion:clipboard-outline'
              className='size-5 text-primary'
            />
            <span className='text-[11px] text-muted-foreground font-semibold'>
              Orders
            </span>
          </Link>
          <div className='flex justify-center items-center flex-col space-y-1'>
            <Icon
              icon='ion:person-circle-outline'
              className='size-5 text-primary'
            />
            <span className='text-[11px] text-muted-foreground font-semibold'>
              Account
            </span>
          </div>
        </nav>
      )}
    </>
  );
};

export default AppNav;
