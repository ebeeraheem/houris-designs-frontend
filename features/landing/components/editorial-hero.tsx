import Image from "next/image"
import Link from "next/link"

const heroImage = "/images/HeroImages/IMG_8270.jpeg"

export function EditorialHero() {
  return (
    <main className="min-h-svh">
      <section className="relative h-[calc(100svh-4rem)] overflow-hidden">
        <Image
          src={heroImage}
          alt="Houris Designs"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 pb-16 sm:px-12 sm:pb-20 lg:px-16 lg:pb-24">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl space-y-4 sm:space-y-5 lg:space-y-6">
                <h1 className="font-heading text-[2.8rem] leading-[0.88] font-medium text-white uppercase sm:text-[4rem] lg:text-[clamp(4rem,6vw,5.5rem)]">
                  HOURIS DESIGNS
                </h1>
                <p className="max-w-[32rem] text-[1rem] leading-7 text-white/90 sm:text-lg">
                  the beautiful people
                </p>
                <Link
                  href="/couture"
                  className="group/link inline-flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.22em] text-white uppercase transition-colors duration-200 hover:text-brand"
                >
                  Explore Couture
                  <span className="inline-flex size-8 items-center justify-center rounded-[var(--radius)] border border-white/30 transition-all duration-200 group-hover/link:border-brand group-hover/link:bg-brand group-hover/link:text-brand-foreground">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="translate-x-px transition-transform duration-200 group-hover/link:translate-x-0.5"
                    >
                      <path
                        d="M4 2L8 6L4 10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
