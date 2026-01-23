"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RoleSchema } from "@/schema/roles.schema";
import { updateRole } from "@/lib/actions/role";
import { toast } from "sonner";
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
import { RoleColumn } from "./columns";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { CheckCheckIcon, Search } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { Permission } from "@prisma/client";

interface RoleEditSheetProps {
  role: RoleColumn | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  permissions: Permission[];
}

type SelectedPermission = {
  permissionId: string;
  code: string;
  name: string;
};

export function RoleEditSheet({
  role,
  open,
  onOpenChange,
  permissions,
}: RoleEditSheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<
    SelectedPermission[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (role) {
      const initialPermissions = role.permissions?.map((perm) => ({
        permissionId: perm.permission.id,
        code: perm.permission.code,
        name: perm.permission.name,
      }));
      setSelectedPermissions(initialPermissions || []);
    }
  }, [role]);

  const filteredPermissions = useMemo(() => {
    if (!searchQuery) return permissions;
    return permissions.filter(
      (p) =>
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [permissions, searchQuery]);

  const form = useForm<z.infer<typeof RoleSchema>>({
    resolver: zodResolver(RoleSchema),
    values: {
      name: role?.name ?? "",
      description: role?.description ?? "",
      isSystem: role?.isSystem ?? false,
      permissions: selectedPermissions,
    },
  });

  useEffect(() => {
    form.setValue("permissions", selectedPermissions);
  }, [selectedPermissions, form]);

  const togglePermission = (permission: Permission) => {
    const isSelected = selectedPermissions.some(
      (p) => p.permissionId === permission.id
    );
    if (isSelected) {
      setSelectedPermissions((prev) =>
        prev.filter((p) => p.permissionId !== permission.id)
      );
    } else {
      setSelectedPermissions((prev) => [
        ...prev,
        {
          permissionId: permission.id,
          code: permission.code,
          name: permission.name,
        },
      ]);
    }
  };

  const removePermission = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.filter((p) => p.permissionId !== permissionId)
    );
  };

  const onSubmit = async (data: z.infer<typeof RoleSchema>) => {
    // console.log(data);

    if (!role) return;
    setIsSubmitting(true);
    const result = await updateRole(role.id, data);
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
      <SheetContent className='inset-y-4 sm:right-4 rounded-md h-auto w-full max-w-lg gap-0'>
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
                    <FormLabel>Nama Role</FormLabel>
                    <FormControl>
                      <Input placeholder='Nama role' {...field} />
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
                      <Textarea placeholder='Deskripsi role' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isSystem'
                render={() => (
                  <FormItem>
                    <FormLabel>Role Permission</FormLabel>
                    <div className='flex gap-2 flex-wrap rounded-md border border-input shadow-xs p-3 min-h-20'>
                      {selectedPermissions.length === 0 ? (
                        <span className='text-muted-foreground text-sm'>
                          Belum ada permission dipilih
                        </span>
                      ) : (
                        selectedPermissions.map((permission) => (
                          <Badge
                            key={permission.permissionId}
                            variant='outline'
                            className='self-start'>
                            {permission.code}
                            <button
                              type='button'
                              onClick={() =>
                                removePermission(permission.permissionId)
                              }>
                              <Icon
                                icon='heroicons:x-mark-20-solid'
                                className='size-3 ml-1'
                              />
                            </button>
                          </Badge>
                        ))
                      )}
                    </div>
                    <FormMessage />
                    <div className='flex'>
                      <Popover>
                        <PopoverTrigger asChild className='flex flex-row'>
                          <Button variant='outline'>Tambah Permission</Button>
                        </PopoverTrigger>
                        <PopoverContent className='px-1 w-56' align='start'>
                          <InputGroup>
                            <InputGroupInput
                              placeholder='Search...'
                              className='focus-visible:ring-0 focus-visible:outline-0'
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <InputGroupAddon align='inline-end'>
                              <Search />
                            </InputGroupAddon>
                          </InputGroup>
                          <div className='grid max-h-60 overflow-y-auto mt-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full scrollbar-thin'>
                            {filteredPermissions.length === 0 ? (
                              <span className='text-sm text-muted-foreground p-2 text-center'>
                                No permissions found.
                              </span>
                            ) : (
                              filteredPermissions.map((permission) => {
                                const isSelected = selectedPermissions.some(
                                  (p) => p.permissionId === permission.id
                                );
                                return (
                                  <Item
                                    key={permission.id}
                                    variant='default'
                                    size='sm'
                                    className='cursor-pointer hover:bg-muted p-2'
                                    onClick={() =>
                                      togglePermission(permission)
                                    }>
                                    <ItemContent>
                                      <ItemTitle>{permission.code}</ItemTitle>
                                    </ItemContent>
                                    <ItemActions>
                                      {isSelected ? (
                                        <CheckCheckIcon className='size-4 text-green-500' />
                                      ) : (
                                        <div className='size-4'></div>
                                      )}
                                    </ItemActions>
                                  </Item>
                                );
                              })
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
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
