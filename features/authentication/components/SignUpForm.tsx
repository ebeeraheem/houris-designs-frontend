"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { startTransition } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { PRODUCT_ROUTES } from "@/features/products"
import { getAuthErrorMessage } from "../auth-error"
import { AUTH_SUCCESS_STATUS } from "../auth.constants"
import { registerSchema, type RegisterPayload } from "../auth.schema"
import { useRegister } from "../usecases/useRegister"

export function SignUpForm() {
  const router = useRouter()
  const registerAccount = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  })

  const handleFormSubmit = async (payload: RegisterPayload) => {
    try {
      const response = await registerAccount.mutateAsync(payload)

      if (response.status !== AUTH_SUCCESS_STATUS) {
        toast.error("We couldn't create your account. Please try again.")
        return
      }

      toast.success(
        "Your account has been created. Redirecting to the collection."
      )

      startTransition(() => {
        router.replace(PRODUCT_ROUTES.LIST)
      })
    } catch (error) {
      toast.error(
        getAuthErrorMessage(
          error,
          "We couldn't create your account. Please try again."
        )
      )
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mt-6 space-y-4 sm:mt-8 sm:space-y-5"
    >
      <div className="rounded-[var(--radius)] border border-border/70 bg-background/85 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-4">
        <label htmlFor="fullName" className="field-label mb-2 block sm:mb-3">
          Full Name
        </label>
        <input
          id="fullName"
          {...register("fullName")}
          type="text"
          autoComplete="name"
          className="field-input bg-card"
          placeholder="Your full name"
          disabled={registerAccount.isPending}
        />
        {errors.fullName && (
          <p className="mt-2 text-xs text-destructive">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div className="rounded-[var(--radius)] border border-border/70 bg-background/85 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-4">
        <label htmlFor="email" className="field-label mb-2 block sm:mb-3">
          Email
        </label>
        <input
          id="email"
          {...register("email")}
          type="email"
          autoComplete="email"
          className="field-input bg-card"
          placeholder="you@example.com"
          disabled={registerAccount.isPending}
        />
        {errors.email && (
          <p className="mt-2 text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="rounded-[var(--radius)] border border-border/70 bg-background/85 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-4">
        <label htmlFor="password" className="field-label mb-2 block sm:mb-3">
          Password
        </label>
        <input
          id="password"
          {...register("password")}
          type="password"
          autoComplete="new-password"
          className="field-input bg-card"
          placeholder="Create a password"
          disabled={registerAccount.isPending}
        />
        <p className="mt-2 text-[0.72rem] leading-6 text-muted-foreground">
          Choose at least 8 characters so the account matches the live password
          rules.
        </p>
        {errors.password && (
          <p className="mt-2 text-xs text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={registerAccount.isPending}
      >
        {registerAccount.isPending ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  )
}
