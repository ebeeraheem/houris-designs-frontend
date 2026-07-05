"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

import { getVerifyEmail } from "../auth.adapter"

type VerificationState = "verifying" | "success" | "invalid"

interface VerifyEmailStatusProps {
  code: string | null
}

export function VerifyEmailStatus({ code }: VerifyEmailStatusProps) {
  const [state, setState] = useState<VerificationState>(
    code ? "verifying" : "invalid"
  )
  const attempted = useRef(false)

  useEffect(() => {
    if (!code || attempted.current) {
      return
    }
    attempted.current = true

    getVerifyEmail(code)
      .then(() => setState("success"))
      .catch(() => setState("invalid"))
  }, [code])

  if (state === "verifying") {
    return (
      <p className="text-center text-[0.85rem] leading-6 text-muted-foreground">
        Verifying your email address…
      </p>
    )
  }

  if (state === "success") {
    return (
      <div className="text-center">
        <p className="text-[0.85rem] leading-6">
          Your email address has been verified. Thank you!
        </p>
        <p className="mt-4 text-[0.78rem] text-muted-foreground">
          <Link href="/couture" className="text-brand hover:underline">
            Continue shopping
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <p className="text-[0.85rem] leading-6">
        This verification link is invalid or has expired.
      </p>
      <p className="mt-4 text-[0.78rem] leading-6 text-muted-foreground">
        Verification is optional — your account works either way. You can keep
        shopping and verify later from a fresh welcome email link.
      </p>
      <p className="mt-4 text-[0.78rem] text-muted-foreground">
        <Link href="/couture" className="text-brand hover:underline">
          Continue shopping
        </Link>
      </p>
    </div>
  )
}
