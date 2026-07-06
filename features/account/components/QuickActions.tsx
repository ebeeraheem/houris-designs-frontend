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
    icon: RiShoppingBag3Line,
  },
  {
    href: "/account/change-password",
    label: "Change Password",
    icon: RiLock2Line,
  },
  {
    href: "/couture",
    label: "Continue Shopping",
    icon: RiArrowRightUpLine,
  },
]

export function QuickActions() {
  return (
    <section className="surface-panel p-4 sm:p-5">
      <p className="eyebrow-label text-brand">Quick Actions</p>
      <div className="mt-5 space-y-3">
        {quickActions.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="group block rounded-[var(--radius)] border border-border/70 bg-background/78 p-4 transition-colors hover:border-brand/40 hover:bg-background"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-brand/12 p-2 text-brand">
                  <Icon className="size-4" />
                </div>
                <p className="text-[0.76rem] font-medium tracking-[0.14em] text-foreground uppercase">
                  {label}
                </p>
              </div>
              <RiArrowRightUpLine className="size-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
