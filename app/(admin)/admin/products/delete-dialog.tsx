"use client";

import { toast } from "sonner";
import { ProductColumn } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/lib/actions/products";

interface DeleteDialogProps {
  data: ProductColumn | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteDialog({ data, open, onOpenChange }: DeleteDialogProps) {
  const handleDelete = async () => {
    if (!data) return;
    const result = await deleteProduct(data.id);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='w-md'>
        <DialogHeader>
          <DialogTitle>Apakah anda yakin?</DialogTitle>
          <DialogDescription>
            Tindakan ini tidak dapat dibatalkan. Permission &quot;{data?.name}
            &quot; akan dihapus secara permanen.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' className=''>
              Batal
            </Button>
          </DialogClose>
          <Button onClick={handleDelete} variant='destructive'>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
