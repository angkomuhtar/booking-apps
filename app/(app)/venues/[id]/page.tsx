import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  AirVent,
  Armchair,
  Car,
  Coffee,
  Dot,
  Heart,
  Home,
  Lightbulb,
  Lock,
  MapPin,
  MonitorPlay,
  Moon,
  Shirt,
  ShoppingBag,
  ShowerHead,
  Soup,
  Star,
  Users,
  UtensilsCrossed,
  Video,
  Volume2,
  Warehouse,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";
import VenueReview from "@/components/venue-review";
import moment from "moment";
import "moment/locale/id"; // Tambahkan ini
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const page = () => {
  const images = [
    "image/venue-1.jpg",
    "/image/venue-2.jpeg",
    "/image/venue-3.jpeg",
    "/image/venue-4.jpg",
    "/image/venue-5.jpg",
    "/image/venue-6.jpg",
    "/image/venue-7.jpg",
    "/image/venue-8.jpg",
  ];

  const facilities = [
    { value: "parking", label: "Parkir", icon: "mdi:car" },
    { value: "shower", label: "Shower", icon: "mingcute:shower-line" },
    { value: "locker", label: "Locker", icon: "ph:lockers" },
    { value: "cafe", label: "Cafe", icon: "carbon:cafe" },
    { value: "wifi", label: "WiFi", icon: "mdi:wifi" },
    { value: "canteen", label: "Kantin", icon: "famicons:restaurant-outline" },
    { value: "ac", label: "AC", icon: "tabler:air-conditioning" },
    {
      value: "waiting_room",
      label: "Ruang Tunggu",
      icon: "material-symbols:chair-outline",
    },
    {
      value: "prayer_room",
      label: "Ruang Sholat",
      icon: "material-symbols:mosque-outline-rounded",
    },
    { value: "first_aid", label: "First Aid", icon: "jam:first-aid" },
    { value: "cctv", label: "CCTV", icon: "basil:video-outline" },
    {
      value: "spectator_area",
      label: "Area Penonton",
      icon: "fluent:people-audience-20-regular",
    },
    {
      value: "changing_room",
      label: "Ruang Ganti",
      icon: "solar:t-shirt-linear",
    },
    {
      value: "vending_machine",
      label: "Vending Machine",
      icon: "game-icons:vending-machine",
    },
    { value: "lighting", label: "Lighting", icon: "mage:light-bulb" },
    {
      value: "sound_system",
      label: "Sound System",
      icon: "fluent:speaker-2-24-regular",
    },
    {
      value: "score_board",
      label: "Score Board",
      icon: "material-symbols:scoreboard-outline-rounded",
    },
  ];

  moment.locale("id");

  return (
    <main className='min-h-screen container py-6'>
      <div className='mb-8'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/'>
                  <Home className='size-3.5' />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Dot />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/venues'>Venues</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className='font-semibold'>
                Nama Venue
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='grid grid-cols-4 gap-2 relative'>
        <div className='relative col-span-2 row-span-2'>
          <Image
            src={"/image/venue-1.jpg"}
            alt='Venue Banner'
            fill
            unoptimized
            className='rounded-lg object-cover'
          />
        </div>
        <img
          src='/image/venue-2.jpeg'
          alt='Venue Banner'
          className='rounded-lg'
        />
        <img
          src='/image/venue-3.jpeg'
          alt='Venue Banner'
          className='rounded-lg'
        />
        <img
          src='/image/venue-4.jpg'
          alt='Venue Banner'
          className='rounded-lg'
        />
        <img
          src='/image/venue-5.jpg'
          alt='Venue Banner'
          className='rounded-lg'
        />
        <button
          type='button'
          className='absolute right-0 bottom-0 bg-black/60
        text-white text-sm px-4 py-2 rounded-md m-4 cursor-pointer capitalize font-semibold'>
          Lihat semua
        </button>
      </div>

      <div className='grid md:flex justify-between py-4'>
        <div className='flex-1'>
          <h2 className='text-4xl font-semibold'>
            Stadion Gelora Kadrie Oening Sempaja
          </h2>
          <div className='flex mt-3'>
            <div className='flex items-center space-x-1'>
              <Star className='size-5 fill-yellow-400 text-yellow-400' />
              <Star className='size-5 fill-yellow-400 text-yellow-400' />
              <Star className='size-5 fill-yellow-400 text-yellow-400' />
              <Star className='size-5 fill-yellow-400 text-yellow-400' />
              <Star className='size-5 fill-gray-200 text-gray-200' />
              <span className='text-sm font-semibold text-muted-foreground ml-2'>
                (4.0)
              </span>
            </div>
          </div>
          <div className='flex items-center mt-2 mb-4 [&>span:not(:last-child)]:after:content-[""] [&>span:not(:last-child)]:after:inline-block [&>span:not(:last-child)]:after:mx-2 [&>span:not(:last-child)]:after:h-2 [&>span:not(:last-child)]:after:border-l'>
            <span className='font-medium text-xs '>Padel</span>
            <span className='font-medium text-xs '>Badminton</span>
            <span className='font-medium text-xs '>Mini Soccer</span>
          </div>
          <div className='text-sm text-muted-foreground flex items-center'>
            <MapPin className='size-4 mr-1' />
            Sempaja Sel, Samarinda
          </div>
        </div>
        <div className='flex flex-col md:items-end mt-4 md:mt-0'>
          <h2 className='text-muted-foreground font-light text-sm'>
            Mulai dari
          </h2>
          <span className='text-2xl font-bold text-primary leading-5'>
            Rp. 80.000
          </span>
          <h2 className='text-muted-foreground font-light text-sm'>per sesi</h2>
          <button className='bg-primary text-white px-4 py-2 rounded-md mt-4 font-semibold cursor-pointer'>
            Pesan Sekarang
          </button>
        </div>
      </div>
      <Separator className='my-3' orientation='horizontal' />

      <section className='grid grid-cols-1 lg:grid-cols-3 gap-4 items-start'>
        <div className='lg:col-span-2 grid gap-4'>
          <div className='border-b border-gray-200 pt-2 pb-6 mb-4'>
            <h3 className='text-2xl font-semibold mb-4'>Deskripsi</h3>
            <p className='text-sm text-muted-foreground'>
              Stadion Gelora Kadrie Oening Sempaja adalah venue olahraga yang
              terletak di Samarinda. Dengan fasilitas yang lengkap, stadion ini
              menjadi pilihan utama untuk berbagai acara olahraga.
            </p>
          </div>

          <div className='border-b border-gray-200 pb-6 mb-4'>
            <h3 className='text-2xl font-semibold mb-4'>Aturan Venue</h3>
            <p className='text-sm text-muted-foreground'>
              Stadion Gelora Kadrie Oening Sempaja adalah venue olahraga yang
              terletak di Samarinda. Dengan fasilitas yang lengkap, stadion ini
              menjadi pilihan utama untuk berbagai acara olahraga.
            </p>
          </div>

          <div className='border-b border-gray-200 pb-6 mb-4'>
            <h3 className='text-2xl font-semibold mb-4'>Fasilitas Venue</h3>
            <div className='grid grid-cols-2 md:grid-cols-4 grid-flow-row gap-4'>
              {facilities.map((facility) => (
                <div
                  key={facility.value}
                  className='flex items-center space-x-2'>
                  <Icon icon={facility.icon} className='size-5 text-primary' />
                  <span className='text-sm font-medium text-muted-foreground'>
                    {facility.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=''>
          <h3 className='text-2xl font-semibold mb-4'>Lokasi Venue</h3>
          <iframe
            src='https://maps.google.com/maps?q=-6.200000,106.816666&output=embed'
            className='w-full rounded-lg border-0 aspect-video bg-gray-600'
            loading='lazy'
          />
          <div className='flex mt-4 items-start'>
            <Icon
              icon='mdi:map-marker-radius'
              className='size-[22px] text-red-600 shrink-0 mr-2'
            />
            <h3 className='font-semibold text-lg'>Alamat Lengkap</h3>
          </div>
          <span className='text-sm text-muted-foreground'>
            Jl. Stadion Palaran No.1, Sempaja Sel., Kec. Samarinda Utara, Kota
            Samarinda, Kalimantan Timur 75243
          </span>
        </div>
        <div className='md:col-span-3'>
          <VenueReview />
        </div>
      </section>

      <section className='mt-6 py-4'>
        <div className='flex items-center'>
          <div className='rounded-full bg-primary p-1.5 mr-3'>
            <Icon
              className='size-5 text-accent-foreground'
              icon='f7:sportscourt'
            />
          </div>
          <h3 className='text-3xl font-semibold flex-1'>Pilihan Lapangan</h3>
        </div>
        <div className='grid grid-cols-7 gap-4 mt-6 mb-4 items-stretch'>
          <div className='col-span-5 grid grid-cols-7 gap-2'>
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className='border border-primary rounded-lg overflow-hidden cursor-pointer flex flex-col items-center justify-center py-1 bg-white'>
                <h6 className='text-xs font-light text-muted-foreground text-center'>
                  {moment().add(index, "days").format("dddd")}
                </h6>
                <p className='font-semibold'>
                  {moment().add(index, "days").format("DD MMM")}
                </p>
              </div>
            ))}
          </div>
          <div className='col-span-2 flex justify-center items-center gap-4'>
            <Popover>
              <PopoverTrigger asChild>
                <button className='border border-primary text-primary bg-white p-2 rounded-md font-semibold cursor-pointer'>
                  <Icon icon='ion:calendar-outline' className='size-5' />
                </button>
              </PopoverTrigger>
              <PopoverContent
                side='bottom'
                align='end'
                sideOffset={10}
                className='p-0 '>
                <Calendar
                  mode='single'
                  captionLayout='dropdown'
                  className='w-full gap-2'
                  buttonVariant='outline'
                  disabled={[
                    { before: new Date(), after: addDays(new Date(), 7) },
                  ]}
                />
              </PopoverContent>
            </Popover>
            <button className='bg-white border border-primary text-primary px-4 py-2 rounded-md w-full flex-1 font-semibold cursor-pointer'>
              <Icon
                icon='mdi:filter-outline'
                className='size-5 inline-block mr-2'
              />
              <span>Filter & Sort</span>
            </button>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-4 items-start mb-4'>
          <Carousel className='w-full'>
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className='p-1'>
                    <img
                      src='/image/venue-6.jpg'
                      alt=''
                      className='w-full rounded-md aspect-video object-cover'
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='left-1 p-1 cursor-pointer hover:bg-gray-200 rounded-md' />
            <CarouselNext className='right-1 p-1 cursor-pointer hover:bg-gray-200 rounded-md' />
          </Carousel>
          <div className='col-span-2'>
            <h3 className='text-xl font-semibold mb-1'>Lapangan A</h3>
            <span className='text-sm font-medium text-muted-foreground'>
              Indoor Hard Court
            </span>
            <div className='grid gap-2 mt-2'>
              <div className='flex items-center space-x-2'>
                <Icon icon='cil:tennis' className='size-5 text-primary' />
                <span className='text-sm font-medium text-muted-foreground'>
                  Tennis
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <Icon icon='cil:tennis' className='size-5 text-primary' />
                <span className='text-sm font-medium text-muted-foreground'>
                  Indoor
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <Icon icon='cil:tennis' className='size-5 text-primary' />
                <span className='text-sm font-medium text-muted-foreground'>
                  Hard Court
                </span>
              </div>
            </div>
            <Accordion
              type='single'
              collapsible
              className='w-full'
              defaultValue='item-1'>
              <AccordionItem value='item-1'>
                <AccordionTrigger className='cursor-pointer'>
                  Jadwal Lapangan
                </AccordionTrigger>
                <AccordionContent className='grid gap-4 grid-cols-5 py-2'>
                  {Array.from({ length: 20 }).map((_, index) => (
                    <div
                      key={index}
                      className='text-center rounded-md border p-2'>
                      <p className='text-xs text-muted-foreground font-semibold'>
                        60 Menit
                      </p>
                      <h3 className='text-sm font-semibold mb-1'>
                        06:00 - 07:00
                      </h3>
                      <span>
                        Rp. <span className='font-bold'>280.000</span>
                      </span>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
