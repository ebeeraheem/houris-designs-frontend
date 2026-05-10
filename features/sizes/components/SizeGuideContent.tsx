import { cn } from "@/utils/cn"
import type { SizeGuide } from "../size.types"

interface SizeGuideContentProps {
  guide: SizeGuide
  dense?: boolean
}

const measurementTips = [
  {
    title: "Full Length",
    description:
      "Measure from the highest point of the shoulder to the desired hem length.",
  },
  {
    title: "Full Sleeve",
    description:
      "Measure from the shoulder seam to the wrist bone with the arm slightly bent.",
  },
  {
    title: "Shoulder",
    description:
      "Measure straight across the back from one shoulder point to the other.",
  },
  {
    title: "Bust",
    description:
      "Measure around the fullest part of the bust, keeping the tape level.",
  },
  {
    title: "Waist / Hips",
    description:
      "Measure at the natural waist and the fullest part of the hips for the width code.",
  },
]

export function SizeGuideContent({
  guide,
  dense = false,
}: SizeGuideContentProps) {
  const hasShoulder = guide.widths.some(
    (row) => typeof row.shoulder === "number"
  )

  const tableCardClass = dense ? "surface-card p-5" : "surface-card p-6 sm:p-8"
  const layoutClass = dense
    ? "grid gap-6 lg:grid-cols-2"
    : "grid gap-8 lg:grid-cols-2 lg:gap-x-12"
  const dividerLabelClass = dense
    ? "eyebrow-label text-foreground/50"
    : "eyebrow-label text-foreground/50"
  const headerCellClass = dense
    ? "pb-2 text-[0.65rem] font-medium tracking-[0.16em] text-foreground/60 uppercase"
    : "pb-3 text-[0.68rem] font-medium tracking-[0.18em] text-foreground/60 uppercase"
  const codeCellClass = dense
    ? "py-2.5 text-[0.75rem] font-semibold tracking-[0.06em]"
    : "py-3 text-[0.78rem] font-semibold tracking-[0.08em]"
  const valueCellClass = dense
    ? "py-2.5 text-[0.75rem] text-muted-foreground"
    : "py-3 text-[0.78rem] text-muted-foreground"
  const measureCardClass = dense
    ? "surface-card mt-6 p-5"
    : "surface-card mt-8 p-6 sm:mt-12 sm:p-8"
  const measureGridClass = dense
    ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
    : "grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
  const measureTitleClass = dense
    ? "font-heading text-[0.9rem] font-medium tracking-[-0.02em]"
    : "font-heading text-[1rem] font-medium tracking-[-0.02em]"
  const measureBodyClass = dense
    ? "mt-1 text-[0.75rem] leading-5 text-muted-foreground"
    : "mt-1 text-[0.78rem] leading-6 text-muted-foreground"

  return (
    <>
      <div className={layoutClass}>
        <div data-page-section className={tableCardClass}>
          <div className="mb-6 flex items-center gap-3">
            <span className="eyebrow-label text-brand">Length</span>
            <span className="h-px flex-1 bg-border" />
            <span className={dividerLabelClass}>Full Length / Sleeve</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className={cn("pr-4", headerCellClass)}>Code</th>
                  <th className={cn("pr-4", headerCellClass)}>Full Length</th>
                  <th className={headerCellClass}>Full Sleeve</th>
                </tr>
              </thead>
              <tbody>
                {guide.lengths.map((row) => (
                  <tr key={row.code} className="border-b border-border/50">
                    <td className={cn("pr-4", codeCellClass)}>{row.code}</td>
                    <td className={cn("pr-4", valueCellClass)}>
                      {row.fullLength}&quot;
                    </td>
                    <td className={valueCellClass}>{row.fullSleeve}&quot;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div data-page-section className={tableCardClass}>
          <div className="mb-6 flex items-center gap-3">
            <span className="eyebrow-label text-brand">Width</span>
            <span className="h-px flex-1 bg-border" />
            <span className={dividerLabelClass}>
              Bust / Waist / Hips{hasShoulder ? " / Shoulder" : ""}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className={cn("pr-3", headerCellClass)}>Code</th>
                  <th className={cn("pr-3", headerCellClass)}>Bust</th>
                  <th className={cn("pr-3", headerCellClass)}>Waist</th>
                  <th className={cn("pr-3", headerCellClass)}>Hips</th>
                  {hasShoulder && <th className={headerCellClass}>Shoulder</th>}
                </tr>
              </thead>
              <tbody>
                {guide.widths.map((row) => (
                  <tr key={row.code} className="border-b border-border/50">
                    <td className={cn("pr-3", codeCellClass)}>{row.code}</td>
                    <td className={cn("pr-3", valueCellClass)}>
                      {row.bustMin}-{row.bustMax}&quot;
                    </td>
                    <td className={cn("pr-3", valueCellClass)}>
                      {row.waistMin}-{row.waistMax}&quot;
                    </td>
                    <td className={cn("pr-3", valueCellClass)}>
                      {row.hipsMin}-{row.hipsMax}&quot;
                    </td>
                    {hasShoulder && (
                      <td className={valueCellClass}>
                        {row.shoulder ? `${row.shoulder}"` : "-"}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div data-page-section className={measureCardClass}>
        <p className="eyebrow-label mb-4 text-brand">How to Measure</p>
        <div className={measureGridClass}>
          {measurementTips.map((tip) => (
            <div key={tip.title}>
              <p className={measureTitleClass}>{tip.title}</p>
              <p className={measureBodyClass}>{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
