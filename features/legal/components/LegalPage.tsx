import type { LegalDocument } from "../legal-content"

interface LegalPageProps {
  document: LegalDocument
}

export function LegalPage({ document }: LegalPageProps) {
  return (
    <article className="mx-auto max-w-4xl">
      <header className="border-b border-border pb-10">
        <p className="eyebrow-label text-brand">{document.eyebrow}</p>
        <h1 className="mt-4 font-heading text-[2.2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[3rem] lg:text-[4rem]">
          {document.title}
        </h1>
        <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
          {document.description}
        </p>
        <p className="mt-5 text-xs font-medium tracking-[0.16em] text-foreground/50 uppercase">
          Last updated: {document.lastUpdated}
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {document.sections.map((section) => (
          <section key={section.title} className="scroll-mt-24">
            <h2 className="section-heading">{section.title}</h2>
            {section.paragraphs ? (
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}
            {section.bullets ? (
              <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-3 size-1.5 shrink-0 rounded-full bg-brand/70" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  )
}
