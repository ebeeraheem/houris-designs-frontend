import { z } from "zod"

export const shippingAddressSchema = z.object({
  recipientName: z.string().min(1, "Recipient name is required"),
  line1: z.string().min(1, "Address line 1 is required"),
  line2: z.string().nullable().optional(),
  city: z.string().min(1, "City is required"),
  stateOrRegion: z.string().min(1, "State/Region is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal code is required"),
})

export const checkoutSchema = z
  .object({
    useSavedAddress: z.boolean(),
    shippingAddress: shippingAddressSchema.nullable(),
  })
  .superRefine((data, ctx) => {
    if (!data.useSavedAddress && !data.shippingAddress) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Shipping address is required",
        path: ["shippingAddress"],
      })
    }
  })

export type ShippingAddressPayload = z.infer<typeof shippingAddressSchema>
export type CheckoutPayload = z.infer<typeof checkoutSchema>
