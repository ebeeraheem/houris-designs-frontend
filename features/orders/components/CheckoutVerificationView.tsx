"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
  RiArrowRightUpLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiLoader4Line,
  RiRefreshLine,
  RiTimeLine,
} from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { CHECKOUT_ROUTES, CHECKOUT_STORAGE_KEYS } from "../checkout.constants"
import { getCheckoutErrorMessage } from "../checkout.error"
import { ORDER_ROUTES } from "../order.constants"
import type { CheckoutVerificationResult } from "../checkout.types"
import { getOrderStatusClasses, getOrderStatusLabel } from "../order.utils"
import { useVerifyCheckout } from "../usecases/useVerifyCheckout"

interface CheckoutVerificationViewProps {
  defaultReference?: string
}

function isTerminalStatus(status: CheckoutVerificationResult["status"]) {
  return status === "NEW" || status === "PAYMENT_FAILED"
}

function getVerificationSummary(result: CheckoutVerificationResult) {
  switch (result.status) {
    case "NEW":
      return {
        title: "Payment confirmed.",
        description: "Your order is in. Taking you to your orders…",
        icon: RiCheckboxCircleLine,
        accentClass: "bg-success/12 text-success",
      }
    case "PAYMENT_FAILED":
      return {
        title: "Payment was not completed.",
        description: "Your cart is unchanged — you can try again.",
        icon: RiCloseCircleLine,
        accentClass: "bg-destructive/12 text-destructive",
      }
    case "PENDING_PAYMENT":
      return {
        title: "Payment is still pending.",
        description: "Retry in a moment.",
        icon: RiTimeLine,
        accentClass: "bg-warning/12 text-warning",
      }
    default:
      return {
        title: "Status not confirmed yet.",
        description: "Retry, or check your order history.",
        icon: RiTimeLine,
        accentClass: "bg-secondary text-foreground/80",
      }
  }
}

export function CheckoutVerificationView({
  defaultReference,
}: CheckoutVerificationViewProps) {
  const router = useRouter()
  const verifyCheckout = useVerifyCheckout()
  const [storedReference] = useState(() => {
    if (typeof window === "undefined") {
      return ""
    }

    return (
      sessionStorage.getItem(CHECKOUT_STORAGE_KEYS.PENDING_REFERENCE)?.trim() ??
      ""
    )
  })
  const resolvedReference = defaultReference?.trim() || storedReference
  const attemptedReferenceRef = useRef<string | null>(null)

  useEffect(() => {
    if (
      !resolvedReference ||
      attemptedReferenceRef.current === resolvedReference
    ) {
      return
    }

    attemptedReferenceRef.current = resolvedReference

    void verifyCheckout.mutateAsync(resolvedReference).finally(() => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(CHECKOUT_STORAGE_KEYS.PENDING_REFERENCE)
      }
    })
  }, [resolvedReference, verifyCheckout])

  useEffect(() => {
    if (verifyCheckout.data?.status !== "NEW") {
      return
    }

    const timeoutId = window.setTimeout(() => {
      router.replace(ORDER_ROUTES.LIST)
    }, 1800)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [router, verifyCheckout.data?.status])

  const handleRetry = () => {
    if (!resolvedReference) {
      return
    }

    verifyCheckout.reset()
    attemptedReferenceRef.current = resolvedReference

    void verifyCheckout.mutateAsync(resolvedReference).finally(() => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(CHECKOUT_STORAGE_KEYS.PENDING_REFERENCE)
      }
    })
  }

  if (!resolvedReference) {
    return (
      <section data-page-section className="surface-card p-6 sm:p-8">
        <h1 className="font-heading text-[1.8rem] leading-[0.92] font-medium tracking-[-0.06em] uppercase sm:text-[2.2rem]">
          No payment reference found.
        </h1>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button render={<Link href={CHECKOUT_ROUTES.PAGE} />}>
            Return to Checkout
          </Button>
          <Button variant="outline" render={<Link href="/account/orders" />}>
            View Order History
          </Button>
        </div>
      </section>
    )
  }

  if (verifyCheckout.isPending) {
    return (
      <section data-page-section className="surface-card p-6 sm:p-8">
        <div className="inline-flex rounded-[var(--radius)] bg-brand/12 p-3 text-brand">
          <RiLoader4Line className="size-5 animate-spin" />
        </div>
        <h1 className="mt-5 font-heading text-[1.8rem] leading-[0.92] font-medium tracking-[-0.06em] uppercase sm:text-[2.2rem]">
          Confirming your payment…
        </h1>
        <div className="mt-6 inline-flex rounded-[var(--radius)] border border-border/70 bg-secondary/45 px-4 py-3 text-[0.78rem] tracking-[0.14em] text-foreground/80 uppercase">
          Reference {resolvedReference}
        </div>
      </section>
    )
  }

  if (verifyCheckout.isError) {
    return (
      <section data-page-section className="surface-card p-6 sm:p-8">
        <div className="inline-flex rounded-[var(--radius)] bg-destructive/12 p-3 text-destructive">
          <RiCloseCircleLine className="size-5" />
        </div>
        <h1 className="mt-5 font-heading text-[1.8rem] leading-[0.92] font-medium tracking-[-0.06em] uppercase sm:text-[2.2rem]">
          We couldn&apos;t verify the payment yet.
        </h1>
        <p className="mt-4 max-w-[38rem] text-sm leading-7 text-muted-foreground">
          {getCheckoutErrorMessage(verifyCheckout.error, "Please retry.")}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={handleRetry}>
            <RiRefreshLine className="size-4" />
            Retry Verification
          </Button>
          <Button variant="outline" render={<Link href="/account/orders" />}>
            View Order History
          </Button>
        </div>
      </section>
    )
  }

  const result = verifyCheckout.data

  if (!result) {
    return null
  }

  const summary = getVerificationSummary(result)
  const SummaryIcon = summary.icon

  return (
    <section data-page-section className="surface-card p-6 sm:p-8">
      <div
        className={`inline-flex rounded-[var(--radius)] p-3 ${summary.accentClass}`}
      >
        <SummaryIcon className="size-5" />
      </div>
      <h1 className="mt-5 font-heading text-[1.8rem] leading-[0.92] font-medium tracking-[-0.06em] uppercase sm:text-[2.2rem]">
        {summary.title}
      </h1>
      <p className="mt-4 max-w-[40rem] text-sm leading-7 text-muted-foreground">
        {summary.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <span
          className={`inline-flex items-center rounded-[var(--radius)] border px-3 py-1 text-[0.68rem] font-medium tracking-[0.14em] uppercase ${getOrderStatusClasses(result.status)}`}
        >
          {getOrderStatusLabel(result.status)}
        </span>
        <span className="status-pill border-border bg-background/80 text-foreground/78">
          Reference {result.reference || resolvedReference}
        </span>
        {result.orderReference ? (
          <span className="status-pill border-border bg-background/80 text-foreground/78">
            Order {result.orderReference}
          </span>
        ) : null}
      </div>

      {result.message ? (
        <div className="mt-6 rounded-[var(--radius)] border border-border/70 bg-secondary/45 p-4">
          <p className="text-[0.82rem] leading-6 text-muted-foreground">
            {result.message}
          </p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {isTerminalStatus(result.status) ? (
          <Button render={<Link href={ORDER_ROUTES.LIST} />}>
            {result.status === "NEW"
              ? "Open Order History"
              : "View Order History"}
          </Button>
        ) : (
          <Button type="button" onClick={handleRetry}>
            <RiRefreshLine className="size-4" />
            Retry Verification
          </Button>
        )}
        {result.status !== "NEW" ? (
          <Button
            variant="outline"
            render={<Link href={CHECKOUT_ROUTES.PAGE} />}
          >
            Return to Checkout
          </Button>
        ) : null}
        <Button variant="outline" render={<Link href="/couture" />}>
          Continue Shopping
          <RiArrowRightUpLine className="size-4" />
        </Button>
      </div>
    </section>
  )
}
