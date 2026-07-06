interface Profile {
  fullName: string
  email: string
  initials: string
}

interface AccountOverviewProps {
  profile: Profile
}

export function AccountOverview({ profile }: AccountOverviewProps) {
  return (
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
      </div>
    </div>
  )
}
