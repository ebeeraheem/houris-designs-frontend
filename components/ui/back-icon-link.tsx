import Link from "next/link"
import { RiArrowLeftLine } from "@remixicon/react"

import { cn } from "@/utils/cn"

interface BackIconLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "href" | "children"> {
  href: React.ComponentProps<typeof Link>["href"]
  label: string
}

export function BackIconLink({
  href,
  label,
  className,
  ...props
}: BackIconLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-[var(--radius)] border border-border/70 bg-background/88 text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-sm transition-all duration-200 hover:border-foreground/35 hover:bg-secondary hover:text-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
      {...props}
    >
      <RiArrowLeftLine className="size-4" />
      <span className="sr-only">{label}</span>
    </Link>
  )
}
