import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { generateTimeSlots } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { Court } from "@/types";
import { isBefore } from "date-fns";
import React from "react";
import { toast } from "sonner";

interface BookedSlot {
  itemId: string;
  startTime: string | null;
  endTime: string | null;
}

const CourtItem = ({
  item,
  venueId,
  venueName,
  selectedDate,
  startTime,
  endTime,
  bookedSlots = [],
}: {
  item: Court;
  venueId: string;
  venueName: string;
  selectedDate: string;
  startTime?: string;
  endTime?: string;
  bookedSlots?: BookedSlot[];
}) => {
  const { addItem, items } = useCartStore();

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 items-start mb-4 border-b pb-6'>
      <Carousel className='w-full'>
        <CarouselContent>
          {item.courtImages.length > 0 ? (
            item.courtImages
              .sort((a, b) => a.order - b.order)
              .map((img) => (
                <CarouselItem key={img.id}>
                  <div className='p-1'>
                    <img
                      src={img.imageUrl}
                      alt={item.name}
                      className='w-full rounded-md aspect-video object-cover'
                    />
                  </div>
                </CarouselItem>
              ))
          ) : (
            <CarouselItem>
              <div className='p-1'>
                <img
                  src='/image/venue-6.jpg'
                  alt={item.name}
                  className='w-full rounded-md aspect-video object-cover'
                />
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className='left-1 p-1 cursor-pointer hover:bg-gray-200 rounded-md' />
        <CarouselNext className='right-1 p-1 cursor-pointer hover:bg-gray-200 rounded-md' />
      </Carousel>
      <div className='col-span-2'>
        <h3 className='text-xl font-semibold mb-1'>{item.name}</h3>
        <span className='text-sm font-medium text-muted-foreground'>
          {item.courtType?.name}
          {", "}
          {item.floorType?.name || "Standard Court"}
        </span>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value={`item-${item.id}`}>
            <AccordionTrigger className='cursor-pointer'>
              Jadwal Lapangan
            </AccordionTrigger>
            <AccordionContent className='grid gap-4 grid-cols-2 md:grid-cols-5 py-2'>
              {generateTimeSlots(item, startTime, endTime, selectedDate).map(
                (slot) => {
                  const isInCart = items.some(
                    (cartItem) => cartItem.id === slot.id,
                  );
                  const isBooked = bookedSlots.some(
                    (b) =>
                      b.startTime === slot.startTime &&
                      b.endTime === slot.endTime,
                  );
                  const isExpired = isBefore(
                    new Date(`${selectedDate}T${slot.startTime}`),
                    new Date(),
                  );

                  console.log(
                    "SLOTT",
                    new Date(`${selectedDate}T${slot.startTime}`),
                    isExpired,
                  );

                  const isDisabled = isInCart || isBooked || isExpired;
                  return (
                    <button
                      disabled={isDisabled}
                      onClick={() => {
                        addItem({
                          id: slot.id,
                          itemType: "COURT_BOOKING",
                          itemId: item.id,
                          name: `${item.name} - ${slot.startTime} - ${slot.endTime}`,
                          price: slot.price,
                          quantity: 1,
                          venueId,
                          venueName,
                          date: selectedDate,
                          startTime: slot.startTime,
                          endTime: slot.endTime,
                          duration: slot.duration,
                        });
                        toast("Berhasil menambahkan ke keranjang!");
                      }}
                      key={slot.id}
                      className={`text-center rounded-md border p-2 cursor-pointer  ${
                        isDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : " hover:bg-primary/10"
                      }`}>
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
                      {isBooked && (
                        <p className='text-xs text-red-500 font-medium'>
                          Terpesan
                        </p>
                      )}
                    </button>
                  );
                },
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default CourtItem;
