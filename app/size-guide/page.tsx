import Link from "next/link"
import { RiArrowLeftLine } from "@remixicon/react"
import { PageReveal } from "@/components/page-reveal"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function SizeGuidePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,rgba(133,81,66,0.2),transparent_58%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-28 right-[8%] -z-10 hidden h-56 w-56 rounded-full bg-brand/10 blur-3xl lg:block"
        />
        <div className="page-shell">
          <PageReveal>
            <Link
              data-page-intro
              href="/collection"
              className="inline-flex items-center gap-2 text-[0.72rem] font-medium tracking-[0.18em] text-muted-foreground uppercase hover:text-foreground"
            >
              <RiArrowLeftLine className="size-4" />
              Back to collection
            </Link>

            <div data-page-intro className="mb-10 mt-6 max-w-[42rem]">
              <p className="eyebrow-label text-brand">Precision Fit</p>
              <h1 className="mt-3 font-heading text-[2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[2.6rem] lg:text-[3.2rem]">
                Size Guide
              </h1>
              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                Our two-dimensional sizing system combines length and width codes
                for a precise fit. Choose one from each dimension — the result is
                your size (e.g., E16 = Length E + Width 16).
              </p>
            </div>

          <div data-page-section className="grid gap-8 lg:grid-cols-2 lg:gap-x-12">
            <div className="surface-card p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="eyebrow-label text-brand">Length</span>
                <span className="h-px flex-1 bg-border" />
                <span className="eyebrow-label text-foreground/50">
                  Full Length / Sleeve
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 pr-4 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-foreground/60">
                        Code
                      </th>
                      <th className="pb-3 pr-4 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-foreground/60">
                        Full Length
                      </th>
                      <th className="pb-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-foreground/60">
                        Full Sleeve
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {lengthCodes.map((row) => (
                      <tr key={row.code} className="border-b border-border/50">
                        <td className="py-3 pr-4 text-[0.78rem] font-semibold tracking-[0.08em]">
                          {row.code}
                        </td>
                        <td className="py-3 pr-4 text-[0.78rem] text-muted-foreground">
                          {row.fullLength}&quot;
                        </td>
                        <td className="py-3 text-[0.78rem] text-muted-foreground">
                          {row.fullSleeve}&quot;
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="surface-card p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="eyebrow-label text-brand">Width</span>
                <span className="h-px flex-1 bg-border" />
                <span className="eyebrow-label text-foreground/50">
                  Bust / Waist / Hips
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 pr-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-foreground/60">
                        Code
                      </th>
                      <th className="pb-3 pr-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-foreground/60">
                        Bust
                      </th>
                      <th className="pb-3 pr-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-foreground/60">
                        Waist
                      </th>
                      <th className="pb-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-foreground/60">
                        Hips
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {widthCodes.map((row) => (
                      <tr key={row.code} className="border-b border-border/50">
                        <td className="py-3 pr-3 text-[0.78rem] font-semibold tracking-[0.08em]">
                          {row.code}
                        </td>
                        <td className="py-3 pr-3 text-[0.78rem] text-muted-foreground">
                          {row.bustMin}-{row.bustMax}&quot;
                        </td>
                        <td className="py-3 pr-3 text-[0.78rem] text-muted-foreground">
                          {row.waistMin}-{row.waistMax}&quot;
                        </td>
                        <td className="py-3 text-[0.78rem] text-muted-foreground">
                          {row.hipsMin}-{row.hipsMax}&quot;
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div data-page-section className="mt-8 lg:mt-12">
            <div className="surface-card p-6 sm:p-8">
              <p className="eyebrow-label mb-4 text-brand">How to Measure</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="font-heading text-[1rem] font-medium tracking-[-0.02em]">
                    Full Length
                  </p>
                  <p className="mt-1 text-[0.78rem] leading-6 text-muted-foreground">
                    Measure from the highest point of the shoulder to the
                    desired hem length.
                  </p>
                </div>
                <div>
                  <p className="font-heading text-[1rem] font-medium tracking-[-0.02em]">
                    Full Sleeve
                  </p>
                  <p className="mt-1 text-[0.78rem] leading-6 text-muted-foreground">
                    Measure from the shoulder seam to the wrist bone with arm
                    slightly bent.
                  </p>
                </div>
                <div>
                  <p className="font-heading text-[1rem] font-medium tracking-[-0.02em]">
                    Bust
                  </p>
                  <p className="mt-1 text-[0.78rem] leading-6 text-muted-foreground">
                    Measure around the fullest part of the bust, keeping the
                    tape level.
                  </p>
                </div>
                <div>
                  <p className="font-heading text-[1rem] font-medium tracking-[-0.02em]">
                    Waist / Hips
                  </p>
                  <p className="mt-1 text-[0.78rem] leading-6 text-muted-foreground">
                    Measure at the natural waist and fullest part of the hips.
                  </p>
                </div>
              </div>
            </div>
          </div>
          </PageReveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

const lengthCodes = [
  { code: "A", fullLength: 52, fullSleeve: 20 },
  { code: "B", fullLength: 54, fullSleeve: 21 },
  { code: "C", fullLength: 56, fullSleeve: 22 },
  { code: "D", fullLength: 58, fullSleeve: 23 },
  { code: "E", fullLength: 60, fullSleeve: 24 },
  { code: "F", fullLength: 62, fullSleeve: 24 },
  { code: "G", fullLength: 64, fullSleeve: 25 },
  { code: "H", fullLength: 66, fullSleeve: 26 },
]

const widthCodes = [
  { code: 6, bustMin: 31, bustMax: 32, waistMin: 24, waistMax: 25, hipsMin: 35, hipsMax: 36 },
  { code: 8, bustMin: 32, bustMax: 33, waistMin: 26, waistMax: 27, hipsMin: 37, hipsMax: 38 },
  { code: 10, bustMin: 34, bustMax: 35, waistMin: 28, waistMax: 29, hipsMin: 39, hipsMax: 40 },
  { code: 12, bustMin: 35, bustMax: 36, waistMin: 30, waistMax: 31, hipsMin: 41, hipsMax: 42 },
  { code: 14, bustMin: 36, bustMax: 37, waistMin: 32, waistMax: 33, hipsMin: 43, hipsMax: 44 },
  { code: 16, bustMin: 37, bustMax: 38, waistMin: 34, waistMax: 35, hipsMin: 45, hipsMax: 46 },
  { code: 18, bustMin: 39, bustMax: 40, waistMin: 36, waistMax: 37, hipsMin: 47, hipsMax: 48 },
  { code: 20, bustMin: 40, bustMax: 41, waistMin: 38, waistMax: 39, hipsMin: 49, hipsMax: 50 },
  { code: 22, bustMin: 42, bustMax: 43, waistMin: 40, waistMax: 41, hipsMin: 51, hipsMax: 52 },
  { code: 24, bustMin: 44, bustMax: 45, waistMin: 42, waistMax: 43, hipsMin: 53, hipsMax: 54 },
]
