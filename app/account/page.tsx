import Link from "next/link"

import { PageReveal } from "@/components/page-reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { EditorialHero } from "@/components/shared/EditorialHero"
import {
  AccountOverview,
  ProfileDetails,
  DeliveryDetails,
  QuickActions,
  AccountNotes,
} from "@/features/account/components"

export default function AccountPage() {
  const profile = getProfile()
  const address = getAddress()
  const snapshot = getAccountSnapshot()

  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top,rgba(133,81,66,0.2),transparent_58%)]"
        /> */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-32 left-[6%] -z-10 hidden h-56 w-56 rounded-full bg-brand/8 blur-3xl lg:block"
        />

        <div className="page-shell">
          <PageReveal>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] xl:gap-8">
              <section
                data-page-intro
                className="surface-card relative overflow-hidden p-6 sm:p-8 lg:p-10"
              >
                {/* <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-brand/16 via-brand/5 to-transparent"
                /> */}

                <div className="relative">
                  <p className="eyebrow-label text-brand">Your Account</p>
                  <h1 className="mt-4 max-w-[12ch] font-heading text-[2.35rem] leading-[0.88] font-medium tracking-[-0.08em] uppercase sm:text-[3.2rem]">
                    A more personal account overview.
                  </h1>
                  <p className="mt-4 max-w-[36rem] text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                    Keep your profile, delivery details, and made-to-order
                    activity in one refined place designed to feel as considered
                    as the pieces you shop.
                  </p>

                  <AccountOverview profile={profile} snapshot={snapshot} />
                </div>
              </section>

              <aside data-page-media>
                <EditorialHero
                  imageSrc="/images/editorial/boutique-rack.jpg"
                  imageAlt="Curated rack of premium garments in a softly lit studio."
                  badge="Private Client Space"
                  title="Style, sizing,<br />and delivery in sync."
                  description="This overview keeps your account details close to your next made-to-order decision."
                />
              </aside>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.82fr)] xl:gap-8">
              <div className="grid gap-6">
                <ProfileDetails profile={profile} />
                <DeliveryDetails address={address} />
              </div>

              <aside className="grid content-start gap-6 self-start">
                <QuickActions />
                <AccountNotes />
              </aside>
            </div>
          </PageReveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

function getProfile() {
  return {
    fullName: "Jane Doe",
    email: "jane@example.com",
    initials: "JD",
  }
}

function getAddress() {
  return {
    recipientName: "Jane Doe",
    addressLine1: "123 Fashion Avenue",
    addressLine2: "Apt 4B",
    city: "New York",
    stateRegion: "NY",
    postalCode: "10001",
    country: "United States",
  }
}

function getAccountSnapshot() {
  return {
    orderCount: "12",
    memberSince: "2023",
    fitProfile: "B12",
    lastDelivery: "Your last made-to-order delivery arrived on March 28, 2026.",
    preferredFinish:
      "Tailored silhouettes with structured, clean finishing details.",
  }
}
