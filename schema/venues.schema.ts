import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(5, "Bug title must be at least 5 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
  address: z.string().min(5, "Address must be at least 5 characters."),
  city: z.string().min(2, "City must be at least 2 characters."),
  province: z.string().optional(),
  location: z.string().optional(),
  rules: z.string().optional(),
  imageUrl: z.string().url("Image URL must be a valid URL.").optional(),
  facilities: z
    .array(z.string())
    .min(1, "At least one facility must be provided."),
});
