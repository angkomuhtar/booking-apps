"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { usePosStore } from "@/store/usePosStore";

type Venue = {
  id: string;
  name: string;
  address: string;
  city: {
    name: string;
  };
};

const VenueSwitcher = ({ venues }: { venues: Venue[] }) => {
  const { selectedVenue, setSelectedVenue } = usePosStore();

  // useEffect(() => {
  //   if (!selectedVenue && venues.length > 0) {
  //     setSelectedVenue({ id: venues[0].id, name: venues[0].name });
  //   }
  // }, [selectedVenue, venues, setSelectedVenue]);

  const handleSelect = (venue: Venue) => {
    setSelectedVenue({ id: venue.id, name: venue.name });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center gap-2 w-full max-w-56 border rounded-lg px-3 py-2 hover:bg-accent transition-colors'>
        <div className='bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
          <MapPin className='size-4' />
        </div>
        <div className='grid flex-1 text-left text-sm leading-tight'>
          <span className='truncate font-medium'>
            {selectedVenue?.name || "Pilih Venue"}
          </span>
          <span className='truncate text-xs text-muted-foreground'>
            {selectedVenue ? "Venue aktif" : "Belum dipilih"}
          </span>
        </div>
        <ChevronsUpDown className='ml-auto size-4 text-muted-foreground' />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
        align='start'
        sideOffset={4}>
        <DropdownMenuLabel className='text-muted-foreground text-xs'>
          Pilih Venue
        </DropdownMenuLabel>
        {venues.map((venue) => (
          <DropdownMenuItem
            key={venue.id}
            className='gap-2 p-2 cursor-pointer'
            onClick={() => handleSelect(venue)}>
            <div className='flex size-6 items-center justify-center rounded-md border'>
              <MapPin className='size-3.5 shrink-0' />
            </div>
            <div className='flex-1'>
              <p className='font-medium'>{venue.name}</p>
              <p className='text-xs text-muted-foreground'>{venue.city.name}</p>
            </div>
            {selectedVenue?.id === venue.id && (
              <Check className='size-4 text-primary' />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VenueSwitcher;
