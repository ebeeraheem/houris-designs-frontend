"use client"

import { PageReveal } from "@/components/page-reveal"
import { Button } from "@/components/ui/button"
import { useGetProfile } from "../usecases/useGetProfile"
import { AccountNotes } from "./AccountNotes"
import { AccountOverview } from "./AccountOverview"
import { DeliveryDetails } from "./DeliveryDetails"
import { ProfileDetails } from "./ProfileDetails"
import { QuickActions } from "./QuickActions"

function getInitials(fullName?: string | null) {
  const parts = (typeof fullName === "string" ? fullName : "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (parts.length === 0) {
    return "HD"
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

function OverviewSkeleton() {
  return (
    <div className="mt-6 rounded-[var(--radius)] border border-border/70 bg-secondary/65 p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-15 w-15 animate-pulse rounded-full bg-secondary/60" />
          <div className="space-y-3">
            <div className="h-5 w-36 animate-pulse rounded-full bg-secondary/60" />
            <div className="h-4 w-48 animate-pulse rounded-full bg-secondary/60" />
          </div>
        </div>
        <div className="h-8 w-32 animate-pulse rounded-full bg-secondary/60" />
      </div>
    </div>
  )
}

function SectionSkeleton() {
  return (
    <section className="surface-card p-6 sm:p-8">
      <div className="h-3 w-28 animate-pulse rounded-full bg-secondary/60" />
      <div className="mt-4 h-8 w-48 animate-pulse rounded-full bg-secondary/60" />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={`account-section-skeleton-${index}`}
            className="rounded-[var(--radius)] border border-border/70 bg-secondary/55 p-5"
          >
            <div className="h-4 w-24 animate-pulse rounded-full bg-secondary/60" />
            <div className="mt-4 h-5 w-3/4 animate-pulse rounded-full bg-secondary/60" />
            <div className="mt-3 h-4 w-full animate-pulse rounded-full bg-secondary/60" />
          </div>
        ))}
      </div>
    </section>
  )
}

function ErrorCard({
  message,
  onRetry,
}: Readonly<{
  message: string
  onRetry: () => void
}>) {
  return (
    <section className="surface-card p-6 sm:p-8">
      <p className="text-sm leading-7 text-muted-foreground">{message}</p>
      <Button
        type="button"
        variant="outline"
        className="mt-4"
        onClick={onRetry}
      >
        Try Again
      </Button>
    </section>
  )
}

export function AccountPageView() {
  const profileQuery = useGetProfile()

  const profile = profileQuery.data
    ? {
        ...profileQuery.data,
        initials: getInitials(profileQuery.data.fullName),
      }
    : null

  return (
    <div className="page-shell">
      <PageReveal>
        <div className="grid gap-6">
          <section
            data-page-intro
            className="surface-card relative overflow-hidden p-4 sm:p-6 lg:p-8"
          >
            <div className="relative">
              <p className="eyebrow-label text-brand">Your Account</p>
              <h1 className="mt-4 max-w-[12ch] font-heading text-[2.35rem] leading-[0.88] font-medium tracking-[-0.08em] uppercase sm:text-[3.2rem]">
                A more personal account overview.
              </h1>
              <p className="mt-4 max-w-[36rem] text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                Keep your profile, delivery details, and made-to-order activity
                in one refined place designed to feel as considered as the
                pieces you shop.
              </p>

              {profileQuery.isLoading && !profile ? (
                <OverviewSkeleton />
              ) : profile ? (
                <AccountOverview profile={profile} />
              ) : (
                <div className="mt-6">
                  <ErrorCard
                    message="We couldn't load your profile right now."
                    onRetry={() => {
                      void profileQuery.refetch()
                    }}
                  />
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.82fr)] xl:gap-8">
          <div className="grid gap-6">
            {profileQuery.isLoading && !profile ? (
              <SectionSkeleton />
            ) : profile ? (
              <ProfileDetails profile={profile} />
            ) : (
              <ErrorCard
                message="We couldn't load your personal information."
                onRetry={() => {
                  void profileQuery.refetch()
                }}
              />
            )}

            <DeliveryDetails />
          </div>

          <aside className="grid content-start gap-6 self-start">
            <QuickActions />
            <AccountNotes />
          </aside>
        </div>
      </PageReveal>
    </div>
  )
}
