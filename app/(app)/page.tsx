export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

import CustButton from "@/components/custom-ui/cust-button";
import ProductCard from "@/components/custom-ui/product-card";
import { getPopularVenues } from "@/lib/actions/venue";

export default async function Home() {
  const venues = await getPopularVenues();
  return (
    <>
      {/* header Banner */}
      <section className='bg-[url(/image/bg-2.png)] bg-cover bg-right bg-no-repeat relative'>
        <div className='absolute top-0 sm:right-[30%] lg:right-[26%] h-full overflow-hidden z-10'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='object-contain sm:w-full w-[120%] h-[120%] sm:h-[110%] overflow-hidden'
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
        <div className='container mx-auto px-4 py-16 md:py-24 min-h-[530px] z-20 relative'>
          <div className='grid md:grid-cols-2 gap-8 items-center w-5/6 sm:w-full'>
            <div>
              <Badge className='bg-primary text-primary-foreground font-bold mb-4'>
                Special Offer - 20% OFF
              </Badge>
              <h2 className='text-4xl md:text-5xl font-bold mb-4 text-black'>
                Super Sport Community App
              </h2>
              <p className='text-lg mb-6'>
                Premium badminton & padel courts available for booking. Easy
                online reservation, instant confirmation.
              </p>
              <div className='flex gap-4'>
                <Button
                  asChild
                  size='lg'
                  variant='secondary'
                  className='shadow-lg bg-primary hover:bg-primary/80 font-bold text-white'>
                  <Link href='/venues' className='gap-2'>
                    Browse Venues
                    <ChevronRight className='h-4 w-4' />
                  </Link>
                </Button>
              </div>
            </div>
            <div className='hidden md:block'></div>
          </div>
        </div>
      </section>

      <section className='py-8 sm:py-24 bg-muted/50'>
        <div className='container px-4'>
          <div>
            <h3 className='text-3xl font-bold'>Find Your Perfect Court</h3>
            <p className='text-sm text-muted-foreground mb-10'>
              Search and book badminton & padel courts in just a few clicks
            </p>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 sm:gap-6 gap-3 text-center'>
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
            <div className='col-span-2'>
              <CustButton />
            </div>
          </div>
        </div>
      </section>

      <main className='container py-12'>
        <section>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='md:text-2xl text-lg font-bold sm:mb-2 mb-1'>
                Popular Choice
              </h2>
              <div className='bg-primary h-1.5 w-20'></div>
            </div>
            <div className='mx-4 h-8 border-l ' />
            <button className='text-primary font-medium cursor-pointer group text-sm'>
              See All Venues
              <ArrowRight className='inline-block size-4 md:size-5 ml-3 group-hover:translate-x-2 duration-200 ease-in-out' />
            </button>
          </div>
          <div className='grid lg:grid-cols-5 gap-4 mt-6 py-2 items-stretch'>
            {venues.length === 0 ? (
              <div>No venues found.</div>
            ) : (
              venues.map((venue) => <ProductCard key={venue.id} data={venue} />)
            )}
          </div>
        </section>
      </main>
    </>
  );
}
