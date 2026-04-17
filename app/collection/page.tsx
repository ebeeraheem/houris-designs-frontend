import Link from "next/link"
import { RiArrowLeftLine } from "@remixicon/react"

import { PageReveal } from "@/components/page-reveal"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductGrid } from "@/features/products/components"
import { demoProducts } from "@/features/products/demo-products"

export default function CollectionPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,rgba(133,81,66,0.2),transparent_58%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-28 left-[8%] -z-10 hidden h-56 w-56 rounded-full bg-brand/10 blur-3xl lg:block"
        />
        <div className="page-shell">
          <PageReveal>
            <Link
              data-page-intro
              href="/"
              className="inline-flex items-center gap-2 text-[0.72rem] font-medium tracking-[0.18em] text-muted-foreground uppercase hover:text-foreground"
            >
              <RiArrowLeftLine className="size-4" />
              Back to home
            </Link>

            <div data-page-intro className="mt-6 mb-10 sm:mb-14">
              <p className="eyebrow-label text-brand">All Garments</p>
              <h1 className="mt-3 font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem] lg:text-[3.2rem]">
                The Collection
              </h1>
            </div>

            <div data-page-section>
              <ProductGrid products={demoProducts} />
            </div>
          </PageReveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
