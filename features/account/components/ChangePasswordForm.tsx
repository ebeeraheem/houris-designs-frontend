"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RiShieldCheckLine } from "@remixicon/react"

const passwordPrinciples = [
  {
    title: "Make it longer",
    description:
      "Use at least 8 characters, or go even longer for a safer key.",
  },
  {
    title: "Mix the details",
    description: "Blend upper and lower case letters with numbers or symbols.",
  },
  {
    title: "Keep it unique",
    description: "Choose a password you do not reuse for any other account.",
  },
]

export function ChangePasswordForm() {
  return (
    <form className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
      <div className="rounded-[var(--radius)] border border-border/70 bg-background/85 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-4">
        <label
          htmlFor="currentPassword"
          className="field-label mb-2 block sm:mb-3"
        >
          Current Password
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          className="field-input bg-card"
          placeholder="Enter current password"
        />
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <div className="rounded-[var(--radius)] border border-border/70 bg-background/85 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-4">
          <label
            htmlFor="newPassword"
            className="field-label mb-2 block sm:mb-3"
          >
            New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            required
            className="field-input bg-card"
            placeholder="Create new password"
          />
        </div>

        <div className="rounded-[var(--radius)] border border-border/70 bg-background/85 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-4">
          <label
            htmlFor="confirmPassword"
            className="field-label mb-2 block sm:mb-3"
          >
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            className="field-input bg-card"
            placeholder="Confirm new password"
          />
        </div>
      </div>

      <div className="rounded-[var(--radius)] border border-border/70 bg-secondary/70 p-3 sm:p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-brand/12 p-2 text-brand">
            <RiShieldCheckLine className="size-4" />
          </div>
          <div>
            <p className="eyebrow-label text-brand">Password Checklist</p>
            <p className="mt-2 max-w-[34rem] text-[0.8rem] leading-6 text-muted-foreground">
              Make the next password stronger and easier to keep unique with a
              few simple principles.
            </p>
          </div>
        </div>

        <div className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-3 sm:gap-3">
          {passwordPrinciples.map(({ title, description }) => (
            <div
              key={title}
              className="rounded-[var(--radius)] border border-border/70 bg-background/75 p-3"
            >
              <p className="text-[0.74rem] font-medium tracking-[0.14em] text-foreground uppercase">
                {title}
              </p>
              <p className="mt-2 text-[0.78rem] leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row">
        <Link
          href="/account"
          className="inline-flex h-12 flex-1 shrink-0 items-center justify-center rounded-[var(--radius)] border border-border bg-background px-6 text-center text-[0.68rem] font-medium tracking-[0.22em] whitespace-nowrap text-foreground uppercase transition-all duration-200 outline-none select-none hover:border-foreground/35 hover:bg-secondary focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          Cancel
        </Link>
        <Button type="submit" size="lg" className="flex-1">
          Update Password
        </Button>
      </div>
    </form>
  )
}
