import { z } from "zod"

export const updateProfileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
})

export const changeEmailSchema = z.object({
  newEmail: z.string().email("Invalid email address"),
})

export const updateAddressSchema = z.object({
  recipientName: z.string().min(1, "Recipient name is required"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  stateRegion: z.string().min(1, "State/region is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal code is required"),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmNewPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
})

export type UpdateProfilePayload = z.infer<typeof updateProfileSchema>
export type ChangeEmailPayload = z.infer<typeof changeEmailSchema>
export type UpdateAddressPayload = z.infer<typeof updateAddressSchema>
export type ChangePasswordPayload = z.infer<typeof changePasswordSchema>
