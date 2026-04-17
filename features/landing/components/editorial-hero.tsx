"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Button } from "@/components/ui/button"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const collageImages = [
  {
    src: "/images/editorial/blue-coat.jpg",
    alt: "Model in a powder blue tailored coat standing in front of dramatic architecture.",
    className: "lg:col-span-5 lg:row-span-2 lg:pt-4",
    imageClassName:
      "h-[16rem] sm:h-[22rem] md:h-[26rem] lg:h-[min(52vh,32rem)]",
    motion: { x: 20, y: 16, rotate: -1.4 },
  },
  {
    src: "/images/editorial/yellow-look.jpg",
    alt: "Woman in a vibrant yellow fashion set posing in sunlight.",
    className:
      "lg:col-start-9 lg:col-span-3 lg:row-start-1 lg:mt-20 lg:self-start",
    imageClassName:
      "h-[11rem] sm:h-[14rem] md:h-[16rem] lg:h-[min(24vh,18rem)]",
    motion: { x: 16, y: 12, rotate: 1.8 },
  },
  {
    src: "/images/editorial/boutique-rack.jpg",
    alt: "Curated rack of premium garments in a softly lit studio.",
    className:
      "sm:max-w-[80%] lg:col-start-6 lg:col-span-4 lg:row-start-2 lg:mt-8 lg:max-w-none lg:self-end",
    imageClassName:
      "h-[11rem] sm:h-[15rem] md:h-[18rem] lg:h-[min(34vh,22rem)]",
    motion: { x: 18, y: -14, rotate: -1.2 },
  },
]

export function EditorialHero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const shell = root.current

      if (!shell) {
        return
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      if (reduceMotion) {
        gsap.set("[data-reveal]", {
          clipPath: "inset(0% 0% 0% 0%)",
        })
        gsap.set("[data-media]", { scale: 1 })
        return
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", shell)
      const media = gsap.utils.toArray<HTMLElement>("[data-media]", shell)
      const pointerFine = window.matchMedia("(pointer: fine)").matches

      gsap.set("[data-reveal]", {
        clipPath: "inset(0% 0% 100% 0%)",
      })
      gsap.set(media, { scale: 1.16 })

      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      })

      intro
        .from("[data-header]", {
          y: -10,
          duration: 0.45,
        })
        .to(
          "[data-reveal]",
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.15,
            stagger: 0.14,
            ease: "power4.out",
          },
          "-=0.1"
        )
        .to(
          media,
          {
            scale: 1,
            duration: 1.75,
            stagger: 0.1,
            ease: "power3.out",
          },
          "<"
        )
        .from(
          "[data-copy]",
          {
            y: 34,
            autoAlpha: 0,
            duration: 0.82,
            stagger: 0.1,
          },
          "-=1"
        )
        .from(
          "[data-vertical]",
          {
            y: 24,
            autoAlpha: 0,
            duration: 0.8,
          },
          "-=0.95"
        )
        .from(
          "[data-caption-line]",
          {
            scaleY: 0,
            transformOrigin: "center top",
            duration: 1,
          },
          "-=0.8"
        )

      cards.forEach((card, index) => {
        const { rotate, y } = collageImages[index].motion

        gsap.to(card, {
          y,
          rotation: rotate,
          duration: 4.8 + index,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        })
      })

      media.forEach((layer, index) => {
        gsap.to(layer, {
          yPercent: index === 0 ? -6 : index === 1 ? -10 : -4,
          ease: "none",
          scrollTrigger: {
            trigger: shell,
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        })
      })

      if (!pointerFine) {
        return
      }

      const motionSetters = cards.map((card, index) => ({
        xTo: gsap.quickTo(card, "x", {
          duration: 0.8,
          ease: "power3.out",
        }),
        baseX: collageImages[index].motion.x,
      }))

      const onPointerMove = (event: PointerEvent) => {
        const bounds = shell.getBoundingClientRect()
        const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5

        motionSetters.forEach((setters, index) => {
          const amplitude = index === 0 ? 10 : 14

          setters.xTo(normalizedX * amplitude + setters.baseX * 0.2)
        })
      }

      const onPointerLeave = () => {
        motionSetters.forEach((setters) => {
          setters.xTo(setters.baseX * 0.2)
        })
      }

      shell.addEventListener("pointermove", onPointerMove)
      shell.addEventListener("pointerleave", onPointerLeave)

      return () => {
        shell.removeEventListener("pointermove", onPointerMove)
        shell.removeEventListener("pointerleave", onPointerLeave)
      }
    },
    { scope: root }
  )

  return (
    <main ref={root} className="min-h-svh">
      <section className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <div className="relative pb-6 sm:pb-8 lg:min-h-[calc(100svh-5rem)] lg:pb-8">
          <div
            id="collection"
            className="relative z-10 grid gap-4 sm:gap-5 lg:grid-cols-12 lg:grid-rows-[minmax(14rem,auto)_auto] lg:gap-x-8 lg:gap-y-4"
          >
            <div className="hidden lg:col-span-1 lg:col-start-9 lg:row-start-1 lg:flex lg:justify-center lg:self-end">
              <div className="flex items-start gap-4">
                <span
                  data-vertical
                  style={{ writingMode: "vertical-rl" }}
                  className="eyebrow-label text-foreground/78"
                >
                  Archival Material / 2024
                </span>
                <span
                  data-caption-line
                  className="mt-0.5 h-36 w-px bg-foreground/14"
                />
              </div>
            </div>

            <article
              className={`${collageImages[0].className} relative`}
              data-card
            >
              <div data-reveal className="image-shell">
                <div
                  data-media
                  className={`relative ${collageImages[0].imageClassName}`}
                >
                  <Image
                    src={collageImages[0].src}
                    alt={collageImages[0].alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="max-w-[24rem] space-y-3 pt-4 sm:space-y-4 sm:pt-5 lg:max-w-[28rem]">
                <p data-copy className="eyebrow-label text-brand">
                  Series 01
                </p>
                <h1
                  data-copy
                  className="max-w-[18rem] font-heading text-[2rem] leading-[0.9] font-medium tracking-[-0.07em] text-foreground uppercase sm:max-w-[22rem] sm:text-[2.75rem] md:text-[3.1rem] lg:max-w-[24rem] lg:text-[clamp(3rem,5.2vw,4.2rem)]"
                >
                  The linear collection
                </h1>
                <p
                  data-copy
                  className="max-w-[24rem] text-sm leading-6 text-muted-foreground sm:text-[0.92rem] sm:leading-7"
                >
                  Custom-fitted silhouettes engineered for the modern
                  architectural wardrobe. Refined, precise, effortless.
                </p>
                <div data-copy className="pt-0.5">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-foreground/70 bg-background/75 backdrop-blur-sm hover:border-brand hover:bg-accent"
                  >
                    Explore series 01
                  </Button>
                </div>
              </div>
            </article>

            <article
              className={`${collageImages[1].className} relative`}
              data-card
            >
              <div data-reveal className="image-shell">
                <div
                  data-media
                  className={`relative ${collageImages[1].imageClassName}`}
                >
                  <Image
                    src={collageImages[1].src}
                    alt={collageImages[1].alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </article>

            <article
              className={`${collageImages[2].className} relative`}
              data-card
            >
              <div data-reveal className="image-shell">
                <div
                  data-media
                  className={`relative ${collageImages[2].imageClassName}`}
                >
                  <Image
                    src={collageImages[2].src}
                    alt={collageImages[2].alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 80vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </article>
          </div>

          <div className="relative z-10 mt-8 flex items-end justify-between gap-6 border-t border-transparent pt-2 text-[0.68rem] font-medium tracking-[0.26em] text-foreground/50 uppercase sm:mt-10">
            <span data-copy>Studio-coded with GSAP motion</span>
            <span data-copy className="hidden sm:inline">
              Oxblood accent mapped to logo tone
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}
