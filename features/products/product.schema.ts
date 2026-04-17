import { z } from "zod"

export const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be positive"),
  description: z.string().optional(),
  availableColours: z
    .array(
      z.object({
        label: z.string().min(1),
        swatchImageUrl: z.string().url(),
      })
    )
    .optional(),
  primaryImageUrl: z.string().url("Primary image URL is required"),
  galleryImageUrls: z.array(z.string().url()).optional(),
})

export const updateProductSchema = createProductSchema.partial()

export type CreateProductPayload = z.infer<typeof createProductSchema>
export type UpdateProductPayload = z.infer<typeof updateProductSchema>
