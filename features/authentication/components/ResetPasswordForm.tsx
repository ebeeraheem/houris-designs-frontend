"use client"

import { Button } from "@/components/ui/button"

interface ResetPasswordFormProps {
  defaultEmail?: string
  defaultToken?: string
}

export function ResetPasswordForm({
  defaultEmail,
  defaultToken,
}: ResetPasswordFormProps) {
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
          defaultValue={defaultEmail ?? ""}
          className="field-input"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="token" className="field-label mb-1.5 block">
          Reset Token
        </label>
        <input
          id="token"
          name="token"
          type="text"
          required
          defaultValue={defaultToken ?? ""}
          className="field-input"
          placeholder="Paste your reset token"
        />
      </div>

      <div>
        <label htmlFor="newPassword" className="field-label mb-1.5 block">
          New Password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          className="field-input"
          placeholder="Create a new password"
        />
      </div>

      <Button type="submit" className="w-full">
        Reset Password
      </Button>
    </form>
  )
}
