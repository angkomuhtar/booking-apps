"use client";

import React from "react";
import { Icon } from "@iconify/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import moment from "moment";

export type CourtReview = {
  id: string;
  userId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
  venueReviewImages: {
    id: string;
    imageUrl: string;
  }[];
  user: {
    id: string;
    name: string;
  };
};

const VenueReview = ({
  reviews,
  totalReviews,
  rating,
}: {
  reviews: CourtReview[];
  totalReviews: number;
  rating: number;
}) => {
  const Card = ({ data }: { data: CourtReview }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className='rounded-md flex-[0_0_calc(33.333%-0.666rem)] bg-white shadow-sm border-gray-200 h-32 cursor-pointer'>
            <div className='flex h-full'>
              {data.venueReviewImages.length > 0 && (
                <div className='w-1/4'>
                  <img
                    src={data.venueReviewImages[0].imageUrl}
                    className='object-cover rounded-l-md w-full h-full'
                    alt=''
                  />
                </div>
              )}
              <div className='flex-1'>
                <div className='p-2'>
                  <div className='flex items-end justify-between'>
                    <h4 className='text-base font-semibold'>
                      {data.rating.toFixed(1)}{" "}
                      <span className='font-normal text-xs text-muted-foreground'>
                        / 5.0
                      </span>
                    </h4>
                    <h4 className='text-xs font-normal text-muted-foreground'>
                      {moment(data.createdAt).format("DD MMMM YYYY")}
                    </h4>
                  </div>
                  <h3 className='text-xs font-medium'>{data.user.name}</h3>
                  <p className='text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3'>
                    {data.comment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className='md:max-w-3xl'>
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className='grid md:flex'>
            {data.venueReviewImages.length > 0 && (
              <Carousel className='w-full md:w-2/3'>
                <CarouselContent>
                  {data.venueReviewImages.map((image) => (
                    <CarouselItem key={image.id} className='bg-black'>
                      <img
                        src={image.imageUrl}
                        className='object-cover h-full'
                        alt='Venue Image'
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext className='right-0' />
                <CarouselPrevious className='left-0' />
              </Carousel>
            )}
            <div className='flex-1 md:ml-4 mt-4 md:mt-0'>
              <div className='mb-2 flex items-end justify-between'>
                <h4 className='text-lg font-semibold'>
                  {data.rating.toFixed(1)}{" "}
                  <span className='font-normal text-sm text-muted-foreground'>
                    / 5.0
                  </span>
                </h4>
                <h4 className='text-sm font-normal text-muted-foreground'>
                  {moment(data.createdAt).format("DD MMMM YYYY")}
                </h4>
              </div>
              <h3 className='text-md font-medium mb-2'>{data.user.name}</h3>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                {data.comment}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      <div className='flex justify-between items-end py-2 mb-4'>
        <h3 className='text-2xl font-semibold'>Review</h3>
        <div className='space-x-2'>
          {reviews.length > 0 && (
            <button className='text-blue-500 font-semibold text-sm cursor-pointer hover:underline group'>
              Lihat semua
              <Icon
                icon='ci:chevron-right-duo'
                className='inline-block ml-1 size-5 group-hover:translate-x-1 transition-transform duration-150'
              />
            </button>
          )}
        </div>
      </div>
      {reviews.length === 0 ? (
        <div className='text-center py-10 text-muted-foreground'>
          Belum ada review untuk venue ini.
        </div>
      ) : (
        <Carousel className='w-full'>
          <div className='flex justify-between items-end py-2'>
            <div className='flex items-end'>
              <h3 className='text-5xl font-bold'>
                {rating.toFixed(1)}
                <span className='text-sm font-semibold text-muted-foreground'>
                  / 5.0
                </span>
                <span className='text-sm font-normal text-muted-foreground ml-2'>
                  dari {totalReviews} Reviews
                </span>
              </h3>
            </div>
            <div className='space-x-2 flex-1 flex justify-end relative'>
              <CarouselPrevious className='rounded-md relative z-10 left-0 hover:bg-gray-200 cursor-pointer' />
              <CarouselNext className='rounded-md relative z-10 right-0 hover:bg-gray-200 cursor-pointer' />
            </div>
          </div>
          <CarouselContent className='p-0.5'>
            {totalReviews > 0 &&
              reviews.map((data, index) => (
                <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                  <Card key={index} data={data} />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      )}
    </>
  );
};

export default VenueReview;
