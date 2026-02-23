"use client";

import { getVenueProduct } from "@/lib/actions/venue";
import { usePosStore } from "@/store/usePosStore";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import ProductCard from "./product-card";
import ProductsLoad from "./product-load";
import { Field, FieldLabel } from "../ui/field";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const VenueProduct = () => {
  const { selectedVenue, activeCart } = usePosStore();
  const [query, setQuery] = useState<string>("");

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pos.venue.product", selectedVenue?.id, query],
    queryFn: () => getVenueProduct(selectedVenue!.id, query),
    enabled: !!selectedVenue?.id,
  });

  return (
    <div className='mt-8 py-4 border-t'>
      <h3 className='mb-2.5'>Products</h3>
      <div className='flex justify-between items-end mb-4'>
        <ButtonGroup className='border border-teal-400 rounded-md'>
          <Input
            id='input-button-group'
            placeholder='Type to search...'
            className='shadow-sm focus-visible:border-ring-0'
            onChange={(e) => {
              e.target.value.length < 3
                ? setQuery("")
                : setQuery(e.target.value);
            }}
          />
          <Button variant='outline' className='bg-teal-400 text-white'>
            Search
          </Button>
        </ButtonGroup>
      </div>
      <div className='grid grid-cols-4 gap-4 mt-4'>
        {isLoading
          ? [1, 2, 3, 4].map((court) => <ProductsLoad key={court} />)
          : product?.data &&
            product?.data?.map((product) => {
              const isInCart = activeCart.some(
                (cartItem) => cartItem.id === product.id,
              );
              const item = activeCart.filter(
                (cartItem) => cartItem.id === product.id,
              );
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  inCart={isInCart}
                  item={item[0]}
                />
              );
            })}
      </div>
    </div>
  );
};

export default VenueProduct;
