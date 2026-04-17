"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  RiArrowRightUpLine,
  RiCloseLine,
  RiMenuLine,
  RiSparkling2Line,
} from "@remixicon/react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/utils/cn"

const navigation = [
  { label: "Collection", href: "/collection" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Account", href: "/account" },
  { label: "Cart", href: "/cart" },
]

const authLinks = [
  { label: "Sign In", href: "/signin", variant: "outline" as const },
  { label: "Sign Up", href: "/signup", variant: "default" as const },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleEscape)
    }
  }, [menuOpen])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-384 items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.26em] uppercase"
            >
              <span className="size-1.5 rounded-full bg-brand" />
              Houris Designs
            </Link>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:gap-x-7">
              {navigation.map((item) => (
                <Link key={item.label} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/85 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
              {authLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: item.variant, size: "sm" }),
                    "rounded-full px-4"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border/70 bg-background/90 px-4 text-[0.68rem] font-semibold tracking-[0.22em] text-foreground uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <RiCloseLine className="size-4" />
            ) : (
              <RiMenuLine className="size-4" />
            )}
            Menu
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-70 transition-opacity duration-300 md:hidden",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-[#1f1712]/42 backdrop-blur-[2px]"
          aria-label="Close mobile menu"
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={cn(
            "absolute inset-y-0 right-0 flex h-full w-[88vw] max-w-[24rem] flex-col border-l border-border/70 bg-background/97 shadow-[0_28px_80px_rgba(24,18,14,0.24)] transition-transform duration-300 ease-out",
            menuOpen ? "translate-x-0" : "translate-x-[105%]"
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <div className="relative overflow-hidden border-b border-border/70 px-5 py-5 sm:px-6">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-28 bg-linear-to-br from-brand/14 via-brand/5 to-transparent"
            />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow-label text-brand">Navigate</p>
                <p
                  id="mobile-menu-title"
                  className="mt-3 max-w-[18rem] text-[0.82rem] leading-6 text-muted-foreground"
                >
                  Explore the collection, manage your account, or move into a
                  faster client flow from one cleaner side sheet.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-full bg-brand/10 p-2 text-brand">
                  <RiSparkling2Line className="size-4" />
                </div>
                <button
                  type="button"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-background/90 text-muted-foreground transition hover:border-foreground/20 hover:text-foreground"
                  aria-label="Close mobile menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <RiCloseLine className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
            <nav className="grid gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-[1rem] border border-border/70 bg-background/80 px-4 py-3.5 transition hover:border-brand/25 hover:bg-background"
                  onClick={() => setMenuOpen(false)}
                >
                  <div>
                    <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-foreground uppercase">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[0.74rem] leading-5 text-muted-foreground">
                      {item.label === "Collection" &&
                        "Browse the latest silhouettes and tailored pieces."}
                      {item.label === "Size Guide" &&
                        "Review the two-dimensional size system."}
                      {item.label === "Account" &&
                        "View orders, saved details, and account settings."}
                      {item.label === "Cart" &&
                        "Review selected pieces before checkout."}
                    </p>
                  </div>
                  <RiArrowRightUpLine className="size-4 text-brand" />
                </Link>
              ))}
            </nav>

            <div className="mt-5 rounded-[1.1rem] border border-border/70 bg-secondary/60 p-4">
              <p className="eyebrow-label text-brand">Client Access</p>
              <div className="mt-4 grid gap-2">
                {authLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      buttonVariants({
                        variant: item.variant,
                        size: "default",
                      }),
                      "w-full"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[1.1rem] border border-border/70 bg-background/75 p-4">
              <p className="eyebrow-label text-brand">Brand Note</p>
              <p className="mt-3 text-[0.8rem] leading-6 text-muted-foreground">
                Houris Designs brings collection browsing, account access, and
                checkout touchpoints into one more refined mobile flow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
