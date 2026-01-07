import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Dot, Home, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";
import VenueReview from "@/components/venue-review";
import { notFound } from "next/navigation";
import VenueCourtSection from "./venue-court-section";
import ContentEditor from "@/components/tiptap-templates/simple/editor-content";
import { getVenueById } from "@/lib/data/users/venue";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const result = await getVenueById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const venue = result.data;

  const minPrice =
    venue.courts.length > 0
      ? Math.min(...venue.courts.map((c) => c.pricePerHour))
      : 0;

  const courtTypes = [
    ...new Set(venue.courts.map((c) => c.courtType?.name).filter(Boolean)),
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`size-5 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/venues'>Venues</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className='font-semibold'>
                {venue.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* <div className='grid grid-cols-2 md:grid-cols-4 gap-2 relative'>
        {venue.venueImages.length > 0 ? (
          venue.venueImages
            .slice(0, 5)
            .map((image, index) => (
              <img
                key={image.id}
                src={image.imageUrl}
                alt={`${venue.name} - ${index + 1}`}
                className={`rounded-lg object-cover ${
                  index === 0 ? "col-span-2 md:row-span-2" : "h-full"
                }`}
              />
            ))
        ) : (
          <>
            <img
              src='/image/venue-1.jpg'
              alt='Venue Banner'
              className='rounded-lg first:col-span-2 md:first:row-span-2 object-cover not-first:h-full'
            />
            <img
              src='/image/venue-2.jpeg'
              alt='Venue Banner'
              className='rounded-lg object-cover h-full'
            />
            <img
              src='/image/venue-3.jpeg'
              alt='Venue Banner'
              className='rounded-lg object-cover h-full'
            />
            <img
              src='/image/venue-4.jpg'
              alt='Venue Banner'
              className='rounded-lg object-cover h-full'
            />
            <img
              src='/image/venue-5.jpg'
              alt='Venue Banner'
              className='rounded-lg object-cover h-full'
            />
          </>
        )}
        {venue.venueImages.length > 5 && (
          <button
            type='button'
            className='absolute right-0 bottom-0 bg-black/60 text-white text-sm px-4 py-2 rounded-md m-4 cursor-pointer capitalize font-semibold'>
            Lihat semua
          </button>
        )}
      </div> */}

      <div className='grid grid-cols-2 md:grid-flow-col md:grid-cols-4 gap-2 relative'>
        {venue.venueImages.length > 0 &&
          venue.venueImages
            .slice(0, 5)
            .map((image, index) => (
              <img
                key={index}
                src={image.imageUrl}
                alt='Venue Banner'
                className='rounded-lg first:col-span-2 md:first:row-span-2 object-cover not-first:aspect-3/2 h-full'
              />
            ))}

        {venue.venueImages.length > 5 && (
          <button
            type='button'
            className='absolute right-0 bottom-0 bg-black/60
        text-white text-sm px-4 py-2 rounded-md m-4 cursor-pointer capitalize font-semibold'>
            Lihat semua
          </button>
        )}
      </div>
      <div className='grid md:flex justify-between py-4'>
        <div className='flex-1'>
          <h2 className='text-4xl font-semibold'>{venue.name}</h2>
          <div className='flex mt-3'>
            <div className='flex items-center space-x-1'>
              {renderStars(venue.rating)}
              <span className='text-sm font-semibold text-muted-foreground ml-2'>
                ({venue.rating.toFixed(1)})
              </span>
            </div>
          </div>
          {courtTypes.length > 0 && (
            <div className='flex items-center mt-2 mb-4 [&>span:not(:last-child)]:after:content-[""] [&>span:not(:last-child)]:after:inline-block [&>span:not(:last-child)]:after:mx-2 [&>span:not(:last-child)]:after:h-2 [&>span:not(:last-child)]:after:border-l'>
              {courtTypes.map((type) => (
                <span key={type} className='font-medium text-xs'>
                  {type}
                </span>
              ))}
            </div>
          )}
          <div className='text-sm text-muted-foreground flex items-center'>
            <MapPin className='size-4 mr-1' />
            {venue.city.name}, {venue.province.name}
          </div>
        </div>
        <div className='flex flex-col md:items-end mt-4 md:mt-0'>
          <h2 className='text-muted-foreground font-light text-sm'>
            Mulai dari
          </h2>
          <span className='text-2xl font-bold text-primary leading-5'>
            Rp. {minPrice.toLocaleString("id-ID")}
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
          {venue.description && (
            <div className='border-b border-gray-200 pt-2 pb-6 mb-4'>
              <h3 className='text-2xl font-semibold mb-4'>Deskripsi</h3>
              <p className='text-sm text-muted-foreground'>
                {venue.description}
              </p>
            </div>
          )}

          {venue.rules && (
            <div className='border-b border-gray-200 pb-6 mb-4'>
              <h3 className='text-2xl font-semibold mb-4'>Aturan Venue</h3>
              <ContentEditor content={venue.rules} />
            </div>
          )}

          {venue.venueFacilities.length > 0 && (
            <div className='border-b border-gray-200 pb-6 mb-4'>
              <h3 className='text-2xl font-semibold mb-4'>Fasilitas Venue</h3>
              <div className='grid grid-cols-2 md:grid-cols-4 grid-flow-row gap-4'>
                {venue.venueFacilities.map((vf) => (
                  <div key={vf.id} className='flex items-center space-x-2'>
                    <Icon
                      icon={
                        vf.facility.icon ||
                        "material-symbols:add-row-above-rounded"
                      }
                      className='size-5 text-primary'
                    />
                    <span className='text-sm font-medium text-muted-foreground'>
                      {vf.facility.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
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
          <span className='text-sm text-muted-foreground'>{venue.address}</span>
        </div>
        <div className='md:col-span-3'>
          <VenueReview
            reviews={venue.venueReviews}
            totalReviews={venue.totalReviews}
            rating={venue.rating}
          />
        </div>
      </section>

      <VenueCourtSection
        courts={venue.courts}
        venueId={venue.id}
        venueName={venue.name}
        startTime={venue.openingTime}
        endTime={venue.closingTime}
      />
    </main>
  );
};

export default Page;
