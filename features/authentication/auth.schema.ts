import { z } from "zod"

export const registerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  token: z.string().min(1, "Token is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
})

export type RegisterPayload = z.infer<typeof registerSchema>
export type LoginPayload = z.infer<typeof loginSchema>
export type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>
