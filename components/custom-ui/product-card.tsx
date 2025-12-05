import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProductCard = () => {
  return (
    <Link href='/venues/venue-1'>
      <div className='bg-white rounded-lg shadow-md hover:shadow-xl cursor-pointer hover:scale-105 hover:-translate-y-1 transition-all duration-150'>
        <img
          src='/image/court.jpg'
          alt='Venue 1'
          className='w-full h-40 object-cover rounded-t-md'
        />
        <div className='p-4'>
          <h3 className='font-semibold text-sm'>Elite Badminton</h3>
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

          <div className='flex items-center my-2 [&>span:not(:last-child)]:after:content-[""] [&>span:not(:last-child)]:after:inline-block [&>span:not(:last-child)]:after:mx-2 [&>span:not(:last-child)]:after:h-2 [&>span:not(:last-child)]:after:border-l'>
            <span className='font-medium text-[10px] '>Padel</span>
            <span className='font-medium text-[10px] '>Badminton</span>
            <span className='font-medium text-[10px] '>Mini Soccer</span>
          </div>
          <p className='text-xs text-muted-foreground font-light'>
            Jakarta, Indonesia
          </p>

          <div className='h-12 flex flex-col justify-end mt-2 space-y-1'>
            <span className='text-xs text-muted-foreground font-light line-through'>
              Rp. 200.000
            </span>
            <span className='font-semibold text-sm'>Rp. 120.000</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
