"use client"

import { Button } from "@/components/ui/button"
import { RiCheckLine } from "@remixicon/react"

export function SignInForm() {
  return (
    <form className="mt-8 space-y-5">
      <div className="rounded-[1.25rem] border border-border/70 bg-background/85 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-5">
        <label htmlFor="email" className="field-label mb-3 block">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="field-input bg-card"
          placeholder="you@example.com"
        />
      </div>

      <div className="rounded-[1.25rem] border border-border/70 bg-background/85 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-5">
        <label htmlFor="password" className="field-label mb-3 block">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="field-input bg-card"
          placeholder="Enter your password"
        />
      </div>

      <div className="rounded-[1.25rem] border border-border/70 bg-secondary/70 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label
            htmlFor="remember-me"
            className="group inline-flex cursor-pointer items-center gap-3 rounded-full border border-border/70 bg-background/80 px-3 py-2.5 transition hover:border-brand/30 hover:bg-background"
          >
            <input
              id="remember-me"
              name="rememberMe"
              type="checkbox"
              className="peer sr-only"
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

      <Button type="submit" size="lg" className="w-full">
        Sign In
      </Button>
    </form>
  )
}
