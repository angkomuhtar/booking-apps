"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
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
import { Separator } from "@/components/ui/separator";
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
import { createCourt } from "@/lib/actions/court";
import { createPermission } from "@/lib/actions/permission";
import { CourtType, FloorType, VenueSelect } from "@/lib/actions/select";
import { CourtSchema } from "@/schema/courts.schema";
import { PermissionSchema } from "@/schema/roles.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { CheckCheckIcon } from "lucide-react";
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
          result.message || "Gagal menyimpan Court. Silakan coba lagi."
        );
      }
    } catch (error) {
      console.error("Error submitting court:", error);
      toast.error("Gagal menyimpan Court. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='bg-white border border-muted-foreground rounded-md px-4 py-2 inline-flex justify-center items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer hover:bg-black hover:text-white transition-colors'>
          <Icon icon='heroicons:plus-16-solid' className='size-4' />
          Tambah Data
        </button>
      </SheetTrigger>
      <SheetContent className='inset-y-4 sm:right-4 rounded-md h-auto w-full max-w-lg gap-0 '>
        <SheetHeader>
          <SheetTitle>Tambah Court</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <div className='overflow-auto [&::-webkit-scrollbar]:w-2'>
            <form
              id='add-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-4'>
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
                                  e.target.value == "" ? "0" : e.target.value
                                )
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
                                  e.target.value == "" ? "0" : e.target.value
                                )
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
