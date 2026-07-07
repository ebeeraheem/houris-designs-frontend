import { BackIconLink } from "@/components/ui/back-icon-link"
import { PageReveal } from "@/components/page-reveal"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SizeGuideView } from "@/features/sizes"

export default function SizeGuidePage() {
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
          className="pointer-events-none absolute top-28 right-[8%] -z-10 hidden h-56 w-56 rounded-full bg-brand/10 blur-3xl lg:block"
        />
        <div className="page-shell">
          <PageReveal>
            <div className="mb-10 flex items-start gap-4 sm:gap-5">
              <BackIconLink
                data-page-intro
                href="/couture"
                label="Back to couture"
                className="mt-1 shrink-0"
              />

              <div data-page-intro className="max-w-[42rem]">
                <h1 className="font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem] lg:text-[3.2rem]">
                  Size Guide
                </h1>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                  Pick one length code and one width code — together they are
                  your size (e.g., E16).
                </p>
              </div>
            </div>

            <SizeGuideView />
          </PageReveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
