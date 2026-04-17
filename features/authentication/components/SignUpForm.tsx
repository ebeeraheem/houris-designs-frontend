"use client"

import { Button } from "@/components/ui/button"

export function SignUpForm() {
  return (
    <form className="mt-8 space-y-5">
      <div className="rounded-[1.25rem] border border-border/70 bg-background/85 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-5">
        <label htmlFor="fullName" className="field-label mb-3 block">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          required
          className="field-input bg-card"
          placeholder="Your full name"
        />
      </div>

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
          autoComplete="new-password"
          required
          className="field-input bg-card"
          placeholder="Create a password"
        />
        <p className="mt-2 text-[0.72rem] leading-6 text-muted-foreground">
          Choose at least 8 characters so the account matches the live password
          rules.
        </p>
      </div>

      <Button type="submit" size="lg" className="w-full">
        Create Account
      </Button>
    </form>
  )
}
