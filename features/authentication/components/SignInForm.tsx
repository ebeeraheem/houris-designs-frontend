"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { startTransition } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/password-input"
import { syncGuestCartToServer } from "@/features/cart/guest/syncGuestCart"
import { PRODUCT_ROUTES } from "@/features/products"
import { getAuthErrorMessage } from "../auth-error"
import { isSuccessfulAuthStatus } from "../auth.constants"
import { loginSchema, type LoginPayload } from "../auth.schema"
import { useLogin } from "../usecases/useLogin"

interface SignInFormProps {
  returnUrl?: string
}

export function SignInForm({ returnUrl }: Readonly<SignInFormProps>) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const login = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleFormSubmit = async (payload: LoginPayload) => {
    try {
      const response = await login.mutateAsync(payload)

      if (!isSuccessfulAuthStatus(response.status)) {
        toast.error("We couldn't sign you in. Please try again.")
        return
      }

      // Carry any guest cart items into the customer's server cart.
      await syncGuestCartToServer(queryClient)

      startTransition(() => {
        router.replace(returnUrl ?? PRODUCT_ROUTES.LIST)
      })
    } catch (error) {
      toast.error(
        getAuthErrorMessage(error, "We couldn't sign you in. Please try again.")
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
          disabled={login.isPending}
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
        <PasswordInput
          id="password"
          {...register("password")}
          autoComplete="current-password"
          className="bg-card"
          placeholder="Enter your password"
          disabled={login.isPending}
        />
        {errors.password && (
          <p className="mt-2 text-xs text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <a
          href="/forgot-password"
          className="text-[0.74rem] font-medium text-brand hover:underline"
        >
          Forgot password?
        </a>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={login.isPending}
      >
        {login.isPending ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  )
}
