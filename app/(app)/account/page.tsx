import { auth } from "@/auth";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { getUserByEmail } from "@/lib/data/acount";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { EditProfileDialog } from "./edit-profile-dialog";
import { LogoutButton } from "./logout-button";

const Account = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const user = await getUserByEmail(session.user.email || "");

  return (
    <div className='bg-background py-2'>
      <main className='max-w-2xl mx-4 sm:mx-auto px-4 sm:my-8 py-6 bg-white rounded-lg shadow-md'>
        <h1 className='text-xl font-semibold'>Account</h1>
        <p className='text-gray-600 text-xs'>
          This is the account page. You can manage your account settings here.
        </p>
        <div className='mt-4 grid gap-4'>
          <div className='relative w-16 h-16'>
            <div className='size-16 rounded-full overflow-hidden relative'>
              <Image
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=random&format=png`}
                alt='Profile'
                fill
                className='object-cover rounded-full'
              />
            </div>
            <button className='rounded-full p-1 border border-gray-600 bg-red-800 absolute -bottom-1 -right-0.5'>
              <Pencil className='size-3 text-white' />
            </button>
          </div>

          <Field>
            <FieldLabel htmlFor='nama'>Nama</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id='input-nama'
                disabled
                defaultValue={user?.name}
              />
              <InputGroupAddon align='inline-end'>
                <EditProfileDialog
                  field='name'
                  label='Nama'
                  defaultValue={user?.name || ""}
                />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor='email'>Email</FieldLabel>
            <Input
              id='email'
              placeholder='Evil Rabbit'
              defaultValue={user?.email || ""}
              disabled
              readOnly
            />
          </Field>
          <Field>
            <FieldLabel htmlFor='phone'>Phone</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id='input-phone'
                disabled
                defaultValue={user?.phone || ""}
              />
              <InputGroupAddon align='inline-end'>
                <EditProfileDialog
                  field='phone'
                  label='Phone'
                  defaultValue={user?.phone || ""}
                />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </div>
        <div className='flex justify-end items-center mt-4'>
          <LogoutButton />
        </div>
      </main>
    </div>
  );
};

export default Account;
