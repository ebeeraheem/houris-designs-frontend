import Link from "next/link"
import {
  RiArrowLeftLine,
  RiMapPinLine,
  RiShoppingBag3Line,
} from "@remixicon/react"

import { PageReveal } from "@/components/page-reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { EditorialHero } from "@/components/shared/EditorialHero"
import {
  SignInForm,
  AuthBenefitsCard,
  AuthCheckList,
} from "@/features/authentication/components"

const returningBenefits = [
  {
    icon: RiShoppingBag3Line,
    title: "Order history ready",
    description:
      "Pick up where you left off with your latest pieces, statuses, and delivery details.",
  },
  {
    icon: RiMapPinLine,
    title: "Saved details",
    description:
      "Checkout is faster once your preferred address and account profile are in place.",
  },
]

const accountAccess = [
  "View your order history and current made-to-order progress.",
  "Keep your saved address and account preferences in one place.",
  "Return to checkout with the same premium flow and protected session.",
]

export default function SignInPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
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
            <Link
              data-page-intro
              href="/collection"
              className="inline-flex items-center gap-2 text-[0.72rem] font-medium tracking-[0.18em] text-muted-foreground uppercase hover:text-foreground"
            >
              <RiArrowLeftLine className="size-4" />
              Back to collection
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
                  <p className="eyebrow-label text-brand">
                    Private Client Access
                  </p>
                  <h1 className="mt-4 max-w-[12ch] font-heading text-[2.35rem] leading-[0.88] font-medium tracking-[-0.08em] uppercase sm:text-[3.2rem]">
                    Sign in with the same calm, premium flow.
                  </h1>
                  <p className="mt-4 max-w-[34rem] text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                    Return to your account to follow orders, manage delivery
                    details, and move through checkout with a more considered
                    experience.
                  </p>

                  <SignInForm />

                  <AuthBenefitsCard
                    title="Returning Client"
                    benefits={returningBenefits}
                  />

                  <p className="mt-6 text-center text-[0.78rem] text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-brand hover:underline">
                      Create one
                    </Link>
                  </p>
                </div>
              </section>

              <aside className="grid content-start gap-6 self-start">
                <div data-page-media>
                  <EditorialHero
                    imageSrc="/images/editorial/boutique-rack.jpg"
                    imageAlt="Curated rack of premium garments in a softly lit studio."
                    badge="Houris Client Space"
                    title="Return to your<br />orders and profile."
                    description="Sign in to reconnect with your saved details, fit choices, and current made-to-order progress."
                  />
                </div>

                <div data-page-section>
                  <AuthCheckList
                    title="What You Unlock"
                    items={accountAccess}
                  />
                </div>
              </aside>
            </div>
          </PageReveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
