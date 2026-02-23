import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProductsLoad = () => {
  return (
    <div className='rounded-lg shadow-sm bg-white p-2'>
      <Skeleton className='aspect-video rounded-lg mb-2 bg-gray-200' />
      <Skeleton className='h-3 w-1/2 mb-2 bg-gray-200' />
      <div className='py-3'>
        <Skeleton className='h-2 w-full bg-gray-200 mb-1' />
        <Skeleton className='h-2 w-full bg-gray-200' />
      </div>
      <div className='flex justify-between items-end pt-4'>
        <Skeleton className='h-4 w-1/3 bg-gray-200' />
        <Skeleton className='h-6 w-1/3 bg-gray-200' />
      </div>
    </div>
  );
};

export default ProductsLoad;
