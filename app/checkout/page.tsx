import Link from "next/link"
import { RiArrowLeftLine } from "@remixicon/react"

import { PageReveal } from "@/components/page-reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { EditorialHero } from "@/components/shared/EditorialHero"
import { CheckoutForm } from "@/features/orders/components/CheckoutForm"
import { CheckoutHighlights } from "@/features/orders/components/CheckoutHighlights"
import { formatSizeCode } from "@/utils/size-codes"

const MOCK_CART = {
  total: 480,
  items: [
    {
      id: "1",
      productTitle: "The Structured Blazer",
      colourLabel: "Charcoal",
      sizeLengthCode: "B",
      sizeWidthCode: 12,
      quantity: 1,
      lineSubtotal: 285,
    },
    {
      id: "2",
      productTitle: "Tailored Wide Trousers",
      colourLabel: "Sand",
      sizeLengthCode: "B",
      sizeWidthCode: 12,
      quantity: 1,
      lineSubtotal: 195,
    },
  ],
}

const MOCK_SAVED_ADDRESS = {
  recipientName: "Jane Doe",
  addressLine1: "123 Fashion Avenue",
  addressLine2: "Suite 456",
  city: "Lagos",
  stateRegion: "Lagos State",
  country: "Nigeria",
  postalCode: "100001",
}

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top,rgba(133,81,66,0.2),transparent_58%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-24 right-[6%] -z-10 hidden h-56 w-56 rounded-full bg-brand/10 blur-3xl lg:block"
        />

        <div className="page-shell">
          <PageReveal>
            <Link
              data-page-intro
              href="/cart"
              className="inline-flex items-center gap-2 text-[0.72rem] font-medium tracking-[0.18em] text-muted-foreground uppercase hover:text-foreground"
            >
              <RiArrowLeftLine className="size-4" />
              Back to cart
            </Link>

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] xl:gap-8">
              <section
                data-page-intro
                className="surface-card relative overflow-hidden p-6 sm:p-8 lg:p-10"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-brand/16 via-brand/5 to-transparent"
                />

                <div className="relative">
                  <p className="eyebrow-label text-brand">Checkout Atelier</p>
                  <h1 className="mt-4 max-w-[12ch] font-heading text-[2.35rem] leading-[0.88] font-medium tracking-[-0.08em] uppercase sm:text-[3.2rem]">
                    Finish the order with a calmer, more considered flow.
                  </h1>
                  <p className="mt-4 max-w-[38rem] text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                    Review your delivery details, confirm the saved address if
                    it works, and move into payment with the same editorial tone
                    as the rest of the account experience.
                  </p>

                  <CheckoutHighlights
                    itemsCount={MOCK_CART.items.length}
                    city={MOCK_SAVED_ADDRESS.city}
                    country={MOCK_SAVED_ADDRESS.country}
                  />
                </div>
              </section>

              <aside data-page-media>
                <EditorialHero
                  imageSrc="/images/editorial/yellow-look.jpg"
                  imageAlt="Model in a vibrant yellow set, standing in warm sunlight."
                  badge="Final Review"
                  title="One more look,<br />then payment."
                  description="This final step keeps your order summary and delivery details close before the secure payment handoff."
                />
              </aside>
            </div>

            <div className="mt-6">
              <CheckoutForm
                cartTotal={MOCK_CART.total}
                cartItemsCount={MOCK_CART.items.length}
                cartItems={MOCK_CART.items.map((item) => ({
                  id: item.id,
                  productTitle: item.productTitle,
                  colourLabel: item.colourLabel,
                  sizeLabel: formatSizeCode(
                    item.sizeLengthCode,
                    item.sizeWidthCode
                  ),
                  quantity: item.quantity,
                  lineSubtotal: item.lineSubtotal,
                }))}
                savedAddress={MOCK_SAVED_ADDRESS}
              />
            </div>
          </PageReveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
