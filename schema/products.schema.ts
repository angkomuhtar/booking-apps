import * as z from "zod";

export const ProductSchema = z.object({
  venueId: z.string().min(2, "Venue harus dipilih"),
  name: z.string().min(4, "Nama court minimal 4 karakter"),
  description: z.string().optional(),
  price: z.number().min(1000, "Minimal Rp 1.000"),
  stock: z.number().min(1, "Stok tidak boleh 0"),
  imageUrl: z.object(
    {
      file: z.any().optional(),
      preview: z.string(),
      name: z.string(),
      url: z.string().optional(),
      order: z.number().optional(),
      isPrimary: z.boolean().optional(),
    },
    "Harus berupa file gambar",
  ),
  category: z.string().optional(),
  isActive: z.boolean().optional(),
});
