import { z } from "zod"
import { shippingAddressSchema } from "./checkout.schema"

// Account rules mirror features/authentication/auth.schema.ts registerSchema —
// min-8 password is the only password requirement for customers.
export const guestCheckoutSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  shippingAddress: shippingAddressSchema,
})

export type GuestCheckoutPayload = z.infer<typeof guestCheckoutSchema>
