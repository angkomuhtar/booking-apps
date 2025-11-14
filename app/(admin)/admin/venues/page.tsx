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
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

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
          <h1 className='text-xl font-medium leading-none text-mono'>Venues</h1>
          <div className='flex items-center gap-2 text-sm font-normal text-muted-foreground'>
            Central Hub for Personal Customization
          </div>
        </div>
        <div className='flex items-center gap-2.5'>
          <Link
            href='/admin/venues/add'
            className='bg-white border border-muted-foreground rounded-md px-4 py-2 inline-flex justify-center items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer hover:bg-black hover:text-white transition-colors'>
            <Icon icon='heroicons:plus-16-solid' className='size-4' />
            Tambah Data
          </Link>
        </div>
      </div>
      <div className='bg-sidebar-accent min-h-72 rounded-md'></div>
    </div>
  );
}
