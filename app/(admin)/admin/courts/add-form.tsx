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
import { createCourt } from "@/lib/actions/court";
import { CourtType, FloorType, VenueSelect } from "@/lib/actions/select";
import { CourtSchema } from "@/schema/courts.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const AddForm = ({
  venues,
  courtType,
  floorType,
}: {
  venues: VenueSelect[];
  courtType: CourtType[];
  floorType: FloorType[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof CourtSchema>>({
    resolver: zodResolver(CourtSchema),
    defaultValues: {
      name: "",
      type: "",
      floor: "",
      pricePerHour: 0,
      sessionDuration: 60,
      isActive: true,
      venueId: "",
      images: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof CourtSchema>) => {
    try {
      const result = await createCourt(data);
      if (result.success) {
        toast.success("Court berhasil disimpan");
        form.reset();
      } else {
        toast.error(
          result.message || "Gagal menyimpan Court. Silakan coba lagi.",
        );
      }
    } catch (error) {
      console.error("Error submitting court:", error);
      toast.error("Gagal menyimpan Court. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedImages = form.watch("images");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const currentImages = selectedImages || [];
    if (currentImages.length >= 10) {
      toast.error("Maksimal 10 gambar yang diizinkan");
      return false;
    }
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));
    const check = currentImages.find((img) =>
      newImages.some((newImg) => newImg.name === img.name),
    );

    if (check) return false;
    form.setValue("images", [...currentImages, ...newImages]);
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const currentImages = selectedImages || [];
    const imageToRemove = currentImages[index];
    if (imageToRemove?.preview) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    form.setValue(
      "images",
      currentImages.filter((_, i) => i !== index),
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='bg-white border border-muted-foreground rounded-md px-4 py-2 inline-flex justify-center items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer hover:bg-black hover:text-white transition-colors'>
          <Icon icon='heroicons:plus-16-solid' className='size-4' />
          Tambah Data
        </button>
      </SheetTrigger>
      <SheetContent className='inset-y-4 sm:right-4 rounded-md h-auto sm:max-w-4xl gap-0 '>
        <SheetHeader>
          <SheetTitle>Tambah Court</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <div className='overflow-auto [&::-webkit-scrollbar]:w-2'>
            <form
              id='add-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='p-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='grid gap-6 place-self-start'>
                <FormField
                  control={form.control}
                  name='venueId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue</FormLabel>
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
                      <FormLabel>Nama Court</FormLabel>
                      <FormControl>
                        <Input placeholder='Nama Court' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='type'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Court</FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Pilih Jenis Court' />
                          </SelectTrigger>
                          <SelectContent>
                            {courtType.map((court: CourtType) => (
                              <SelectItem key={court.id} value={court.id}>
                                {court.name}
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
                  name='floor'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Permukaan</FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Pilih Jenis Permukaan' />
                          </SelectTrigger>
                          <SelectContent>
                            {floorType.map((floor: FloorType) => (
                              <SelectItem key={floor.id} value={floor.id}>
                                {floor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='sessionDuration'
                    render={({ field }) => (
                      <FormItem className='self-start'>
                        <FormLabel>Durasi Persesi</FormLabel>
                        <FormControl>
                          <InputGroup>
                            <InputGroupInput
                              placeholder='0'
                              type='number'
                              onChange={(e) =>
                                field.onChange(
                                  parseInt(
                                    e.target.value == "" ? "0" : e.target.value,
                                  ),
                                )
                              }
                              defaultValue={field.value}
                            />
                            <InputGroupAddon align='inline-end'>
                              Menit
                            </InputGroupAddon>
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='pricePerHour'
                    render={({ field }) => (
                      <FormItem className='self-start'>
                        <FormLabel>Harga per Sesi</FormLabel>
                        <FormControl>
                          <InputGroup>
                            <InputGroupInput
                              placeholder='0'
                              type='number'
                              onChange={(e) =>
                                field.onChange(
                                  parseInt(
                                    e.target.value == "" ? "0" : e.target.value,
                                  ),
                                )
                              }
                              defaultValue={field.value}
                            />
                            <InputGroupAddon>Rp.</InputGroupAddon>
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-2.5'>
                <label htmlFor='facilities' className='form-label'>
                  Gambar <span className='text-red-500'>*</span>
                </label>
                <div className='p-4 border border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center'>
                  <p className='text-sm text-muted-foreground font-bold'>
                    Upload gambar venue disini
                  </p>
                  <p className='text-xs font-light text-muted-foreground'>
                    2 - 10 PNG JPG, maksimal 5MB
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
                <p className='text-xs font-semibold text-muted-foreground mt-1'>
                  {selectedImages?.length || 0} gambar dipilih
                </p>
                {selectedImages && selectedImages.length > 0 && (
                  <div className='flex flex-col gap-2 mt-2'>
                    {selectedImages.map((image, index) => (
                      <div
                        key={index}
                        className='flex items-center gap-3 p-1 border rounded-md'>
                        <div className='rounded-md aspect-video h-14 border border-gray-300'>
                          <img
                            src={image.preview}
                            alt={image.name}
                            className='object-contain w-full h-full rounded-md'
                          />
                        </div>
                        <span className='flex-1 text-sm line-clamp-1'>
                          {image.name}
                        </span>
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          className='text-red-500 hover:text-red-700 hover:bg-red-50'
                          onClick={() => handleRemoveImage(index)}>
                          <Icon icon='mdi:trash-outline' className='w-4 h-4' />
                          Hapus
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {form.formState.errors.images && (
                  <p className='form-error'>
                    {form.formState.errors.images.message}
                  </p>
                )}
              </div>
            </form>
          </div>
          <SheetFooter className='flex flex-row gap-2 p-4'>
            <SheetClose asChild>
              <Button type='button' variant='outline' className='w-2/5'>
                Batal
              </Button>
            </SheetClose>
            <Button
              type='submit'
              form='add-form'
              disabled={isLoading}
              className='flex-1'>
              {isLoading ? "Menyimpan..." : "Simpan Court"}
            </Button>
          </SheetFooter>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default AddForm;
