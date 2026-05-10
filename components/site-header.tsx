"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  RiArrowRightUpLine,
  RiCloseLine,
  RiLogoutBoxRLine,
  RiMenuLine,
  RiSparkling2Line,
  RiUserLine,
} from "@remixicon/react"

import { EmptyCartIcon } from "@/components/icons"
import { ACCOUNT_ROUTES } from "@/features/account/account.constants"
import { AUTH_ROUTES } from "@/features/authentication/auth.constants"
import { useLogoutAction } from "@/features/authentication/usecases/useLogoutAction"
import { useAuthSession } from "@/features/authentication/usecases/useAuthProfile"
import { useGetCart } from "@/features/cart"
import { PRODUCT_ROUTES } from "@/features/products"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/utils/cn"

const baseNavigation = [
  { label: "Collection", href: PRODUCT_ROUTES.LIST },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Cart", href: "/cart" },
] as const

const authLinks = [
  { label: "Sign In", href: AUTH_ROUTES.LOGIN, variant: "outline" as const },
  {
    label: "Sign Up",
    href: AUTH_ROUTES.REGISTER,
    variant: "default" as const,
  },
] as const

function isCartNavigationItem(
  item: (typeof baseNavigation)[number]
): item is (typeof baseNavigation)[number] & { label: "Cart" } {
  return item.label === "Cart"
}

export function SiteHeader() {
  const { data: session, isLoading: isAuthLoading } = useAuthSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const { handleLogout, isPending: isLogoutPending } = useLogoutAction({
    onSuccess: () => setMenuOpen(false),
  })
  const isAuthenticated = Boolean(session?.isAuthenticated)
  const profile = session?.profile ?? null
  const { data: cart } = useGetCart({
    enabled: !isAuthLoading && isAuthenticated,
  })
  const cartCount = isAuthenticated
    ? (cart?.items ?? []).reduce((sum, item) => sum + item.quantity, 0)
    : 0

  const navigation = baseNavigation

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
        <div className="mx-auto flex max-w-384 items-center justify-between gap-4 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.26em] uppercase"
            >
              <Image
                src="/favicon-32x32.png"
                alt="Houris Designs Logo"
                width={16}
                height={16}
                className="size-4"
              />
              Houris Designs
            </Link>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:gap-x-7">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "nav-link",
                    isCartNavigationItem(item) && "inline-flex items-center gap-1.5"
                  )}
                >
                  {isCartNavigationItem(item) ? (
                    <>
                      <EmptyCartIcon className="size-3.5" aria-hidden="true" />
                      <span>{`Cart(${cartCount})`}</span>
                    </>
                  ) : (
                    item.label
                  )}
                </Link>
              ))}
            </nav>

            {isAuthLoading ? (
              <div className="flex items-center gap-2 rounded-[var(--radius)] border border-border/70 bg-background/85 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                <span className="rounded-[var(--radius)] px-4 py-2 text-[0.68rem] font-medium tracking-[0.22em] text-muted-foreground uppercase">
                  Checking Session
                </span>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center gap-2 rounded-[var(--radius)] border border-border/70 bg-background/85 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                <Link
                  href={ACCOUNT_ROUTES.PROFILE}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "rounded-[var(--radius)] px-4"
                  )}
                >
                  Account
                </Link>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-[var(--radius)] px-4"
                  onClick={() => {
                    void handleLogout()
                  }}
                  disabled={isLogoutPending}
                >
                  {isLogoutPending ? "Signing Out..." : "Sign Out"}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-[var(--radius)] border border-border/70 bg-background/85 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                {authLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: item.variant, size: "sm" }),
                      "rounded-[var(--radius)] px-4"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-[var(--radius)] border border-border/70 bg-background/90 px-4 text-[0.68rem] font-semibold tracking-[0.22em] text-foreground uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] md:hidden"
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
          <div className="relative overflow-hidden border-b border-border/70 px-4 py-4 sm:px-6 sm:py-5">
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
                <div className="rounded-[var(--radius)] bg-brand/10 p-2 text-brand">
                  <RiSparkling2Line className="size-4" />
                </div>
                <button
                  type="button"
                  className="inline-flex size-10 items-center justify-center rounded-[var(--radius)] border border-border/70 bg-background/90 text-muted-foreground transition hover:border-foreground/20 hover:text-foreground"
                  aria-label="Close mobile menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <RiCloseLine className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
            <nav className="grid gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-[var(--radius)] border border-border/70 bg-background/80 px-4 py-3.5 transition hover:border-brand/25 hover:bg-background"
                  onClick={() => setMenuOpen(false)}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      {isCartNavigationItem(item) ? (
                        <EmptyCartIcon
                          className="size-4 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                      ) : null}
                      <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-foreground uppercase">
                        {isCartNavigationItem(item)
                          ? `Cart(${cartCount})`
                          : item.label}
                      </p>
                    </div>
                    <p className="mt-1 text-[0.74rem] leading-5 text-muted-foreground">
                      {item.label === "Collection" &&
                        "Browse the latest silhouettes and tailored pieces."}
                      {item.label === "Size Guide" &&
                        "Review the two-dimensional size system."}
                      {item.label === "Cart" &&
                        "Review selected pieces before checkout."}
                    </p>
                  </div>
                  <RiArrowRightUpLine className="size-4 text-brand" />
                </Link>
              ))}
            </nav>

            <div className="mt-5 rounded-[var(--radius)] border border-border/70 bg-secondary/60 p-4">
              <p className="eyebrow-label text-brand">Client Access</p>
              {isAuthLoading ? (
                <p className="mt-4 text-[0.8rem] leading-6 text-muted-foreground">
                  Checking your session...
                </p>
              ) : isAuthenticated ? (
                <div className="mt-4 grid gap-2">
                  <Link
                    href={ACCOUNT_ROUTES.PROFILE}
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "default",
                      }),
                      "w-full"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    <RiUserLine className="size-4" />
                    Account
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      void handleLogout()
                    }}
                    disabled={isLogoutPending}
                  >
                    <RiLogoutBoxRLine className="size-4" />
                    {isLogoutPending ? "Signing Out..." : "Sign Out"}
                  </Button>
                </div>
              ) : (
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
              )}
            </div>

            <div className="mt-5 rounded-[var(--radius)] border border-border/70 bg-background/75 p-4">
              <p className="eyebrow-label text-brand">Brand Note</p>
              <p className="mt-3 text-[0.8rem] leading-6 text-muted-foreground">
                {profile
                  ? `${profile.fullName}, your collection, account, and checkout flow are ready.`
                  : isAuthenticated
                    ? "Your collection, account, and checkout flow are ready."
                    : "Houris Designs brings collection browsing, account access, and checkout touchpoints into one more refined mobile flow."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
