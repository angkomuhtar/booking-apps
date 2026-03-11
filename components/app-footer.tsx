import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const AppFooter = () => {
  return (
    <footer className='bg-secondary text-secondary-foreground mt-16'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-8'>
          <div className='grid gap-2 col-span-2 md:col-span-1'>
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
            <p className='text-sm text-secondary-foreground/80 mb-4'>
              Indonesia&rsquo;s premier court booking platform for badminton and
              padel enthusiasts.
            </p>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/venues'
                  className='hover:text-primary transition-colors'>
                  All Venues
                </Link>
              </li>
              <li>
                <Link
                  href='/bookings'
                  className='hover:text-primary transition-colors'>
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary transition-colors'>
                  How It Works
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary transition-colors'>
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Support</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#' className='hover:text-primary transition-colors'>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary transition-colors'>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary transition-colors'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-primary transition-colors'>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className='col-span-2 md:col-span-1'>
            <h4 className='font-semibold mb-4'>Contact Info</h4>
            <ul className='space-y-2 text-sm'>
              <li className='flex items-center gap-2'>
                <Phone className='h-4 w-4' />
                +62 812 3456 7890
              </li>
              <li className='flex items-center gap-2'>
                <Mail className='h-4 w-4' />
                support@ayobooking.com
              </li>
              <li className='flex items-center gap-2'>
                <MapPin className='h-4 w-4' />
                Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-secondary-foreground/20 pt-6 text-center text-sm text-secondary-foreground/60'>
          <p>&copy; 2026 palmpadel.id</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
