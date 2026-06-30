import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/utils/cn"

export function AboutCTA() {
  return (
    <section className="px-3 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="eyebrow-label mb-4 text-brand">Begin Your Journey</p>
        <h2 className="font-heading text-[1.8rem] leading-[0.95] font-medium tracking-[-0.04em] uppercase sm:text-[2.4rem] lg:text-[3rem]">
          Discover Your Style
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-[0.95rem] leading-7 text-muted-foreground">
          Discover made-to-order clothing created for confidence, comfort, and
          self-expression. Choose your style, select your fit, and let each
          piece speak beautifully for you.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/couture"
            className={cn(buttonVariants({ size: "lg" }), "min-w-[180px]")}
          >
            Shop Couture
          </Link>
          <Link
            href="/size-guide"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-w-[180px]"
            )}
          >
            View Size Guide
          </Link>
        </div>
      </div>
    </section>
  )
}
