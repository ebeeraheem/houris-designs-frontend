import Link from "next/link"
import type { ReactNode } from "react"

import { cn } from "@/utils/cn"

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  actionHref?: string
  actionLabel?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  actionHref,
  actionLabel,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="mx-auto flex size-16 items-center justify-center rounded-[var(--radius)] border border-brand/16 bg-brand/10 text-brand">
        {icon}
      </div>
      <p className="mt-5 font-heading text-[1.2rem] font-medium tracking-[-0.03em]">
        {title}
      </p>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {description}
      </p>
      {action
        ? action
        : actionHref && actionLabel
          ? (
            <Link
              href={actionHref}
              className="mt-5 inline-block text-[0.78rem] font-medium tracking-[0.14em] text-brand uppercase hover:underline"
            >
              {actionLabel}
            </Link>
          )
          : null}
    </div>
  )
}
