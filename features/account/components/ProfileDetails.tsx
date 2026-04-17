import { RiUser3Line, RiShieldCheckLine } from "@remixicon/react"

interface Profile {
  fullName: string
  email: string
}

interface ProfileDetailsProps {
  profile: Profile
}

export function ProfileDetails({ profile }: ProfileDetailsProps) {
  return (
    <section className="surface-card p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow-label text-brand">Profile Details</p>
          <h2 className="mt-3 font-heading text-[1.55rem] leading-none tracking-[-0.05em]">
            Personal information
          </h2>
        </div>
        <button className="text-[0.72rem] font-medium tracking-[0.14em] text-brand uppercase hover:underline">
          Edit
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.1rem] border border-border/70 bg-secondary/55 p-5">
          <div className="flex items-center gap-2 text-brand">
            <RiUser3Line className="size-4" />
            <p className="text-[0.72rem] font-medium tracking-[0.16em] uppercase">
              Full Name
            </p>
          </div>
          <p className="mt-3 font-heading text-[1.1rem] font-medium tracking-[-0.03em]">
            {profile.fullName}
          </p>
        </div>

        <div className="rounded-[1.1rem] border border-border/70 bg-secondary/55 p-5">
          <div className="flex items-center gap-2 text-brand">
            <RiShieldCheckLine className="size-4" />
            <p className="text-[0.72rem] font-medium tracking-[0.16em] uppercase">
              Email
            </p>
          </div>
          <p className="mt-3 font-heading text-[1.1rem] font-medium tracking-[-0.03em]">
            {profile.email}
          </p>
        </div>
      </div>
    </section>
  )
}
