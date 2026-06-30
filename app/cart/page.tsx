"use client"

import toast from "react-hot-toast"

import { EmptyCartIcon } from "@/components/icons"
import { BackIconLink } from "@/components/ui/back-icon-link"
import { EmptyState } from "@/components/ui/empty-state"
import { PageReveal } from "@/components/page-reveal"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  useClearCart,
  useGetCart,
  useRemoveCartItem,
  useUpdateCartItem,
} from "@/features/cart"
import { CartItem, CartSummary } from "@/features/cart/components"

export default function CartPage() {
  const { data: cart, isLoading, isError, refetch } = useGetCart()
  const updateCartItem = useUpdateCartItem()
  const removeCartItem = useRemoveCartItem()
  const clearCart = useClearCart()

  const items = cart?.items ?? []
  const total = cart?.total ?? 0
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleUpdateQuantity = async (
    item: (typeof items)[number],
    quantity: number
  ) => {
    if (!item.id) {
      toast.error("This cart item is missing an ID from the API.")
      return
    }

    if (!item.swatchId || !item.sizeLengthCode || item.sizeWidthCode === null) {
      toast.error("This cart item is missing size or swatch data from the API.")
      return
    }

    try {
      await updateCartItem.mutateAsync({
        itemId: item.id,
        payload: {
          swatchId: item.swatchId,
          sizeLengthCode: item.sizeLengthCode,
          sizeWidthCode: item.sizeWidthCode,
          quantity,
        },
      })
    } catch {
      toast.error("We couldn't update this cart item. Please try again.")
    }
  }

  const handleRemoveItem = async (itemId: string | null) => {
    if (!itemId) {
      toast.error("This cart item is missing an ID from the API.")
      return
    }

    try {
      await removeCartItem.mutateAsync(itemId)
      toast.success("Item removed from cart.")
    } catch {
      toast.error("We couldn't remove this cart item. Please try again.")
    }
  }

  const handleClearCart = async () => {
    try {
      await clearCart.mutateAsync()
      toast.success("Cart cleared.")
    } catch {
      toast.error("We couldn't clear your cart. Please try again.")
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden py-6 sm:py-10 lg:py-14">
        {/* <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-112 bg-[radial-gradient(circle_at_top,rgba(133,81,66,0.2),transparent_58%)]"
        /> */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-28 right-[8%] -z-10 hidden h-56 w-56 rounded-full bg-brand/10 blur-3xl lg:block"
        />
        <div className="page-shell">
          <PageReveal>
            <div className="mb-10 flex items-start gap-4 sm:mb-14 sm:gap-5">
              <BackIconLink
                data-page-intro
                href="/collection"
                label="Back to collection"
                className="mt-1 shrink-0"
              />

              <div data-page-intro>
                <p className="eyebrow-label text-brand">Your Selection</p>
                <h1 className="mt-3 font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem] lg:text-[3.2rem]">
                  Shopping Cart
                </h1>
              </div>
            </div>

            {isLoading ? (
              <div data-page-section className="grid gap-8 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-8">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={`cart-item-skeleton-${index}`}
                      className="surface-card flex gap-4 p-4 sm:p-6"
                    >
                      <div className="h-24 w-24 animate-pulse rounded-[var(--radius)] bg-secondary/60 sm:h-28 sm:w-28" />
                      <div className="flex-1 space-y-3">
                        <div className="h-3 w-24 animate-pulse rounded-full bg-secondary/60" />
                        <div className="h-6 w-2/3 animate-pulse rounded-full bg-secondary/60" />
                        <div className="h-4 w-28 animate-pulse rounded-full bg-secondary/60" />
                        <div className="mt-6 flex items-center justify-between">
                          <div className="h-8 w-28 animate-pulse rounded-full bg-secondary/60" />
                          <div className="h-5 w-20 animate-pulse rounded-full bg-secondary/60" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-4">
                  <div className="surface-card p-6">
                    <div className="h-3 w-28 animate-pulse rounded-full bg-secondary/60" />
                    <div className="mt-6 space-y-3">
                      <div className="h-4 w-full animate-pulse rounded-full bg-secondary/60" />
                      <div className="h-4 w-full animate-pulse rounded-full bg-secondary/60" />
                      <div className="h-4 w-full animate-pulse rounded-full bg-secondary/60" />
                    </div>
                    <div className="mt-6 h-11 w-full animate-pulse rounded-[var(--radius)] bg-secondary/60" />
                  </div>
                </div>
              </div>
            ) : isError ? (
              <div data-page-section className="surface-card p-8 text-center">
                <p className="text-muted-foreground">
                  We couldn&apos;t load your live cart right now.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    void refetch()
                  }}
                >
                  Try Again
                </Button>
              </div>
            ) : items.length === 0 ? (
              <div
                data-page-section
                className="surface-card p-8 text-center sm:p-10"
              >
                <EmptyState
                  icon={<EmptyCartIcon className="size-7" aria-hidden="true" />}
                  title="Your cart is empty"
                  description="Add a few considered pieces from the collection and they will appear here."
                  actionHref="/collection"
                  actionLabel="Continue Shopping"
                />
              </div>
            ) : (
              <div data-page-section className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <CartItem
                        key={
                          item.id ??
                          `${item.productId}-${item.colourLabel}-${item.sizeLengthCode ?? "none"}-${item.sizeWidthCode ?? "none"}`
                        }
                        {...item}
                        primaryImageUrl={item.primaryImageUrl}
                        isUpdating={
                          updateCartItem.isPending &&
                          updateCartItem.variables?.itemId === item.id
                        }
                        isRemoving={
                          removeCartItem.isPending &&
                          removeCartItem.variables === item.id
                        }
                        onDecreaseQuantity={() => {
                          void handleUpdateQuantity(item, item.quantity - 1)
                        }}
                        onIncreaseQuantity={() => {
                          void handleUpdateQuantity(item, item.quantity + 1)
                        }}
                        onRemove={() => {
                          void handleRemoveItem(item.id)
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div data-page-section className="lg:col-span-4">
                  <CartSummary
                    total={total}
                    itemsCount={itemsCount}
                    isClearing={clearCart.isPending}
                    onClearCart={() => {
                      void handleClearCart()
                    }}
                  />
                </div>
              </div>
            )}
          </PageReveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
