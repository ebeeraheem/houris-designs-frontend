import { PageReveal } from "@/components/page-reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { LegalPage, privacyDocument } from "@/features/legal"

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="py-6 sm:py-10 lg:py-14">
        <div className="page-shell">
          <PageReveal>
            <LegalPage document={privacyDocument} />
          </PageReveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
