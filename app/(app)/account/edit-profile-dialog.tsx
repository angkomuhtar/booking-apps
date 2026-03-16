"use client";

import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroupButton } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/lib/data/acount";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type EditProfileDialogProps = {
  field: "name" | "phone";
  label: string;
  defaultValue: string;
};

export function EditProfileDialog({
  field,
  label,
  defaultValue,
}: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        toast.success(result.message);
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <InputGroupButton size='icon-xs'>
          <Pencil className='data-[favorite=true]:fill-blue-600 data-[favorite=true]:stroke-blue-600' />
        </InputGroupButton>
      </DialogTrigger>
      <DialogContent className='sm:max-w-sm'>
        <form action={handleSubmit}>
          <AlertDialogHeader>
            <DialogTitle>Edit {label}</DialogTitle>
          </AlertDialogHeader>
          <Field className='my-4'>
            <Label htmlFor={`${field}-edit`}>{label}</Label>
            <Input
              id={`${field}-edit`}
              name={field}
              defaultValue={defaultValue}
            />
          </Field>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
