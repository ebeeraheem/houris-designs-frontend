import { RiCheckLine } from "@remixicon/react"

interface AuthCheckListProps {
  title: string
  items: string[]
}

export function AuthCheckList({ title, items }: AuthCheckListProps) {
  return (
    <div className="surface-panel p-4 sm:p-5">
      <p className="eyebrow-label text-brand">{title}</p>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <div className="mt-0.5 rounded-(--radius) bg-brand/12 p-1.5 text-brand">
              <RiCheckLine className="size-3.5" />
            </div>
            <p className="text-[0.82rem] leading-6 text-muted-foreground">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
