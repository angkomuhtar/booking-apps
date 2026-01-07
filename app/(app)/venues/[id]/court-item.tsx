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
import { useCartStore } from "@/store/useCartStore";
import React from "react";
import { toast } from "sonner";

interface Court {
  id: string;
  name: string;
  type: string | null;
  floor: string | null;
  sessionDuration: number;
  pricePerHour: number;
  isActive: boolean;
  courtType: { id: string; name: string } | null;
  floorType: { id: string; name: string } | null;
  pricing: {
    id: string;
    dayType: string;
    startTime: string;
    endTime: string;
    price: number;
    discount: number;
  }[];
}
const CourtItem = ({
  item,
  venueId,
  venueName,
  selectedDate,
  startTime,
  endTime,
}: {
  item: Court;
  venueId: string;
  venueName: string;
  selectedDate: string;
  startTime?: string;
  endTime?: string;
}) => {
  const { addItem, items } = useCartStore();
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0");
    const mins = (minutes % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}`;
  };

  const generateTimeSlots = (court: Court) => {
    const slots = [];
    const startHour = timeToMinutes(startTime || "06:00");
    const endHour = timeToMinutes(endTime || "23:00");
    const duration = court.sessionDuration;

    for (let hour = startHour; hour < endHour; hour += duration) {
      const slotStartTime = minutesToTime(hour); // e.g., "06:00"
      const slotEndTime = minutesToTime(hour + duration); // e.g., "07:00"
      if (timeToMinutes(slotEndTime) > endHour) break;

      slots.push({
        id: `${court.id}-${selectedDate}-${slotStartTime}-${slotEndTime}`,
        startTime: slotStartTime,
        endTime: slotEndTime,
        duration,
        price: court.pricePerHour,
      });
    }
    return slots;
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 items-start mb-4 border-b pb-6'>
      <Carousel className='w-full'>
        <CarouselContent>
          <CarouselItem>
            <div className='p-1'>
              <img
                src='/image/venue-6.jpg'
                alt={item.name}
                className='w-full rounded-md aspect-video object-cover'
              />
            </div>
          </CarouselItem>
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
        <Accordion
          type='single'
          collapsible
          className='w-full'
          defaultValue={`item-${item.id}`}>
          <AccordionItem value={`item-${item.id}`}>
            <AccordionTrigger className='cursor-pointer'>
              Jadwal Lapangan
            </AccordionTrigger>
            <AccordionContent className='grid gap-4 grid-cols-2 md:grid-cols-5 py-2'>
              {generateTimeSlots(item).map((slot) => {
                const isInCart = items.some(
                  (cartItem) => cartItem.id === slot.id
                );
                return (
                  <button
                    disabled={isInCart}
                    onClick={(e) => {
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
                      isInCart
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
                  </button>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default CourtItem;
