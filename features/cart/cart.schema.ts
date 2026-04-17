import { z } from "zod"

export const addCartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  swatchId: z.string().min(1, "Swatch is required"),
  sizeLengthCode: z.string().min(1, "Length code is required"),
  sizeWidthCode: z.number().int().min(1, "Width code is required"),
  quantity: z.number().int().min(1).default(1),
})

export const updateCartItemSchema = z.object({
  swatchId: z.string().min(1, "Swatch is required").optional(),
  sizeLengthCode: z.string().min(1, "Length code is required").optional(),
  sizeWidthCode: z.number().int().min(1, "Width code is required").optional(),
  quantity: z.number().int().min(1).optional(),
})

export type AddCartItemPayload = z.infer<typeof addCartItemSchema>
export type UpdateCartItemPayload = z.infer<typeof updateCartItemSchema>
