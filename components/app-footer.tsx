import { Mail, MapPin, Phone, Trophy } from "lucide-react";
import Link from "next/link";
import React from "react";

const AppFooter = () => {
  return (
    <footer className='bg-secondary text-secondary-foreground mt-16'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid md:grid-cols-4 gap-8 mb-8'>
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <div className='bg-primary p-2 rounded-lg'>
                <Trophy className='h-5 w-5 text-primary-foreground' />
              </div>
              <h3 className='text-xl font-bold'>Ayo Booking</h3>
            </div>
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

          <div>
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
          <p>&copy; 2025 Ayo Booking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
