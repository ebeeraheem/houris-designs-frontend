import Link from "next/link"
import { RiArrowLeftLine } from "@remixicon/react"

import { PageReveal } from "@/components/page-reveal"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartItem, CartSummary } from "@/features/cart/components"
import { demoProducts } from "@/features/products/demo-products"

export default function CartPage() {
  const cart = getCart()

  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
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
            <Link
              data-page-intro
              href="/collection"
              className="inline-flex items-center gap-2 text-[0.72rem] font-medium tracking-[0.18em] text-muted-foreground uppercase hover:text-foreground"
            >
              <RiArrowLeftLine className="size-4" />
              Back to collection
            </Link>

            <div data-page-intro className="mt-6 mb-10 sm:mb-14">
              <p className="eyebrow-label text-brand">Your Selection</p>
              <h1 className="mt-3 font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem] lg:text-[3.2rem]">
                Shopping Cart
              </h1>
            </div>

            {cart.items.length === 0 ? (
              <div data-page-section className="surface-card p-8 text-center">
                <p className="text-muted-foreground">Your cart is empty</p>
                <Link
                  href="/collection"
                  className="mt-4 inline-block text-[0.78rem] font-medium tracking-[0.14em] text-brand uppercase hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div data-page-section className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <div className="space-y-4">
                    {cart.items.map((item) => (
                      <CartItem
                        key={item.id}
                        {...item}
                        productImage={getProductImage(item.productId)}
                      />
                    ))}
                  </div>
                </div>

                <div data-page-section className="lg:col-span-4">
                  <CartSummary total={cart.total} />
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

function getProductImage(productId: string) {
  return (
    demoProducts.find((product) => product.id === Number(productId))?.image ??
    "/images/editorial/boutique-rack.jpg"
  )
}

function getCart() {
  return {
    items: [
      {
        id: "1",
        productId: "1",
        productTitle: "The Structured Blazer",
        primaryImageUrl: "/images/placeholder.jpg",
        unitPrice: 285,
        swatchId: "swatch-charcoal",
        colourLabel: "Charcoal",
        sizeLengthCode: "B",
        sizeWidthCode: 12,
        quantity: 1,
        lineSubtotal: 285,
      },
      {
        id: "2",
        productId: "3",
        productTitle: "Tailored Wide Trousers",
        primaryImageUrl: "/images/placeholder.jpg",
        unitPrice: 195,
        swatchId: "swatch-sand",
        colourLabel: "Sand",
        sizeLengthCode: "B",
        sizeWidthCode: 12,
        quantity: 1,
        lineSubtotal: 195,
      },
    ],
    total: 480,
  }
}
