import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Icon } from "@iconify/react";
import { getRoles } from "@/lib/actions/role";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RolesClient } from "./roles-client";
import RoleAddForm from "./role-add-form";
import { getPermissions } from "@/lib/actions/permission";

export default async function AdminVenuesPage() {
  const session = await auth();
  if (!session || session.user.role == "User") {
    redirect("/login");
  }

  const result = await getRoles();
  const permissions = await getPermissions();

  return (
    <div className='flex flex-1 flex-col p-4 pt-0 font-sans'>
      <div className='flex flex-wrap items-center justify-between gap-5 pb-6'>
        <div className='flex flex-col justify-center gap-2'>
          <h1 className='text-xl font-medium leading-none text-mono'>Roles</h1>
          <div className='flex items-center gap-2 text-sm font-normal text-muted-foreground'></div>
        </div>
        <div className='flex items-center gap-2.5'>
          <RoleAddForm permissions={permissions.data} />
        </div>
      </div>

      {result.success ? (
        <RolesClient data={result.data} permissions={permissions.data} />
      ) : (
        <div className='bg-sidebar-accent min-h-72 rounded-md flex items-center justify-center'>
          <p className='text-muted-foreground'>{result.message}</p>
        </div>
      )}
    </div>
  );
}
