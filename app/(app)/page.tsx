import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ChevronRight,
  Calendar as CalendarIcon,
  ArrowRight,
} from "lucide-react";

import CustButton from "@/components/custom-ui/cust-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import ProductCard from "@/components/custom-ui/product-card";

export default async function Home() {
  const venues = await prisma.venue.findMany({
    include: {
      courts: true,
      city: true,
    },
    take: 6,
  });

  return (
    <>
      {/* header Banner */}
      <section className='bg-[url(/image/bg-2.png)] bg-cover bg-right bg-no-repeat relative'>
        <div className='absolute top-0 sm:right-[30%] lg:right-[26%] h-full overflow-hidden z-10'>
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
                  className='shadow-lg bg-primary hover:bg-primary/50 font-bold'>
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

      <section className='py-24 bg-muted/50'>
        <div className='container px-4'>
          <div>
            <h3 className='text-3xl font-bold'>Find Your Perfect Court</h3>
            <p className='text-sm text-muted-foreground mb-10'>
              Search and book badminton & padel courts in just a few clicks
            </p>
          </div>
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
            </Popover>

            {/* <LiquidButton>Liquid Button</LiquidButton> */}
            <CustButton />
          </div>
        </div>
      </section>

      {/* <section className='py-8 bg-muted/50'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
            <div>
              <div className='text-3xl font-bold text-primary mb-1'>500+</div>
              <div className='text-sm text-muted-foreground'>
                Happy Customers
              </div>
            </div>
            <div>
              <div className='text-3xl font-bold text-primary mb-1'>50+</div>
              <div className='text-sm text-muted-foreground'>
                Premium Venues
              </div>
            </div>
            <div>
              <div className='text-3xl font-bold text-primary mb-1'>1000+</div>
              <div className='text-sm text-muted-foreground'>Bookings Made</div>
            </div>
            <div>
              <div className='text-3xl font-bold text-primary mb-1'>4.9</div>
              <div className='text-sm text-muted-foreground'>
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <main className='container py-12'>
        <section>
          <div className='flex items-center'>
            <div>
              <h2 className='text-2xl font-bold mb-2'>Popular Choice</h2>
              <div className='bg-primary h-1.5 w-20'></div>
            </div>
            <div className='mx-4 h-8 border-l ' />
            <button className='text-primary font-medium cursor-pointer group'>
              See All Venues
              <ArrowRight className='inline-block h-5 w-5 ml-3 group-hover:translate-x-2 duration-200 ease-in-out' />
            </button>
          </div>
          <div className='grid lg:grid-cols-5 gap-4 mt-6 py-2'>
            {venues.length === 0 ? (
              <div>No venues found.</div>
            ) : (
              venues.map((venue) => <ProductCard key={venue.id} />)
            )}
          </div>
        </section>
      </main>

      {/* <main className='container mx-auto px-4 py-12'>
        <section className='mb-16' id='how-it-works'>
          <h3 className='text-3xl font-bold text-center mb-3'>
            Why Choose Ayo Booking?
          </h3>
          <p className='text-center text-muted-foreground mb-10'>
            Simple, fast, and reliable court booking
          </p>
          <div className='grid md:grid-cols-3 gap-6'>
            <Card className='text-center hover:shadow-lg transition-all border-2 hover:border-primary/40 group'>
              <CardHeader>
                <div className='mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors'>
                  <Clock className='h-8 w-8 text-primary' />
                </div>
                <CardTitle>Quick & Easy Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground'>
                  Reserve your court in just a few clicks. Real-time
                  availability and instant confirmation.
                </p>
              </CardContent>
            </Card>

            <Card className='text-center hover:shadow-lg transition-all border-2 hover:border-primary/40 group'>
              <CardHeader>
                <div className='mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors'>
                  <MapPin className='h-8 w-8 text-primary' />
                </div>
                <CardTitle>Premium Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground'>
                  Access to the best venues across the city with top-notch
                  facilities and equipment.
                </p>
              </CardContent>
            </Card>

            <Card className='text-center hover:shadow-lg transition-all border-2 hover:border-primary/40 group'>
              <CardHeader>
                <div className='mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors'>
                  <Trophy className='h-8 w-8 text-primary' />
                </div>
                <CardTitle>Best Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground'>
                  Professional courts, modern amenities, and excellent customer
                  service guaranteed.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className='mb-16'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h3 className='text-3xl font-bold mb-2'>Featured Venues</h3>
              <p className='text-muted-foreground'>Top-rated courts near you</p>
            </div>
            <Button
              asChild
              variant='outline'
              className='gap-2 hover:bg-primary hover:text-primary-foreground'>
              <Link href='/venues'>
                View All Venues
                <ChevronRight className='h-4 w-4' />
              </Link>
            </Button>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {venues.map((venue) => (
              <Card
                key={venue.id}
                className='group hover:shadow-xl transition-all overflow-hidden border hover:border-primary/50'>
                <div className='h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden'>
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
                  <Trophy className='h-20 w-20 text-primary/30 group-hover:scale-110 transition-transform' />
                  <Badge className='absolute top-3 right-3 bg-primary'>
                    Popular
                  </Badge>
                </div>
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <CardTitle className='group-hover:text-primary transition-colors text-lg'>
                      {venue.name}
                    </CardTitle>
                    <div className='flex items-center gap-1 text-sm'>
                      <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                      <span className='font-semibold'>4.8</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3 mb-4'>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <MapPin className='h-4 w-4 text-primary' />
                      <span>{venue.city.name}</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <CalendarDays className='h-4 w-4 text-primary' />
                      <span>{venue.courts.length} courts available</span>
                    </div>
                  </div>
                  <Button
                    asChild
                    className='w-full bg-primary hover:bg-primary/90'>
                    <Link href={`/venues/${venue.id}`}>Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className='mb-16'>
          <div className='bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground rounded-2xl p-8 md:p-12'>
            <div className='grid md:grid-cols-2 gap-8 items-center'>
              <div>
                <h3 className='text-3xl font-bold mb-4'>Ready to Play?</h3>
                <p className='text-secondary-foreground/90 mb-6'>
                  Join thousands of players who trust Ayo Booking for their
                  court reservations. Get started today and enjoy hassle-free
                  booking!
                </p>
                <div className='flex gap-4'>
                  <Button
                    asChild
                    size='lg'
                    className='bg-primary hover:bg-primary/90'>
                    <Link href='/register'>Sign Up Free</Link>
                  </Button>
                  <Button
                    asChild
                    size='lg'
                    variant='outline'
                    className='border-white text-white hover:bg-white hover:text-secondary'>
                    <Link href='/venues'>Explore Venues</Link>
                  </Button>
                </div>
              </div>
              <div className='hidden md:flex justify-center'>
                <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20'>
                  <div className='flex items-center gap-4 mb-4'>
                    <Phone className='h-8 w-8' />
                    <div>
                      <div className='text-sm text-secondary-foreground/80'>
                        Call Us Now
                      </div>
                      <div className='font-bold text-lg'>+62 812 3456 7890</div>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <Mail className='h-8 w-8' />
                    <div>
                      <div className='text-sm text-secondary-foreground/80'>
                        Email Support
                      </div>
                      <div className='font-bold text-lg'>
                        support@ayobooking.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main> */}
    </>
  );
}
