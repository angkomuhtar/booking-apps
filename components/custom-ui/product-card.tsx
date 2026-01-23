import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export type ProductCard = {
  name: string;
  id: string;
  createdAt: Date;
  description: string | null;
  rating: number;
  province: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
  city: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    provinceId: string;
  };
  _count: {
    courts: number;
  };
  address: string;
  totalReviews: number;
  courts: {
    id: string;
    name: string;
    type: string | null;
    pricePerHour: number;
    courtType: {
      id: string;
      name: string;
    } | null;
  }[];
  venueImages: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    venueId: string;
    imageUrl: string;
    order: number;
    isPrimary: boolean;
  }[];
  lowestPrice: number | null;
  courtTypes: (string | undefined)[];
};

const ProductCard = ({ data }: { data: ProductCard }) => {
  return (
    <Link href={`/venues/${data.id}`}>
      <div className='bg-white rounded-lg shadow-md hover:shadow-xl cursor-pointer hover:scale-105 hover:-translate-y-1 transition-all duration-150'>
        <img
          src={data.venueImages[0]?.imageUrl || "/image/court.jpg"}
          alt='Venue 1'
          className='w-full aspect-video object-cover rounded-t-md'
        />
        <div className='p-4'>
          <h3 className='font-semibold text-sm'>{data.name}</h3>

          {data.totalReviews > 0 && (
            <div className='flex items-center space-x-1'>
              <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
              <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
              <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
              <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
              <Star className='h-3 w-3 fill-gray-200 text-gray-200' />
              <span className='text-[11px] font-semibold text-muted-foreground ml-2'>
                (4.0)
              </span>
            </div>
          )}

          <div className='flex items-center space-x-1'>
            <span className='text-[11px] font-semibold text-muted-foreground'>
              {data._count.courts} Court
            </span>
          </div>

          <div className='flex items-center my-2 gap-1'>
            {data?.courtTypes?.slice(0, 3).map((courtType, index) => (
              <span
                key={index}
                className='font-bold text-[10px] bg-blue-500 text-white px-1 rounded-xs lowercase'>
                {courtType}
              </span>
            ))}

            {data.courtTypes.length > 3 && (
              <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <span className='font-bold text-[10px] bg-blue-500 text-white px-1 rounded-xs lowercase'>
                    ...
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className='p-2' align='start'>
                  <div className='flex flex-wrap gap-1'>
                    {data.courtTypes?.slice(3).map((courtType, index) => (
                      <span
                        key={index}
                        className='font-bold text-[10px] bg-blue-500 text-white px-1 rounded-xs lowercase'>
                        {courtType}
                      </span>
                    ))}
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
          <p className='text-xs text-muted-foreground font-light lowercase'>
            {data.city.name}, {data.province.name}
          </p>

          <div className='flex flex-col justify-end mt-2 space-y-1'>
            {/* <span className='text-xs text-muted-foreground font-light line-through'>
              {(data.lowestPrice || 0 + 5000).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              })}
            </span> */}
            <div className='flex items-end'>
              <span className='font-semibold text-sm'>
                {(data.lowestPrice || 0 + 5000).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}
              </span>
              <span className='text-[11px] ml-1'> / Sesi</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
