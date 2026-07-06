"use client"

import Link from "next/link"
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
  code?: string
}

export function ResetPasswordForm({ code }: ResetPasswordFormProps) {
  const router = useRouter()
  const resetPassword = useResetPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordPayload>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: code ?? "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  if (!code) {
    return (
      <p className="text-center text-[0.85rem] leading-6">
        This reset link is invalid or has expired.{" "}
        <Link href="/forgot-password" className="text-brand hover:underline">
          Request a new one
        </Link>
        .
      </p>
    )
  }

  const handleFormSubmit = async (payload: ResetPasswordPayload) => {
    try {
      const response = await resetPassword.mutateAsync(payload)

      if (!isSuccessfulAuthStatus(response.status)) {
        toast.error("We couldn't reset your password. Please try again.")
        return
      }

      toast.success("Password reset. Sign in with your new password.")

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
      <input type="hidden" {...register("code")} />

      <div>
        <label htmlFor="newPassword" className="field-label mb-1.5 block">
          New Password
        </label>
        <PasswordInput
          id="newPassword"
          {...register("newPassword")}
          autoComplete="new-password"
          placeholder="At least 8 characters"
          disabled={resetPassword.isPending}
        />
        {errors.newPassword && (
          <p className="mt-2 text-xs text-destructive">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="field-label mb-1.5 block">
          Confirm Password
        </label>
        <PasswordInput
          id="confirmPassword"
          {...register("confirmPassword")}
          autoComplete="new-password"
          placeholder="Re-enter your new password"
          disabled={resetPassword.isPending}
        />
        {errors.confirmPassword && (
          <p className="mt-2 text-xs text-destructive">
            {errors.confirmPassword.message}
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
