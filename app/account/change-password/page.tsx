import { BackIconLink } from "@/components/ui/back-icon-link"
import { PageReveal } from "@/components/page-reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { EditorialHero } from "@/components/shared/EditorialHero"
import { ChangePasswordForm } from "@/features/account/components"
import { AuthCheckList } from "@/features/authentication/components"

const securityChecks = [
  "Orders, addresses, and saved details stay protected behind a fresh credential.",
  "Your change is encrypted in transit and takes effect as soon as you confirm it.",
  "A memorable passphrase is often stronger than a short, complex-looking password.",
]

export default function ChangePasswordPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden py-6 sm:py-10 lg:py-14">
        {/* <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-112 bg-[radial-gradient(circle_at_top,rgba(133,81,66,0.2),transparent_58%)]"
        /> */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-28 right-[8%] -z-10 hidden h-56 w-56 rounded-full bg-brand/10 blur-3xl lg:block"
        />

        <div className="page-shell">
          <PageReveal>
            <div className="flex items-start gap-4 sm:gap-5">
              <BackIconLink
                data-page-intro
                href="/account"
                label="Back to account"
                className="mt-1 shrink-0"
              />

              <div className="grid min-w-0 flex-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] xl:gap-8">
                <section
                  data-page-intro
                  className="surface-card relative overflow-hidden p-4 sm:p-6 lg:p-8"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-40 bg-linear-to-br from-brand/16 via-brand/5 to-transparent"
                  />

                  <div className="relative">
                    <p className="eyebrow-label text-brand">Security Atelier</p>
                    <h1 className="mt-4 max-w-[12ch] font-heading text-[2.35rem] leading-[0.88] font-medium tracking-[-0.08em] uppercase sm:text-[3.2rem]">
                      Change your password in a calmer, sharper flow.
                    </h1>
                    <p className="mt-4 max-w-136 text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                      Refresh the password tied to your account to keep orders,
                      addresses, and saved preferences protected without losing
                      the premium feel of the experience.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <div className="status-pill border-brand/20 bg-brand/10 text-brand">
                        Encrypted update
                      </div>
                      <div className="status-pill border-border bg-background/80 text-foreground/78">
                        Takes under a minute
                      </div>
                    </div>

                    <ChangePasswordForm />
                  </div>
                </section>

                <aside className="grid content-start gap-6 self-start">
                  <div data-page-media>
                    <EditorialHero
                      imageSrc="/images/editorial/blue-coat.jpg"
                      imageAlt="Model in a powder blue tailored coat standing in front of dramatic architecture."
                      badge="Private Account Protection"
                      title="A small update,<br />a stronger account."
                      description="Refresh your credentials regularly to keep the details behind every order feeling personal and protected."
                    />
                  </div>

                  <div data-page-section>
                    <AuthCheckList
                      title="Why It Matters"
                      items={securityChecks}
                    />
                  </div>
                </aside>
              </div>
            </div>
          </PageReveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
