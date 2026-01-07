import * as z from "zod";

export const CourtSchema = z.object({
  name: z.string().min(4, "Nama court minimal 4 karakter"),
  type: z.string().min(2, "Pilih jenis court"),
  floor: z.string().min(2, "Pilih tipe lantai"),
  pricePerHour: z.number().min(1000, "Minimal Rp 1.000"),
  sessionDuration: z.number().min(15, "Minimal 15 menit"),
  isActive: z.boolean().optional(),
  venueId: z.string().min(2, "Venue harus dipilih"),
});
