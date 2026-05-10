"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { RiCheckLine } from "@remixicon/react"
import { useRouter } from "next/navigation"
import { startTransition } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { PRODUCT_ROUTES } from "@/features/products"
import { getAuthErrorMessage } from "../auth-error"
import { AUTH_SUCCESS_STATUS } from "../auth.constants"
import { loginSchema, type LoginPayload } from "../auth.schema"
import { useLogin } from "../usecases/useLogin"

export function SignInForm() {
  const router = useRouter()
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

      if (response.status !== AUTH_SUCCESS_STATUS) {
        toast.error("We couldn't sign you in. Please try again.")
        return
      }

      toast.success("Sign-in successful. Redirecting to the collection.")

      startTransition(() => {
        router.replace(PRODUCT_ROUTES.LIST)
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
        <input
          id="password"
          {...register("password")}
          type="password"
          autoComplete="current-password"
          className="field-input bg-card"
          placeholder="Enter your password"
          disabled={login.isPending}
        />
        {errors.password && (
          <p className="mt-2 text-xs text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="rounded-[var(--radius)] border border-border/70 bg-secondary/70 p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label
            htmlFor="remember-me"
            className="group inline-flex cursor-pointer items-center gap-3 rounded-[var(--radius)] border border-border/70 bg-background/80 px-3 py-2.5 transition hover:border-brand/30 hover:bg-background"
          >
            <input
              id="remember-me"
              name="rememberMe"
              type="checkbox"
              className="peer sr-only"
              disabled={login.isPending}
            />
            <span className="flex size-5 items-center justify-center rounded-full border border-border bg-background shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:ring-2 peer-focus-visible:ring-brand/30 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background">
              <RiCheckLine className="size-3 text-white opacity-0 transition peer-checked:opacity-100" />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.68rem] font-medium tracking-[0.18em] text-foreground uppercase">
                Keep me signed in
              </span>
              <span className="block text-[0.74rem] leading-5 text-muted-foreground">
                Save this device for a faster return.
              </span>
            </span>
          </label>
          <a
            href="/forgot-password"
            className="text-[0.74rem] font-medium text-brand hover:underline"
          >
            Forgot password?
          </a>
        </div>
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
