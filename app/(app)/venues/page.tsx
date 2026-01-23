import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarIcon, ChevronRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/custom-ui/product-card";
import { getPopularVenues, getVenues } from "@/lib/data/venue";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import CustButton from "@/components/custom-ui/cust-button";

export default async function VenuesPage() {
  const venues = await getPopularVenues();

  return (
    <div className='min-h-screen bg-background'>
      <section className='bg-[url(/image/bg-2.png)] bg-cover bg-right bg-no-repeat relative border-b'>
        <div className='absolute top-0 sm:right-[30%] lg:right-[46%] h-full overflow-hidden z-10'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='object-contain w-full h-full sm:h-[110%] overflow-hidden'
            viewBox='0 0 649 578'>
            <path
              fill='#FFF'
              d='m-225.5 154.7 358.45 456.96c7.71 9.83 21.92 11.54 31.75 3.84l456.96-358.45c9.83-7.71 11.54-21.92 3.84-31.75L267.05-231.66c-7.71-9.83-21.92-11.54-31.75-3.84l-456.96 358.45c-9.83 7.71-11.54 21.92-3.84 31.75z'
            />
            <path
              fill='none'
              stroke='#222529'
              strokeMiterlimit='10'
              strokeWidth='1.5'
              d='m416-21 202.27 292.91c5.42 7.85 3.63 18.59-4.05 24.25L198 603'
              className='lineArray animate-dasharray animation-delay-200 duration-500'
            />
          </svg>
        </div>
        <div className='container mx-auto px-4 py-16 z-20 relative'>
          <div className='grid md:grid-cols-2 gap-8 items-center w-5/6 sm:w-full'>
            <div>
              <h2 className='text-4xl md:text-5xl font-bold mb-4 text-black'>
                Temukan Venue Terbaik
              </h2>
            </div>
            <div className='hidden md:block'></div>
          </div>
        </div>
      </section>
      <header className=''>
        <div className='container mx-auto px-4 py-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
            <div className='rounded-full px-6 py-4 bg-white hover:border-primary/50 transition-all shadow-sm'>
              <select
                name='sport'
                id='sport'
                defaultValue=''
                className='w-full border-0 focus-visible:outline-0 font-light text-sm'>
                <option disabled value=''>
                  Jenis Olahraga
                </option>
                <option value='badminton'>Badminton</option>
                <option value='padel'>Padel</option>
              </select>
            </div>
            <div className='rounded-full px-6 py-4 bg-white hover:border-primary/50 transition-all shadow-sm'>
              <select
                name='sport'
                id='sport'
                className='w-full border-0 focus-visible:outline-0 font-light text-sm'>
                <option disabled value=''>
                  Pilih Lokasi
                </option>
                <option value='Samarinda'>Samarinda</option>
                <option value='Balikpapan'>Balikpapan</option>
              </select>
            </div>
            {/* 
            <Popover>
              <PopoverTrigger
                asChild
                className='rounded-full px-6 py-4 bg-white shadow-sm'>
                <div className='flex items-center justify-between cursor-pointer font-light text-sm'>
                  <span>Pilih Tanggal</span>
                  <CalendarIcon className='h-4 w-4' />
                </div>
              </PopoverTrigger>
              <PopoverContent className='p-0 '>
                <Calendar
                  mode='single'
                  captionLayout='dropdown'
                  className='w-full'
                />
              </PopoverContent>
            </Popover> */}

            {/* <LiquidButton>Liquid Button</LiquidButton> */}
            <CustButton />
          </div>
        </div>
      </header>

      <main className='container mx-auto px-4 py-8'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {venues.length === 0 ? (
            <div>No venues found.</div>
          ) : (
            venues.map((venue) => <ProductCard key={venue.id} data={venue} />)
          )}
        </div>

        {venues.length === 0 && (
          <Card>
            <CardContent className='py-8 text-center'>
              <p className='text-muted-foreground'>No venues available yet</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
