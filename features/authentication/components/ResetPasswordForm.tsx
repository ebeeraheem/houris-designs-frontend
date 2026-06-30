"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { startTransition } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/password-input"
import { getAuthErrorMessage } from "../auth-error"
import { isSuccessfulAuthStatus } from "../auth.constants"
import { resetPasswordSchema, type ResetPasswordPayload } from "../auth.schema"
import { useResetPassword } from "../usecases/useResetPassword"

interface ResetPasswordFormProps {
  defaultEmail?: string
  defaultToken?: string
}

export function ResetPasswordForm({
  defaultEmail,
  defaultToken,
}: ResetPasswordFormProps) {
  const router = useRouter()
  const resetPassword = useResetPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordPayload>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: defaultEmail ?? "",
      token: defaultToken ?? "",
      newPassword: "",
    },
  })

  const handleFormSubmit = async (payload: ResetPasswordPayload) => {
    try {
      const response = await resetPassword.mutateAsync(payload)

      if (!isSuccessfulAuthStatus(response.status)) {
        toast.error("We couldn't reset your password. Please try again.")
        return
      }

      startTransition(() => {
        router.push("/signin")
      })
    } catch (error) {
      toast.error(
        getAuthErrorMessage(
          error,
          "We couldn't reset your password. Please try again."
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
          disabled={resetPassword.isPending}
        />
        {errors.email && (
          <p className="mt-2 text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="token" className="field-label mb-1.5 block">
          Reset Token
        </label>
        <input
          id="token"
          {...register("token")}
          type="text"
          className="field-input"
          placeholder="Paste your reset token"
          disabled={resetPassword.isPending}
        />
        {errors.token && (
          <p className="mt-2 text-xs text-destructive">
            {errors.token.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="newPassword" className="field-label mb-1.5 block">
          New Password
        </label>
        <PasswordInput
          id="newPassword"
          {...register("newPassword")}
          autoComplete="new-password"
          placeholder="Create a new password"
          disabled={resetPassword.isPending}
        />
        {errors.newPassword && (
          <p className="mt-2 text-xs text-destructive">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={resetPassword.isPending}
      >
        {resetPassword.isPending ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  )
}
