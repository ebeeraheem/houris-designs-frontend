"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
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
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
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
                    isCartNavigationItem(item) &&
                      "inline-flex items-center gap-1.5"
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

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger className="inline-flex h-10 items-center gap-2 rounded-[var(--radius)] border border-border/70 bg-background/90 px-4 text-[0.68rem] font-semibold tracking-[0.22em] text-foreground uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] md:hidden">
              {menuOpen ? (
                <RiCloseLine className="size-4" />
              ) : (
                <RiMenuLine className="size-4" />
              )}
              Menu
            </SheetTrigger>

            <SheetPortal>
              <SheetOverlay className="md:hidden" />
              <SheetContent
                side="right"
                className="w-[88vw] max-w-[24rem] md:hidden"
              >
                <div className="relative overflow-hidden border-b border-border/70 px-4 py-4 sm:px-6 sm:py-5">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-28 bg-linear-to-br from-brand/14 via-brand/5 to-transparent"
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow-label text-brand">Navigate</p>
                      <SheetTitle className="sr-only">Menu</SheetTitle>
                      <SheetDescription className="mt-3 max-w-[18rem] text-[0.82rem] leading-6">
                        Explore the collection, manage your account, or move
                        into a faster client flow from one cleaner side sheet.
                      </SheetDescription>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="rounded-[var(--radius)] bg-brand/10 p-2 text-brand">
                        <RiSparkling2Line className="size-4" />
                      </div>
                      <SheetClose
                        aria-label="Close mobile menu"
                        className="size-10"
                      >
                        <RiCloseLine className="size-4" />
                      </SheetClose>
                    </div>
                  </div>
                </div>

                <SheetBody className="px-4 py-4 sm:px-6 sm:py-5">
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
                </SheetBody>
              </SheetContent>
            </SheetPortal>
          </Sheet>
        </div>
      </header>
    </>
  )
}
