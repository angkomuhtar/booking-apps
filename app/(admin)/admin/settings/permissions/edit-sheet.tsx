"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PermissionSchema } from "@/schema/roles.schema";

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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PermissionColumn } from "./columns";
import { updatePermission } from "@/lib/actions/permission";
import { toast } from "sonner";

interface EditSheetProps {
  data: PermissionColumn | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditSheet({ data, open, onOpenChange }: EditSheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof PermissionSchema>>({
    resolver: zodResolver(PermissionSchema),
    values: {
      name: data?.name ?? "",
      description: data?.description ?? "",
      code: data?.code ?? "",
      group: data?.group ?? "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof PermissionSchema>) => {
    if (!data) return;
    setIsSubmitting(true);
    const result = await updatePermission(data.id, formData);
    if (result.success) {
      toast.success(result.message);
      onOpenChange(false);
    } else {
      toast.error(result.message);
    }
    setIsSubmitting(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='inset-y-4 sm:right-4 rounded-md h-auto w-full max-w-lg gap-0 '>
        <SheetHeader>
          <SheetTitle>Edit Role</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <div className='overflow-auto [&::-webkit-scrollbar]:w-2'>
            <form
              id='role-edit-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Permission</FormLabel>
                    <FormControl>
                      <Input placeholder='Nama permission' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode Permission</FormLabel>
                    <FormControl>
                      <Input placeholder='Kode permission' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='group'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group</FormLabel>
                    <FormControl>
                      <Input placeholder='Group' {...field} />
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
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Deskripsi permission' {...field} />
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
              form='role-edit-form'
              disabled={isSubmitting}
              className='flex-1'>
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </SheetFooter>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
