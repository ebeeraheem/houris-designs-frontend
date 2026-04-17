"use client"

import { Button } from "@/components/ui/button"

export function ForgotPasswordForm() {
  return (
    <form className="space-y-5">
      <div>
        <label htmlFor="email" className="field-label mb-1.5 block">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="field-input"
          placeholder="you@example.com"
        />
      </div>

      <Button type="submit" className="w-full">
        Send Reset Link
      </Button>
    </form>
  )
}
