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

const VenueReview = () => {
  const Card = ({ image }: { image?: string | null }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className='rounded-md flex-[0_0_calc(33.333%-0.666rem)] bg-white shadow-sm border-gray-200 h-32 cursor-pointer'>
            <div className='flex h-full'>
              {image && (
                <div className='w-1/4'>
                  <img
                    src='/image/venue-6.jpg'
                    className='object-cover rounded-l-md w-full h-full'
                    alt=''
                  />
                </div>
              )}
              <div className='flex-1'>
                <div className='p-2'>
                  <div className='flex items-end justify-between'>
                    <h4 className='text-base font-semibold'>
                      5.0
                      <span className='font-normal text-xs text-muted-foreground'>
                        /5.0
                      </span>
                    </h4>
                    <h4 className='text-xs font-normal text-muted-foreground'>
                      19 Juni 2023
                    </h4>
                  </div>
                  <h3 className='text-xs font-medium'>
                    Christopher Djemba Djemba
                  </h3>
                  <p className='text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3'>
                    Great venue with excellent facilities. The staff were
                    friendly and the courts were well-maintained. Highly
                    recommend for a fun day out!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className='md:max-w-3xl'>
          <DialogHeader>
            <DialogTitle>Review</DialogTitle>
          </DialogHeader>
          <div className='grid md:flex'>
            {image && (
              <Carousel className='w-full md:w-2/3'>
                <CarouselContent>
                  <CarouselItem className='bg-black'>
                    <img
                      src='/image/venue-6.jpg'
                      className='object-contain w-full'
                      alt='Venue Image'
                    />
                  </CarouselItem>
                </CarouselContent>
                <CarouselNext className='right-0' />
                <CarouselPrevious className='left-0' />
              </Carousel>
            )}
            <div className='flex-1 md:ml-4 mt-4 md:mt-0'>
              <div className='mb-2 flex items-end justify-between'>
                <h4 className='text-lg font-semibold'>
                  5.0
                  <span className='font-normal text-sm text-muted-foreground'>
                    /5.0
                  </span>
                </h4>
                <h4 className='text-sm font-normal text-muted-foreground'>
                  19 Juni 2023
                </h4>
              </div>
              <h3 className='text-md font-medium mb-2'>
                Christopher Djemba Djemba
              </h3>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                Great venue with excellent facilities. The staff were friendly
                and the courts were well-maintained. Highly recommend for a fun
                day out!
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
          <button className='text-blue-500 font-semibold text-sm cursor-pointer hover:underline group'>
            Lihat semua
            <Icon
              icon='ci:chevron-right-duo'
              className='inline-block ml-1 size-5 group-hover:translate-x-1 transition-transform duration-150'
            />
          </button>
        </div>
      </div>

      <Carousel className='w-full'>
        <div className='flex justify-between items-end py-2'>
          <div className='flex items-end'>
            <h3 className='text-5xl font-bold'>
              4.7
              <span className='text-sm font-semibold text-muted-foreground'>
                /5.0
              </span>
              <span className='text-sm font-normal text-muted-foreground ml-2'>
                dari 123 Reviews
              </span>
            </h3>
          </div>
          <div className='space-x-2 flex-1 flex justify-end relative'>
            <CarouselPrevious className='rounded-md relative z-10 left-0 hover:bg-gray-200 cursor-pointer' />
            <CarouselNext className='rounded-md relative z-10 right-0 hover:bg-gray-200 cursor-pointer' />
          </div>
        </div>
        <CarouselContent className='p-0.5'>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
              <Card key={index} image={index % 3 == 0 ? "image" : null} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default VenueReview;
