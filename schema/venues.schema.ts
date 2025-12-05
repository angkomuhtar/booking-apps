import * as z from "zod";

export const imageInputSchema = z.object({
  file: z.any().optional(),
  preview: z.string(),
  name: z.string(),
  url: z.string().optional(),
  order: z.number().optional(),
  isPrimary: z.boolean().optional(),
});

export const createVenueSchema = z.object({
  name: z.string().min(5, "Nama venue minimal 5 karakter"),
  description: z.string().min(20, "Deskripsi minimal 20 karakter").optional(),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
  city: z.string().min(2, "Kota minimal 2 karakter"),
  province: z.string().min(2, "Provinsi minimal 2 karakter").optional(),
  rules: z.string().optional(),
  facilities: z.array(z.string()).min(1, "Pilih minimal 1 fasilitas"),
  images: z
    .array(imageInputSchema)
    .min(2, "Upload minimal 2 gambar")
    .max(10, "Maksimal 10 gambar"),
});

export const updateVenueSchema = z.object({
  name: z.string().min(5, "Nama venue minimal 5 karakter").optional(),
  description: z.string().min(20, "Deskripsi minimal 20 karakter").optional(),
  address: z.string().min(10, "Alamat minimal 10 karakter").optional(),
  city: z.string().min(2, "Kota minimal 2 karakter").optional(),
  province: z.string().min(2, "Provinsi minimal 2 karakter").optional(),
  rules: z.string().optional(),
  facilities: z.array(z.string()).optional(),
  images: z
    .array(
      z.object({
        url: z.string().url("URL gambar tidak valid"),
        order: z.number().optional(),
        isPrimary: z.boolean().optional(),
      })
    )
    .optional(),
});

export type CreateVenueInput = z.infer<typeof createVenueSchema>;
export type UpdateVenueInput = z.infer<typeof updateVenueSchema>;
