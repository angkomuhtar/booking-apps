"use client";
import { ClipboardList, HandPlatter, LayoutGrid, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const PosSidebar = () => {
  const menu = [
    {
      label: "Dashboard",
      href: "/pos/dashboard",
      icon: LayoutGrid,
    },
    {
      label: "Cashier",
      href: "/pos/cashiers",
      icon: HandPlatter,
    },
    {
      label: "Orders List",
      href: "#",
      icon: ClipboardList,
    },
  ];

  const pathname = usePathname();

  console.log(pathname);

  return (
    <div className='bg-white py-2 px-4 border-r shadow-xs w-64 flex flex-col justify-between'>
      {/* Additional POS navigation items can go here */}
      <div className='main-nav'>
        <div className='text-sm text-gray-700 font-semibold'>
          Main Navigation
        </div>
        <ul className='mt-4 space-y-1 px-2'>
          {menu.map((item) => (
            <li key={item.label}>
              <Link
                key={item.label}
                href={item.href}
                className={`cursor-pointer rounded-md px-3 py-2 flex items-center space-x-2 group hover:bg-teal-200 ${pathname.startsWith(item.href) ? "border-l-2 border-teal-200" : ""}`}>
                <item.icon className='size-4' />
                <span className='text-gray-700 text-sm font-medium'>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='py-4'>
        <ul className='mt-4 space-y-2 px-2'>
          <li className='rounded-md px-3 py-2 flex items-center space-x-2 group hover:bg-teal-200'>
            <button
              className={`cursor-pointer rounded-md flex items-center space-x-2 group hover:bg-teal-200 `}>
              <LogOut className='size-4' />
              <span className='text-gray-700 text-sm font-medium'>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PosSidebar;
