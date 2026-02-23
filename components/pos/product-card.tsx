"use client";

import { usePosStore } from "@/store/usePosStore";
import { ShoppingBag } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { CartItem } from "@/store/useCartStore";
import { Icon } from "@iconify/react";
import { Input } from "../ui/input";

type ProductCardProps = {
  id: string;
  name: string;
  venueId: string;
  description?: string | null;
  category?: string | null;
  price: number;
  stock: number;
  imageUrl?: string | null;
  isActive: boolean;
};

const ProductCard = ({
  product,
  item,
  inCart,
}: {
  product: ProductCardProps;
  item: CartItem;
  inCart: boolean;
}) => {
  const { addToCart, selectedVenue, updateCart, removeCart } = usePosStore();

  return (
    <div key={product.id} className='p-2 rounded-lg shadow-sm bg-white'>
      <div className='aspect-video bg-gray-100 rounded-lg flex items-center justify-center'>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className='rounded-lg object-cover h-full'
          />
        ) : (
          <span className='text-gray-400 text-sm'>No Image</span>
        )}
      </div>
      <div className='flex flex-col'>
        <div className='flex justify-between items-end mt-2'>
          <p className='font-semibold text-[9px] mt-2'>
            {product.category || "Uncategorized"}
          </p>
          <span className='text-[10px] text-muted-foreground'>
            Stok: {product.stock}
          </span>
        </div>
        <div className='h-10 my-2'>
          <h4 className='mt-2 text-xs font-medium line-clamp-1'>
            {product.name}
          </h4>
          <p className='text-[10px] text-muted-foreground line-clamp-2 mt-1'>
            {product.description || "No description."}
          </p>
        </div>
        <div className='flex justify-between items-end pt-6 pb-2'>
          <span className='font-semibold text-xs'>
            Rp {product.price.toLocaleString()}
          </span>
          {inCart ? (
            <div className='flex gap-2 items-center'>
              <div className='flex border border-muted bg-white rounded-md items-center'>
                <button
                  type='button'
                  onClick={() => updateCart(item.id, item.quantity - 1)}
                  className='cursor-pointer group text-red-500 has-[>svg]:px-1.5 h-5 hover:bg-transparent transition-colors text-sm'>
                  <Icon icon='lucide:minus' className='size-2' />
                </button>
                <Input
                  className='w-4 md:text-xs h-4 text-center p-0 border-0 focus:ring-0 bg-none shadow-none'
                  value={item.quantity}
                  readOnly
                />
                <button
                  type='button'
                  onClick={() => updateCart(item.id, item.quantity + 1)}
                  className='cursor-pointer group text-red-500 has-[>svg]:px-1.5 h-5 hover:bg-transparent transition-colors text-sm'>
                  <Icon icon='lucide:plus' className='size-2' />
                </button>
              </div>
              <button
                type='button'
                onClick={() => removeCart(item.id)}
                className='border cursor-pointer text-white px-3 py-1 rounded-md text-xs font-semibold flex items-center justify-center gap-2 bg-red-500'>
                <Icon icon='lucide:trash-2' className='size-3' />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                addToCart({
                  id: product.id,
                  itemType: "PRODUCT",
                  itemId: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  venueId: selectedVenue?.id || "",
                  venueName: selectedVenue?.name || "",
                });
              }}
              className='border cursor-pointer text-gray-500 px-3 py-1 rounded-md text-xs font-semibold flex items-center justify-center gap-2 hover:bg-gray-100'>
              <ShoppingBag className='size-3' /> Tambah
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
