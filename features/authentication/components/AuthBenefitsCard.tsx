import type { ComponentType } from "react"
import type { RemixiconComponentType } from "@remixicon/react"

interface Benefit {
  icon: RemixiconComponentType
  title: string
  description: string
}

interface AuthBenefitsCardProps {
  title: string
  benefits: Benefit[]
}

export function AuthBenefitsCard({ title, benefits }: AuthBenefitsCardProps) {
  return (
    <div className="mt-6 rounded-[1.25rem] border border-border/70 bg-secondary/55 p-4 sm:p-5">
      <p className="eyebrow-label text-brand">{title}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-[1rem] border border-border/70 bg-background/78 p-4"
          >
            <Icon className="size-4 text-brand" />
            <p className="mt-3 text-[0.74rem] font-medium tracking-[0.14em] text-foreground uppercase">
              {title}
            </p>
            <p className="mt-2 text-[0.78rem] leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
