"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import {
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiLoader4Line,
  RiMailCloseLine,
} from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { ACCOUNT_ROUTES } from "../account.constants"
import { useConfirmEmailChange } from "../usecases/useConfirmEmailChange"

interface ConfirmEmailChangeViewProps {
  code?: string
}

export function ConfirmEmailChangeView({
  code,
}: Readonly<ConfirmEmailChangeViewProps>) {
  const confirm = useConfirmEmailChange()
  const attemptedRef = useRef(false)

  useEffect(() => {
    if (!code || attemptedRef.current) {
      return
    }

    attemptedRef.current = true
    void confirm.mutateAsync(code).catch(() => {
      // Errors are surfaced through the mutation's error state below.
    })
  }, [code, confirm])

  if (!code) {
    return (
      <section data-page-section className="surface-card p-6 sm:p-8">
        <div className="inline-flex rounded-[var(--radius)] bg-destructive/12 p-3 text-destructive">
          <RiMailCloseLine className="size-5" />
        </div>
        <p className="eyebrow-label mt-5 text-brand">Email Change</p>
        <h1 className="mt-3 font-heading text-[1.8rem] leading-[0.92] font-medium tracking-[-0.06em] uppercase sm:text-[2.2rem]">
          This confirmation link is incomplete.
        </h1>
        <p className="mt-4 max-w-[38rem] text-sm leading-7 text-muted-foreground">
          The link is missing its confirmation code. Open the most recent
          confirmation email and use the full link, or request the email change
          again from your account.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button render={<Link href={ACCOUNT_ROUTES.PROFILE} />}>
            Go to your account
          </Button>
          <Button variant="outline" render={<Link href="/signin" />}>
            Sign in
          </Button>
        </div>
      </section>
    )
  }

  if (confirm.isPending || confirm.isIdle) {
    return (
      <section data-page-section className="surface-card p-6 sm:p-8">
        <div className="inline-flex rounded-[var(--radius)] bg-brand/12 p-3 text-brand">
          <RiLoader4Line className="size-5 animate-spin" />
        </div>
        <p className="eyebrow-label mt-5 text-brand">Email Change</p>
        <h1 className="mt-3 font-heading text-[1.8rem] leading-[0.92] font-medium tracking-[-0.06em] uppercase sm:text-[2.2rem]">
          Confirming your new email address.
        </h1>
        <p className="mt-4 max-w-[38rem] text-sm leading-7 text-muted-foreground">
          Hold on a moment while we verify your confirmation link and update
          your account.
        </p>
      </section>
    )
  }

  if (confirm.isError) {
    return (
      <section data-page-section className="surface-card p-6 sm:p-8">
        <div className="inline-flex rounded-[var(--radius)] bg-destructive/12 p-3 text-destructive">
          <RiCloseCircleLine className="size-5" />
        </div>
        <p className="eyebrow-label mt-5 text-brand">Email Change</p>
        <h1 className="mt-3 font-heading text-[1.8rem] leading-[0.92] font-medium tracking-[-0.06em] uppercase sm:text-[2.2rem]">
          This confirmation link is invalid or has expired.
        </h1>
        <p className="mt-4 max-w-[38rem] text-sm leading-7 text-muted-foreground">
          The link may have already been used, or it may have expired for
          security. Start the email change again from your account to receive a
          fresh confirmation link.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button render={<Link href={ACCOUNT_ROUTES.PROFILE} />}>
            Update your email again
          </Button>
          <Button variant="outline" render={<Link href="/signin" />}>
            Sign in
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section data-page-section className="surface-card p-6 sm:p-8">
      <div className="inline-flex rounded-[var(--radius)] bg-success/12 p-3 text-success">
        <RiCheckboxCircleLine className="size-5" />
      </div>
      <p className="eyebrow-label mt-5 text-brand">Email Change</p>
      <h1 className="mt-3 font-heading text-[1.8rem] leading-[0.92] font-medium tracking-[-0.06em] uppercase sm:text-[2.2rem]">
        Email address confirmed.
      </h1>
      <p className="mt-4 max-w-[38rem] text-sm leading-7 text-muted-foreground">
        Your new email address is now active — use it the next time you sign in
        to your Houris Designs account.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button render={<Link href={ACCOUNT_ROUTES.PROFILE} />}>
          Go to your account
        </Button>
        <Button variant="outline" render={<Link href="/signin" />}>
          Sign in
        </Button>
      </div>
    </section>
  )
}
