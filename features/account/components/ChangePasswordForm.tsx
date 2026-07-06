"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/password-input"
import { useChangePassword } from "../usecases/useChangePassword"
import {
  changePasswordSchema,
  type ChangePasswordPayload,
} from "../account.schema"

export function ChangePasswordForm() {
  const router = useRouter()
  const changePassword = useChangePassword()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordPayload>({
    resolver: zodResolver(changePasswordSchema),
  })

  const onSubmit = async (data: ChangePasswordPayload) => {
    try {
      await changePassword.mutateAsync(data)
      reset()
      router.push("/account")
    } catch {
      toast.error("We couldn't update your password. Please try again.")
    }
  }

  const isSubmitting = changePassword.isPending

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 space-y-4 sm:mt-8 sm:space-y-5"
    >
      <div className="rounded-[var(--radius)] border border-border/70 bg-background/85 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-4">
        <label
          htmlFor="currentPassword"
          className="field-label mb-2 block sm:mb-3"
        >
          Current Password
        </label>
        <PasswordInput
          id="currentPassword"
          autoComplete="current-password"
          className="bg-card"
          placeholder="Enter current password"
          disabled={isSubmitting}
          {...register("currentPassword")}
        />
        {errors.currentPassword ? (
          <p className="mt-2 text-[0.76rem] text-destructive">
            {errors.currentPassword.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:gap-5">
        <div className="rounded-[var(--radius)] border border-border/70 bg-background/85 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-4">
          <label
            htmlFor="newPassword"
            className="field-label mb-2 block sm:mb-3"
          >
            New Password
          </label>
          <PasswordInput
            id="newPassword"
            autoComplete="new-password"
            className="bg-card"
            placeholder="Create new password"
            disabled={isSubmitting}
            {...register("newPassword")}
          />
          {errors.newPassword ? (
            <p className="mt-2 text-[0.76rem] text-destructive">
              {errors.newPassword.message}
            </p>
          ) : null}
        </div>

        <div className="rounded-[var(--radius)] border border-border/70 bg-background/85 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-4">
          <label
            htmlFor="confirmNewPassword"
            className="field-label mb-2 block sm:mb-3"
          >
            Confirm New Password
          </label>
          <PasswordInput
            id="confirmNewPassword"
            autoComplete="new-password"
            className="bg-card"
            placeholder="Confirm new password"
            disabled={isSubmitting}
            {...register("confirmNewPassword")}
          />
          {errors.confirmNewPassword ? (
            <p className="mt-2 text-[0.76rem] text-destructive">
              {errors.confirmNewPassword.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row">
        <Link
          href="/account"
          className="inline-flex h-12 flex-1 shrink-0 items-center justify-center rounded-[var(--radius)] border border-border bg-background px-6 text-center text-[0.68rem] font-medium tracking-[0.22em] whitespace-nowrap text-foreground uppercase transition-all duration-200 outline-none select-none hover:border-foreground/35 hover:bg-secondary focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          Cancel
        </Link>
        <Button
          type="submit"
          size="lg"
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </form>
  )
}
