"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { startTransition } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { getAuthErrorMessage } from "../auth-error"
import { isSuccessfulAuthStatus } from "../auth.constants"
import {
  forgotPasswordSchema,
  type ForgotPasswordPayload,
} from "../auth.schema"
import { useForgotPassword } from "../usecases/useForgotPassword"

export function ForgotPasswordForm() {
  const router = useRouter()
  const forgotPassword = useForgotPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const handleFormSubmit = async (payload: ForgotPasswordPayload) => {
    try {
      const response = await forgotPassword.mutateAsync(payload)

      if (!isSuccessfulAuthStatus(response.status)) {
        toast.error("We couldn't send the reset link. Please try again.")
        return
      }

      toast.success(
        "Reset link sent! Check your email for password reset instructions."
      )

      startTransition(() => {
        router.push("/signin")
      })
    } catch (error) {
      toast.error(
        getAuthErrorMessage(
          error,
          "We couldn't send the reset link. Please try again."
        )
      )
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4 sm:space-y-5"
    >
      <div>
        <label htmlFor="email" className="field-label mb-1.5 block">
          Email
        </label>
        <input
          id="email"
          {...register("email")}
          type="email"
          autoComplete="email"
          className="field-input"
          placeholder="you@example.com"
          disabled={forgotPassword.isPending}
        />
        {errors.email && (
          <p className="mt-2 text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={forgotPassword.isPending}
      >
        {forgotPassword.isPending ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  )
}
