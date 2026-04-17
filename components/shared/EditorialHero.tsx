import Image from "next/image"

interface EditorialHeroProps {
  imageSrc: string
  imageAlt: string
  badge: string
  title: string
  description: string
}

export function EditorialHero({
  imageSrc,
  imageAlt,
  badge,
  title,
  description,
}: EditorialHeroProps) {
  return (
    <div className="relative min-h-[24rem] overflow-hidden rounded-[1.6rem] border border-border/70 bg-card shadow-lift">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="(min-width: 1280px) 32rem, (min-width: 1024px) 38vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#211814]/88 via-[#211814]/28 to-transparent" />

      <div className="absolute top-5 left-5 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[0.68rem] font-medium tracking-[0.2em] text-white/84 uppercase backdrop-blur-sm">
        {badge}
      </div>

      <div className="absolute inset-x-5 bottom-5 rounded-[1.25rem] border border-white/15 bg-black/35 p-5 text-white backdrop-blur-md">
        <p
          className="font-editorial text-[2.1rem] leading-[0.92] tracking-[-0.04em]"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="mt-3 text-sm leading-6 text-white/78">{description}</p>
      </div>
    </div>
  )
}
