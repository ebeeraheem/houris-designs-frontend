"use client"

import { useState } from "react"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/password-input"
import { getAuthErrorMessage } from "@/features/authentication/auth-error"
import { isSuccessfulAuthStatus } from "@/features/authentication/auth.constants"
import { useLogin } from "@/features/authentication/usecases/useLogin"

interface CheckoutSignInProps {
  email: string
  onSignedIn: () => Promise<void> | void
  onUseDifferentEmail: () => void
}

/**
 * Inline sign-in step shown when guest checkout hits an already-registered
 * email. Deliberately not SignInForm — that component hard-navigates away on
 * success, and here the customer must stay on the checkout page.
 */
export function CheckoutSignIn({
  email,
  onSignedIn,
  onUseDifferentEmail,
}: CheckoutSignInProps) {
  const login = useLogin()
  const [password, setPassword] = useState("")
  const [isCompleting, setIsCompleting] = useState(false)

  const isBusy = login.isPending || isCompleting

  const handleSignIn = async () => {
    if (!password) {
      toast.error("Enter your password to sign in.")
      return
    }

    try {
      const response = await login.mutateAsync({ email, password })

      if (!isSuccessfulAuthStatus(response.status)) {
        toast.error("We couldn't sign you in. Please try again.")
        return
      }

      setIsCompleting(true)
      await onSignedIn()
    } catch (error) {
      toast.error(
        getAuthErrorMessage(error, "We couldn't sign you in. Please try again.")
      )
    } finally {
      setIsCompleting(false)
    }
  }

  return (
    <div className="mt-6 rounded-[var(--radius)] border border-brand/30 bg-brand/5 p-4 sm:p-5">
      <p className="text-[0.84rem] leading-6">
        An account with <span className="font-medium">{email}</span> already
        exists. Sign in to continue checkout with your cart.
      </p>

      <div className="mt-4">
        <label
          htmlFor="checkout-signin-password"
          className="mb-2 block text-[0.72rem] font-medium tracking-[0.14em] text-foreground uppercase"
        >
          Password
        </label>
        <PasswordInput
          id="checkout-signin-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          className="bg-card"
          placeholder="Enter your password"
          disabled={isBusy}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button
          type="button"
          onClick={() => {
            void handleSignIn()
          }}
          disabled={isBusy}
        >
          {isBusy ? "Signing In..." : "Sign In & Continue"}
        </Button>
        <button
          type="button"
          onClick={onUseDifferentEmail}
          className="text-[0.78rem] font-medium text-brand hover:underline"
          disabled={isBusy}
        >
          Use a different email
        </button>
      </div>

      <p className="mt-3 text-[0.74rem] leading-6 text-muted-foreground">
        Forgot your password?{" "}
        <a href="/forgot-password" className="text-brand hover:underline">
          Reset it here
        </a>{" "}
        and come back to your cart — it will be waiting.
      </p>
    </div>
  )
}
