import { PageReveal } from "@/components/page-reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ContactPageView } from "@/features/contact"

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden py-6 sm:py-10 lg:py-14">
        <div className="page-shell">
          <PageReveal>
            <ContactPageView />
          </PageReveal>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
