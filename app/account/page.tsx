import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { AccountPageView } from "@/features/account/components"

export default function AccountPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden py-6 sm:py-10 lg:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-32 left-[6%] -z-10 hidden h-56 w-56 rounded-full bg-brand/8 blur-3xl lg:block"
        />
        <AccountPageView />
      </main>
      <SiteFooter />
    </>
  )
}
