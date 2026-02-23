"use client";
import { getVenueCourts } from "@/lib/actions/venue";
import { usePosStore } from "@/store/usePosStore";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import moment from "moment";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Icon } from "@iconify/react";
import { Calendar } from "../ui/calendar";
import { addDays, isBefore } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { generateTimeSlots } from "@/lib/utils";
import { toast } from "sonner";

const VenueCourt = () => {
  const { selectedVenue, addToCart, activeCart } = usePosStore();
  const [selectedDate, setSelectedDate] = React.useState(
    moment().format("YYYY-MM-DD"),
  );

  const {
    data: court,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pos.venue.court", selectedVenue?.id],
    queryFn: () => getVenueCourts(selectedVenue?.id ?? ""),
    enabled: !!selectedVenue?.id,
  });

  return (
    <div className=''>
      <h3 className=''>Courts</h3>
      <div className='grid grid-cols-7 mt-6 mb-4 items-center gap-2 md:flex'>
        <Carousel className='w-full col-span-5'>
          <CarouselContent className=' ml-0'>
            {Array.from({ length: 7 }).map((_, index) => (
              <CarouselItem
                key={index}
                className='px-1 basis-1/3 md:basis-1/5 lg:basis-1/7'
                onClick={() =>
                  setSelectedDate(
                    moment().add(index, "days").format("YYYY-MM-DD"),
                  )
                }>
                <div
                  className={`border border-teal-400 rounded-lg cursor-pointer flex flex-col items-center justify-center py-1 px-4 ${
                    selectedDate ===
                    moment().add(index, "days").format("YYYY-MM-DD")
                      ? "bg-teal-400 text-white"
                      : " bg-white text-teal-950"
                  }`}>
                  <h6
                    className={`text-xs font-light text-center ${
                      selectedDate ===
                      moment().add(index, "days").format("YYYY-MM-DD")
                        ? "text-white"
                        : "text-muted-foreground"
                    } text-center`}>
                    {moment().add(index, "days").format("dddd")}
                  </h6>
                  <span className='font-semibold text-nowrap text-xs'>
                    {moment().add(index, "days").format("DD MMM")}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className='flex md:ajustify-end items-center gap-2 col-span-2'>
          <Popover>
            <PopoverTrigger asChild>
              <button className='border border-slate-400 text-slate-500 bg-white p-2 rounded-md font-semibold cursor-pointer'>
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
                selected={new Date(selectedDate)}
                onSelect={(date) =>
                  setSelectedDate(moment(date).format("YYYY-MM-DD"))
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className='grid gap-4 mt-4'>
        {isLoading
          ? [1, 2, 3, 4].map((court) => (
              <div
                key={court}
                className='border p-4 rounded-lg animate-pulse h-20 bg-muted'
              />
            ))
          : court?.data && (
              <Accordion
                type='single'
                collapsible
                className='w-full'
                defaultValue='item-0'>
                {court.data.courts.map((item, index) => (
                  <AccordionItem
                    value={`item-${index}`}
                    className='w-full border border-teal-200 rounded-lg bg-white shadow-sm mb-4'
                    key={item.id}>
                    <AccordionTrigger className='cursor-pointer p-4'>
                      {item.name}
                    </AccordionTrigger>
                    <AccordionContent className='grid gap-4 grid-cols-2 md:grid-cols-5 py-6 px-4'>
                      {generateTimeSlots(
                        item,
                        court.data.openingTime,
                        court.data.closingTime,
                        selectedDate,
                      ).map((slot) => {
                        const isInCart = activeCart.some(
                          (cartItem) => cartItem.id === slot.id,
                        );
                        // const isBooked = bookedSlots.some(
                        //   (b) =>
                        //     b.startTime === slot.startTime &&
                        //     b.endTime === slot.endTime,
                        // );
                        const isExpired = isBefore(
                          new Date(`${selectedDate}T${slot.startTime}`),
                          new Date(),
                        );

                        const isDisabled = isExpired || isInCart;
                        // const isDisabled = isInCart || isBooked || isExpired;
                        return (
                          <button
                            disabled={isDisabled}
                            onClick={() => {
                              addToCart({
                                id: slot.id,
                                itemType: "COURT_BOOKING",
                                itemId: item.id,
                                name: `${item.name}`,
                                price: slot.price,
                                quantity: 1,
                                venueId: selectedVenue?.id ?? "",
                                venueName: selectedVenue?.name ?? "",
                                date: selectedDate,
                                startTime: slot.startTime,
                                endTime: slot.endTime,
                                duration: slot.duration,
                              });
                              toast("Berhasil menambahkan ke keranjang!");
                            }}
                            key={slot.id}
                            className={`text-center rounded-md border border-teal-400 p-2 relative ${
                              isDisabled
                                ? "opacity-50 cursor-not-allowed "
                                : " hover:bg-teal-400 cursor-pointer"
                            }`}>
                            {isInCart && (
                              <span className='bg-red-400 py-0.5 px-2 rounded-md text-white absolute -top-2 -left-2 text-xs font-semibold'>
                                In Cart
                              </span>
                            )}
                            <p className='text-xs text-muted-foreground font-semibold'>
                              {slot.duration} Menit
                            </p>
                            <h3 className='text-sm font-semibold mb-1'>
                              {slot.startTime} - {slot.endTime}
                            </h3>
                            <span>
                              Rp.{" "}
                              <span className='font-bold'>
                                {slot.price.toLocaleString("id-ID")}
                              </span>
                            </span>
                            {/* {isBooked && (
                              <p className='text-xs text-red-500 font-medium'>
                                Terpesan
                              </p>
                            )} */}
                          </button>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
      </div>
    </div>
  );
};

export default VenueCourt;
