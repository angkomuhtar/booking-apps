import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Trophy,
  Clock,
  Search,
  ChevronRight,
  Phone,
  Mail,
  Star,
} from "lucide-react";

export default async function Home() {
  const session = await auth();
  const venues = await prisma.venue.findMany({
    include: {
      courts: true,
    },
    take: 6,
  });

  return (
    <div className='min-h-screen bg-background font-sans'>
      {/* <div className='bg-secondary text-secondary-foreground py-2 text-sm'>
        <div className='container mx-auto px-4 flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            {!session && (
              <>
                <Link
                  href='/login'
                  className='hover:text-primary transition-colors'>
                  Sign In
                </Link>
                <span>/</span>
                <Link
                  href='/register'
                  className='hover:text-primary transition-colors'>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div> */}

      <header className='bg-white border-b sticky top-0 z-50 shadow-sm'>
        <div className='container px-4'>
          <div className='flex justify-between items-center py-4'>
            <Link href='/' className='flex items-center gap-2 group'>
              <div className='bg-primary p-2.5 rounded-lg group-hover:scale-105 transition-transform'>
                <Trophy className='h-6 w-6 text-primary-foreground' />
              </div>
              <div>
                <h1 className='text-2xl font-bold text-secondary'>
                  Ayo Booking
                </h1>
                <p className='text-xs text-muted-foreground'>
                  Court Reservation System
                </p>
              </div>
            </Link>

            <div className='hidden md:flex flex-1 max-w-xl mx-8'>
              <div className='relative w-full'>
                <input
                  type='text'
                  placeholder='Search venues, locations...'
                  className='w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20'
                />
                <Search className='absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground' />
              </div>
            </div>

            <nav className='flex gap-3 items-center'>
              {session ? (
                <>
                  <div className='text-sm font-medium hidden sm:block'>
                    Welcome,{" "}
                    <span className='text-primary'>{session.user.name}</span>
                  </div>
                  {session.user.role === "ADMIN" && (
                    <Button asChild variant='outline' size='sm'>
                      <Link href='/admin'>Admin Panel</Link>
                    </Button>
                  )}
                  <Button asChild variant='outline' size='sm'>
                    <Link href='/bookings'>My Bookings</Link>
                  </Button>
                  <form action='/api/auth/signout' method='POST'>
                    <Button type='submit' variant='ghost' size='sm'>
                      Logout
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant='ghost'
                    size='sm'
                    className='hidden sm:inline-flex'>
                    <Link href='/login'>Login</Link>
                  </Button>
                  <Button
                    asChild
                    size='sm'
                    className='bg-primary hover:bg-primary/90'>
                    <Link href='/register'>Get Started</Link>
                  </Button>
                </>
              )}
            </nav>
          </div>

          <div className='border-t py-3'>
            <nav className='flex items-center gap-6 text-sm font-medium'>
              <Link
                href='/'
                className='text-primary hover:text-primary/80 transition-colors'>
                Home
              </Link>
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
          </div>
        </div>
      </header>

      <section className='bg-gradient-to-r from-primary to-primary/80 text-primary-foreground'>
        <div className='container mx-auto px-4 py-16 md:py-24'>
          <div className='grid md:grid-cols-2 gap-8 items-center'>
            <div>
              <Badge className='bg-white/20 text-white hover:bg-white/30 mb-4'>
                Special Offer - 20% OFF
              </Badge>
              <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                Book Your Court Today
              </h2>
              <p className='text-lg text-primary-foreground/90 mb-6'>
                Premium badminton & padel courts available for booking. Easy
                online reservation, instant confirmation.
              </p>
              <div className='flex gap-4'>
                <Button
                  asChild
                  size='lg'
                  variant='secondary'
                  className='shadow-lg'>
                  <Link href='/venues' className='gap-2'>
                    Browse Venues
                    <ChevronRight className='h-4 w-4' />
                  </Link>
                </Button>
                <Button
                  asChild
                  size='lg'
                  variant='outline'
                  className='bg-transparent border-white text-white hover:bg-white hover:text-primary'>
                  <Link href='#how-it-works'>Learn More</Link>
                </Button>
              </div>
            </div>
            <div className='hidden md:block'>
              <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20'>
                <div className='space-y-4'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-full bg-white/20 flex items-center justify-center'>
                      <Trophy className='h-6 w-6' />
                    </div>
                    <div>
                      <h4 className='font-semibold'>Premium Courts</h4>
                      <p className='text-sm text-primary-foreground/80'>
                        Top-quality facilities
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-full bg-white/20 flex items-center justify-center'>
                      <Clock className='h-6 w-6' />
                    </div>
                    <div>
                      <h4 className='font-semibold'>Instant Booking</h4>
                      <p className='text-sm text-primary-foreground/80'>
                        Reserve in seconds
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-full bg-white/20 flex items-center justify-center'>
                      <Star className='h-6 w-6' />
                    </div>
                    <div>
                      <h4 className='font-semibold'>Best Prices</h4>
                      <p className='text-sm text-primary-foreground/80'>
                        Competitive rates guaranteed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-8 bg-muted/50'>
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
      </section>

      <main className='container mx-auto px-4 py-12'>
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
                      <span>{venue.city}</span>
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
      </main>

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
                Indonesia&rsquo;s premier court booking platform for badminton
                and padel enthusiasts.
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
                  <Link
                    href='#'
                    className='hover:text-primary transition-colors'>
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='hover:text-primary transition-colors'>
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='font-semibold mb-4'>Support</h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link
                    href='#'
                    className='hover:text-primary transition-colors'>
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='hover:text-primary transition-colors'>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='hover:text-primary transition-colors'>
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className='hover:text-primary transition-colors'>
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
    </div>
  );
}
