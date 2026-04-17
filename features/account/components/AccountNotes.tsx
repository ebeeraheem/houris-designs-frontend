import { RiShieldCheckLine, RiScissorsLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"

const accountNotes = [
  {
    icon: RiShieldCheckLine,
    title: "Protected Details",
    description:
      "Your profile, orders, and saved information sit behind a secured account.",
  },
  {
    icon: RiScissorsLine,
    title: "Made-to-Order Focus",
    description:
      "Every purchase stays tied to your fit preferences for a more personal experience.",
  },
]

export function AccountNotes() {
  return (
    <section className="surface-panel p-6 sm:p-7">
      <p className="eyebrow-label text-brand">Account Notes</p>
      <div className="mt-5 space-y-4">
        {accountNotes.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="rounded-full bg-brand/12 p-2 text-brand">
              <Icon className="size-4" />
            </div>
            <div>
              <p className="text-[0.76rem] font-medium tracking-[0.14em] text-foreground uppercase">
                {title}
              </p>
              <p className="mt-2 text-[0.78rem] leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-border/50 pt-6">
        <Button
          variant="outline"
          className="w-full border-destructive/20 text-destructive hover:bg-destructive/10"
        >
          Sign Out
        </Button>
      </div>
    </section>
  )
}
