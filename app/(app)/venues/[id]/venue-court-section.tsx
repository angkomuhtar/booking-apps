"use client";

import { Icon } from "@iconify/react";
import moment from "moment";
import "moment/locale/id";
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
} from "@/components/ui/carousel";
import { useCartStore } from "@/store/useCartStore";
import { useState, useEffect, useCallback } from "react";
import CourtItem from "./court-item";
import { Court } from "@/types";

interface BookedSlot {
  itemId: string;
  startTime: string | null;
  endTime: string | null;
}

interface VenueCourtSectionProps {
  courts: Court[];
  venueId: string;
  venueName: string;
  startTime?: string;
  endTime?: string;
}

export default function VenueCourtSection({
  courts,
  venueId,
  venueName,
  startTime,
  endTime,
}: VenueCourtSectionProps) {
  useCartStore();

  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD"),
  );
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);

  const fetchBookedSlots = useCallback(async () => {
    const courtIds = courts.map((c) => c.id);
    const res = await fetch(
      `/api/venues/booked-slots?courtIds=${courtIds.join(",")}&date=${selectedDate}`,
    );
    if (res.ok) {
      const data = await res.json();
      setBookedSlots(data);
    }
  }, [courts, selectedDate]);

  useEffect(() => {
    fetchBookedSlots();
  }, [fetchBookedSlots]);

  if (courts.length === 0) {
    return null;
  }

  return (
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
                  className={`border border-primary rounded-lg cursor-pointer flex flex-col items-center justify-center py-1 px-4 ${
                    selectedDate ===
                    moment().add(index, "days").format("YYYY-MM-DD")
                      ? "bg-primary text-white"
                      : " bg-white"
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
                  <p className='font-semibold text-nowrap text-xs'>
                    {moment().add(index, "days").format("DD MMM")}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className='flex md:ajustify-end items-center gap-2 col-span-2'>
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
          <button className='bg-white border border-primary text-primary p-2 rounded-md font-semibold cursor-pointer flex items-center'>
            <Icon
              icon='mdi:filter-outline'
              className='size-5 inline-block lg:mr-2'
            />
            <span className='hidden lg:inline text-nowrap'>Filter & Sort</span>
          </button>
        </div>
      </div>

      {courts
        .filter((c) => c.isActive)
        .map((court, index) => (
          <CourtItem
            key={index}
            item={court}
            venueId={venueId}
            venueName={venueName}
            selectedDate={selectedDate}
            startTime={startTime}
            endTime={endTime}
            bookedSlots={bookedSlots.filter((s) => s.itemId === court.id)}
          />
        ))}
    </section>
  );
}
