import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getAccessibleVenues } from "@/lib/auth-helpers";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icon } from "@iconify/react";
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Input } from "@/components/ui/input";

export default async function AdminVenuesPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (
    session.user.role !== "SUPER_ADMIN" &&
    session.user.role !== "VENUE_ADMIN"
  ) {
    redirect("/");
  }

  const venues = await getAccessibleVenues();

  const isSuperAdmin = session.user.role === "SUPER_ADMIN";

  return (
    <div className='flex flex-1 flex-col p-4 pt-0 font-sans'>
      <div className='flex flex-wrap items-center justify-between gap-5 pb-6'>
        <div className='flex flex-col justify-center gap-2'>
          <h1 className='text-xl font-medium leading-none text-mono'>
            Add Venues
          </h1>
          <div className='flex items-center gap-2 text-sm font-normal text-muted-foreground'>
            Central Hub for Personal Customization
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-6 items-start'>
        <div className='grid items-start gap-4'>
          <div className='flex flex-col gap-2.5'>
            <label htmlFor='' className='form-label'>
              Nama Venue
            </label>
            <input type='text' className='form-control' />
          </div>
          <div className='flex flex-col gap-2.5'>
            <label htmlFor='' className='form-label'>
              Nama Venue
            </label>
            <SimpleEditor className='border border-input rounded-md h-72! max-h-72 shadow-sm' />
          </div>
        </div>
        <div className='flex flex-col gap-2.5'>
          <label htmlFor='' className='form-label'>
            Deskripsi
          </label>
          <textarea className='form-control h-32 py-2'></textarea>
        </div>
      </div>
    </div>
  );
}
