"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import {
  createVenueSchema,
  type CreateVenueInput,
} from "@/schema/venues.schema";
import { createVenue, getFacilities } from "@/lib/actions/venue";

import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/components/tiptap-templates/simple/simple-editor.scss";

type Facility = {
  id: string;
  name: string;
  icon: string | null;
};

export default function AddVenuePage() {
  const router = useRouter();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateVenueInput>({
    resolver: zodResolver(createVenueSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      city: "",
      province: "",
      rules: "",
      facilities: [],
    },
  });

  useEffect(() => {
    async function loadFacilities() {
      const data = await getFacilities();
      setFacilities(data);
    }
    loadFacilities();
  }, []);

  const selectedFacilities = watch("facilities");

  const handleFacilityChange = (facilityId: string, checked: boolean) => {
    const current = selectedFacilities || [];
    if (checked) {
      setValue("facilities", [...current, facilityId]);
    } else {
      setValue(
        "facilities",
        current.filter((id) => id !== facilityId)
      );
    }
  };

  const onSubmit = async (data: CreateVenueInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await createVenue(data);

      if (result.success) {
        router.push("/admin/venues");
        router.refresh();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat membuat venue");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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

      {error && (
        <div className='mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-6 items-start'>
          <div className='grid items-start gap-4'>
            <div className='flex flex-col gap-2.5'>
              <label htmlFor='name' className='form-label'>
                Nama Venue <span className='text-red-500'>*</span>
              </label>
              <input
                id='name'
                type='text'
                className='form-control'
                {...register("name")}
              />
              {errors.name && (
                <p className='form-error'>{errors.name.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2.5'>
              <label htmlFor='description' className='form-label'>
                Deskripsi
              </label>
              <textarea
                id='description'
                className='form-control h-32 py-2'
                {...register("description")}
              />
              {errors.description && (
                <p className='form-error'>{errors.description.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2.5'>
              <label htmlFor='address' className='form-label'>
                Alamat Lengkap <span className='text-red-500'>*</span>
              </label>
              <textarea
                id='address'
                className='form-control h-16 py-2'
                {...register("address")}
              />
              {errors.address && (
                <p className='form-error'>{errors.address.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2.5'>
              <label htmlFor='province' className='form-label'>
                Provinsi
              </label>
              <input
                id='province'
                type='text'
                className='form-control'
                {...register("province")}
              />
              {errors.province && (
                <p className='form-error'>{errors.province.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2.5'>
              <label htmlFor='city' className='form-label'>
                Kota / Kabupaten <span className='text-red-500'>*</span>
              </label>
              <input
                id='city'
                type='text'
                className='form-control'
                {...register("city")}
              />
              {errors.city && (
                <p className='form-error'>{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className='grid items-start gap-4'>
            <div className='flex flex-col gap-2.5'>
              <label htmlFor='' className='form-label'>
                Aturan Venue
              </label>
              <Controller
                name='rules'
                control={control}
                render={({ field }) => (
                  <SimpleEditor
                    className='border border-input rounded-md h-72! max-h-72 shadow-sm'
                    {...field}
                  />
                )}
              />
              {errors.rules && (
                <p className='form-error'>{errors.rules.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2.5'>
              <label htmlFor='facilities' className='form-label'>
                Fasilitas Venue <span className='text-red-500'>*</span>
              </label>
              <div className='grid grid-cols-2 gap-3'>
                {facilities.map((facility) => (
                  <div key={facility.id} className='flex items-center gap-3'>
                    <Checkbox
                      id={facility.id}
                      checked={selectedFacilities?.includes(facility.id)}
                      onCheckedChange={(checked) =>
                        handleFacilityChange(facility.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={facility.id} className='text-xs'>
                      {facility.name}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.facilities && (
                <p className='form-error'>{errors.facilities.message}</p>
              )}
            </div>
          </div>
          <div className='flex gap-3 pt-4 col-span-2 justify-end'>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.back()}
              disabled={isLoading}>
              Batal
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Venue"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
