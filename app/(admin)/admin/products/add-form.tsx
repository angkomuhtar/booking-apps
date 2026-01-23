"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "@/lib/actions/products";
import { VenueSelect } from "@/lib/actions/select";
import { ProductSchema } from "@/schema/products.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const AddForm = ({ venues }: { venues: VenueSelect[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      isActive: true,
      venueId: "",
      imageUrl: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
    try {
      setIsLoading(true);
      const result = await createProduct(data);
      if (result?.success) {
        toast.success("Court berhasil disimpan");
        form.reset();
      } else {
        toast.error(
          result?.message || "Gagal menyimpan Court. Silakan coba lagi.",
        );
      }
    } catch (error) {
      console.error("Error submitting court:", error);
      toast.error("Gagal menyimpan Court. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedImages = form.watch("imageUrl");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = {
      file: files[0],
      preview: URL.createObjectURL(files[0]),
      name: files[0].name,
    };
    form.setValue("imageUrl", newImages);
    e.target.value = "";
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='bg-white border border-muted-foreground rounded-md px-4 py-2 inline-flex justify-center items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer hover:bg-black hover:text-white transition-colors'>
          <Icon icon='heroicons:plus-16-solid' className='size-4' />
          Tambah Data Product
        </button>
      </SheetTrigger>
      <SheetContent className='inset-y-4 sm:right-4 rounded-md h-auto sm:w-3/4 w-full sm:max-w-full gap-0 '>
        <SheetHeader>
          <SheetTitle>Tambah Product</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <div className='overflow-auto [&::-webkit-scrollbar]:w-2'>
            <form
              id='add-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-4'>
              <div className='px-4 py-6 grid md:grid-cols-2 gap-6 items-start'>
                <FormField
                  control={form.control}
                  name='venueId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Venue <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Pilih Venue' />
                          </SelectTrigger>
                          <SelectContent>
                            {venues.map((venue: VenueSelect) => (
                              <SelectItem key={venue.id} value={venue.id}>
                                {venue.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nama Product <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='Nama Product' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi Product </FormLabel>
                      <FormControl>
                        <Textarea placeholder='Deskripsi Product' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Harga Product <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <InputGroup>
                          <InputGroupAddon>Rp</InputGroupAddon>
                          <InputGroupInput
                            type='number'
                            placeholder='Harga Product'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='stock'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Stok Product <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Stok Product'
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex flex-col gap-2.5'>
                  <label htmlFor='facilities' className='form-label'>
                    Gambar <span className='text-red-500'>*</span>
                  </label>
                  <div className='p-4 border border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center'>
                    {selectedImages ? (
                      <div className='relative'>
                        <img
                          src={selectedImages.preview}
                          alt={selectedImages.name}
                          className='object-contain w-32 aspect-video rounded-md'
                        />
                      </div>
                    ) : (
                      <Icon
                        icon='heroicons:photo-solid'
                        className='w-16 h-16 text-muted-foreground'
                      />
                    )}
                    <p className='text-sm text-muted-foreground font-bold'>
                      Upload gambar venue disini
                    </p>
                    <p className='text-xs font-light text-muted-foreground'>
                      PNG JPG, maksimal 1MB
                    </p>
                    <Input
                      type='file'
                      id='image'
                      className='hidden'
                      accept='image/png,image/jpeg,image/jpg'
                      multiple
                      onChange={handleImageChange}
                    />
                    <Button
                      type='button'
                      variant='outline'
                      className='mt-4'
                      onClick={() => document.getElementById("image")?.click()}>
                      <Icon
                        icon='icon-park-outline:upload-one'
                        className='w-4 h-4'
                      />
                      Pilih Gambar
                    </Button>
                  </div>
                  {form.formState.errors.imageUrl && (
                    <p className='form-error'>
                      {form.formState.errors.imageUrl.message}
                    </p>
                  )}
                </div>
              </div>
              <SheetFooter className='pb-4 border-t'>
                <div className='flex justify-end gap-2'>
                  <SheetClose asChild>
                    <Button variant='outline' disabled={isLoading}>
                      Batal
                    </Button>
                  </SheetClose>
                  <Button type='submit' disabled={isLoading}>
                    {isLoading ? "Menyimpan..." : "Simpan Product"}
                  </Button>
                </div>
              </SheetFooter>
            </form>
          </div>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default AddForm;
