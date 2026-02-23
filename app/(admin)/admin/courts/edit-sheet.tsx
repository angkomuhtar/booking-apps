"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CourtSchema } from "@/schema/courts.schema";
import { updateCourt } from "@/lib/actions/court";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CourtColumn } from "./columns";
import { toast } from "sonner";

interface EditSheetProps {
  data: CourtColumn | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditSheet({ data, open, onOpenChange }: EditSheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const form = useForm<z.infer<typeof CourtSchema>>({
  //   resolver: zodResolver(CourtSchema),
  //   values: {
  //     name: data?.name ?? "",
  //     type: data?.type ?? "",
  //     floor: data?.floor ?? "",
  //     pricePerHour: data?.pricePerHour ?? 0,
  //     sessionDuration: data?.sessionDuration ?? 60,
  //     isActive: data?.isActive ?? true,
  //     venueId: data?.venue?.id ?? "",
  //   },
  // });

  const onSubmit = async (formData: z.infer<typeof CourtSchema>) => {
    if (!data) return;
    setIsSubmitting(true);
    try {
      const result = await updateCourt(data.id, formData);
      if (result.success) {
        toast.success(result.message);
        onOpenChange(false);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Gagal mengupdate court");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='inset-y-4 sm:right-4 rounded-md h-auto w-full max-w-lg gap-0'>
        <SheetHeader>
          <SheetTitle>Edit Court</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {/* <Form {...form}>
          <div className='overflow-auto [&::-webkit-scrollbar]:w-2'>
            <form
              id='court-edit-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Court</FormLabel>
                    <FormControl>
                      <Input placeholder='Nama court' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='pricePerHour'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga Per Sesi</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Harga per sesi'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='sessionDuration'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Durasi Sesi (menit)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Durasi sesi'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              form='court-edit-form'
              disabled={isSubmitting}
              className='flex-1'>
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </SheetFooter>
        </Form> */}
      </SheetContent>
    </Sheet>
  );
}
