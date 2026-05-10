import Link from "next/link"
import {
  RiArrowRightUpLine,
  RiLock2Line,
  RiShoppingBag3Line,
} from "@remixicon/react"

const quickActions = [
  {
    href: "/account/orders",
    label: "Order History",
    description: "Track current pieces and revisit completed purchases.",
    icon: RiShoppingBag3Line,
  },
  {
    href: "/account/change-password",
    label: "Change Password",
    description: "Refresh your credentials and keep your account secure.",
    icon: RiLock2Line,
  },
  {
    href: "/collection",
    label: "Continue Shopping",
    description: "Return to the collection and explore new silhouettes.",
    icon: RiArrowRightUpLine,
  },
]

export function QuickActions() {
  return (
    <section className="surface-panel p-4 sm:p-5">
      <p className="eyebrow-label text-brand">Quick Actions</p>
      <div className="mt-5 space-y-3">
        {quickActions.map(({ href, label, description, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="group block rounded-[var(--radius)] border border-border/70 bg-background/78 p-4 transition-colors hover:border-brand/40 hover:bg-background"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-brand/12 p-2 text-brand">
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className="text-[0.76rem] font-medium tracking-[0.14em] text-foreground uppercase">
                    {label}
                  </p>
                  <p className="mt-2 text-[0.78rem] leading-6 text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
              <RiArrowRightUpLine className="mt-0.5 size-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
