import {
  RiCalendarScheduleLine,
  RiScissorsLine,
  RiShieldCheckLine,
} from "@remixicon/react"

interface AccountSnapshot {
  orderCount: string
  memberSince: string
  fitProfile: string
  lastDelivery: string
  preferredFinish: string
}

interface Profile {
  fullName: string
  email: string
  initials: string
}

interface AccountOverviewProps {
  profile: Profile
  snapshot: AccountSnapshot
}

export function AccountOverview({ profile, snapshot }: AccountOverviewProps) {
  return (
    <>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[var(--radius)] border border-border/70 bg-background/82 p-4">
          <p className="eyebrow-label text-brand">Orders Placed</p>
          <p className="mt-3 font-heading text-[1.9rem] leading-none tracking-[-0.05em]">
            {snapshot.orderCount}
          </p>
        </div>
        <div className="rounded-[var(--radius)] border border-border/70 bg-background/82 p-4">
          <p className="eyebrow-label text-brand">Member Since</p>
          <p className="mt-3 font-heading text-[1.25rem] leading-none tracking-[-0.04em]">
            {snapshot.memberSince}
          </p>
        </div>
        <div className="rounded-[var(--radius)] border border-border/70 bg-background/82 p-4">
          <p className="eyebrow-label text-brand">Fit Profile</p>
          <p className="mt-3 font-heading text-[1.25rem] leading-none tracking-[-0.04em]">
            {snapshot.fitProfile}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-[var(--radius)] border border-border/70 bg-secondary/65 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-15 items-center justify-center rounded-full bg-brand text-lg font-semibold text-brand-foreground">
              {profile.initials}
            </div>
            <div>
              <p className="font-heading text-[1.1rem] font-medium tracking-[-0.03em]">
                {profile.fullName}
              </p>
              <p className="mt-1 text-[0.8rem] text-muted-foreground">
                {profile.email}
              </p>
            </div>
          </div>

          <div className="status-pill border-brand/20 bg-brand/10 text-brand">
            Verified account
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[var(--radius)] border border-border/70 bg-background/80 p-4">
            <div className="flex items-center gap-2 text-brand">
              <RiCalendarScheduleLine className="size-4" />
              <p className="text-[0.72rem] font-medium tracking-[0.16em] uppercase">
                Last Delivery
              </p>
            </div>
            <p className="mt-3 text-[0.82rem] leading-6 text-muted-foreground">
              {snapshot.lastDelivery}
            </p>
          </div>

          <div className="rounded-[var(--radius)] border border-border/70 bg-background/80 p-4">
            <div className="flex items-center gap-2 text-brand">
              <RiScissorsLine className="size-4" />
              <p className="text-[0.72rem] font-medium tracking-[0.16em] uppercase">
                Preferred Finish
              </p>
            </div>
            <p className="mt-3 text-[0.82rem] leading-6 text-muted-foreground">
              {snapshot.preferredFinish}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
