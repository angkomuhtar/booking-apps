"use client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { Icon } from "@iconify/react";
import React from "react";
import { toast } from "sonner";

type ProductType = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  description?: string | null;
  stock: number;
};

const ProductSelection = ({
  venueId,
  products,
}: {
  venueId: string;
  products: ProductType[];
}) => {
  const { addItem } = useCartStore();

  return (
    <section className='mt-6 py-4'>
      <div className='flex items-center'>
        <div className='rounded-lg bg-primary p-1.5 mr-3'>
          <Icon className='size-5 text-accent' icon='ion:restaurant-outline' />
        </div>
        <h3 className='text-3xl font-semibold flex-1'>Product Lainnya</h3>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 mt-6 gap-4'>
        {products &&
          products.map((product, index) => (
            <div
              className='grow flex flex-col justify-between p-2.5 gap-4 border rounded-xl'
              key={index}>
              <div className='mb-2 5'>
                <div className='flex-col text-card-foreground rounded-xl border border-border black/5 flex items-center justify-center relative bg-accent/50 w-full aspect-4/3 mb-4 shadow-none'>
                  <img
                    src={product?.imageUrl ?? "/image/product-placeholder.jpg"}
                    alt={product.name}
                    className='shrink-0 h-full w-full cursor-pointer rounded-xl object-cover'
                  />
                </div>
                <h4 className='hover:text-primary text-sm font-medium text-mono leading-5 block cursor-pointer px-1.5 line-clamp-1'>
                  {product.name}
                </h4>
                <p className='text-[11px] text-muted-foreground px-1.5 line-clamp-2'>
                  {product.description ?? ""}
                </p>
              </div>
              <div className='flex items-center justify-between px-2.5'>
                <span className='text-sm font-medium text-mono line-through'>
                  {/* Rp. 250K */}
                </span>
                <span className='text-sm font-medium text-mono'>
                  Rp. {product.price.toLocaleString("id-ID")}{" "}
                </span>
              </div>
              <div className='flex flex-row-reverse items-center justify-between gap-5 px-2.5 pb-1'>
                <div className='flex items-center justify-end flex-wrap gap-1.5'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='p-1'
                    onClick={() => {
                      addItem({
                        id: product.id,
                        itemType: "PRODUCT",
                        itemId: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        venueId: venueId,
                        venueName: "",
                      });
                      toast("Berhasil menambahkan ke keranjang!");
                    }}>
                    <Icon icon='ion:cart-outline' /> Add
                  </Button>
                </div>
                {/* <Badge
                  variant='secondary'
                  className='bg-blue-500 text-white dark:bg-blue-600 rounded-full'>
                  <Icon icon='ion:star' /> 4.8
                </Badge> */}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProductSelection;
