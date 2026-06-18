import { z } from "zod"

export const contactSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  subject: z
    .string()
    .max(120, "Subject must be 120 characters or fewer")
    .optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  formLoadedAt: z.string().min(1, "Please reload the form and try again"),
  companyWebsite: z.string().optional(),
})

export type ContactPayload = z.infer<typeof contactSchema>
