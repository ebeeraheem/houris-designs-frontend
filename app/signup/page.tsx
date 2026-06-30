import Link from "next/link"
import {
  RiLock2Line,
  RiShoppingBag3Line,
  RiUserStarLine,
} from "@remixicon/react"

import { BackIconLink } from "@/components/ui/back-icon-link"
import { PageReveal } from "@/components/page-reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { EditorialHero } from "@/components/shared/EditorialHero"
import {
  AuthenticatedCollectionRedirect,
  SignUpForm,
  AuthBenefitsCard,
  AuthCheckList,
} from "@/features/authentication/components"

const signupBenefits = [
  {
    icon: RiUserStarLine,
    title: "Personal profile",
    description:
      "Keep your details together so every future order feels more tailored and seamless.",
  },
  {
    icon: RiShoppingBag3Line,
    title: "Track every order",
    description:
      "Follow each made-to-order purchase from checkout through delivery.",
  },
  {
    icon: RiLock2Line,
    title: "Protected access",
    description:
      "Manage your account, password, and saved preferences behind a secure sign-in.",
  },
]

const accountSetupNotes = [
  "Create one account to manage orders, addresses, and account security.",
  "Your first purchase flow becomes smoother once your profile is in place.",
  "Everything you need is ready: manage your account, shop, checkout, and reset your password anytime.",
]

export default function SignUpPage() {
  return (
    <>
      <AuthenticatedCollectionRedirect />
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
            <div className="flex items-start gap-4 sm:gap-5">
              <BackIconLink
                data-page-intro
                href="/couture"
                label="Back to couture"
                className="mt-1 shrink-0"
              />

              <div className="grid min-w-0 flex-1 gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] xl:gap-8">
                <section
                  data-page-intro
                  className="surface-card relative overflow-hidden p-4 sm:p-6 lg:p-8"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-brand/16 via-brand/5 to-transparent"
                  />

                  <div className="relative">
                    <p className="eyebrow-label text-brand">
                      New Client Profile
                    </p>
                    <h1 className="mt-4 max-w-[12ch] font-heading text-[2.35rem] leading-[0.88] font-medium tracking-[-0.08em] uppercase sm:text-[3.2rem]">
                      Create an account with the same refined taste.
                    </h1>
                    <p className="mt-4 max-w-[35rem] text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                      Start a profile that keeps your orders, delivery details,
                      and account preferences in one polished place built for a
                      premium fashion experience.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <div className="status-pill border-brand/20 bg-brand/10 text-brand">
                        Ready for checkout
                      </div>
                      <div className="status-pill border-border bg-background/80 text-foreground/78">
                        Account setup in minutes
                      </div>
                    </div>

                    <SignUpForm />

                    <p className="mt-4 text-center text-[0.78rem] text-muted-foreground sm:mt-6">
                      Already have an account?{" "}
                      <Link
                        href="/signin"
                        className="text-brand hover:underline"
                      >
                        Sign in
                      </Link>
                    </p>

                    <AuthBenefitsCard
                      title="What Comes Next"
                      benefits={signupBenefits}
                    />
                  </div>
                </section>

                <aside className="grid content-start gap-6 self-start">
                  <div data-page-media>
                    <EditorialHero
                      imageSrc="/images/editorial/yellow-look.jpg"
                      imageAlt="Woman in a vibrant yellow fashion set posing in sunlight."
                      badge="Begin Your Profile"
                      title="Build the account<br />behind every order."
                      description="A single account brings your purchases, fit journey, and delivery preferences into one more thoughtful flow."
                    />
                  </div>

                  <div data-page-section>
                    <AuthCheckList
                      title="Account Setup"
                      items={accountSetupNotes}
                    />
                  </div>
                </aside>
              </div>
            </div>
          </PageReveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
