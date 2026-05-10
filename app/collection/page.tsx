import { BackIconLink } from "@/components/ui/back-icon-link"
import { PageReveal } from "@/components/page-reveal"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCollectionView } from "@/features/products/components"

export default function CollectionPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden py-6 sm:py-10 lg:py-14">
        {/* <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,rgba(133,81,66,0.2),transparent_58%)]"
        /> */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-28 left-[8%] -z-10 hidden h-56 w-56 rounded-full bg-brand/10 blur-3xl lg:block"
        />
        <div className="page-shell">
          <PageReveal>
            <div
              data-page-intro
              className="mb-10 flex items-start gap-4 sm:mb-14 sm:gap-5"
            >
              <BackIconLink
                href="/"
                label="Back to home"
                className="mt-1 shrink-0"
              />

              <div className="max-w-[42rem]">
                <h1 className="font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem] lg:text-[3.2rem]">
                  The Collection
                </h1>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                  Discover statement garments, occasion silhouettes, and
                  everyday essentials from the latest Houris edit.
                </p>
              </div>
            </div>

            <div data-page-section>
              <ProductCollectionView />
            </div>
          </PageReveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
