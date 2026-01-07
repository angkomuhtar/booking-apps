"use client";

import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PermissionColumn } from "./columns";
import { deletePermission } from "@/lib/actions/permission";

interface DeleteDialogProps {
  data: PermissionColumn | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteDialog({ data, open, onOpenChange }: DeleteDialogProps) {
  const handleDelete = async () => {
    if (!data) return;
    const result = await deletePermission(data.id);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Permission &quot;{data?.name}
            &quot; akan dihapus secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
