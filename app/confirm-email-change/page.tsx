import { PageReveal } from "@/components/page-reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ConfirmEmailChangeView } from "@/features/account/components"

interface ConfirmEmailChangePageProps {
  searchParams: Promise<{
    code?: string
  }>
}

export default async function ConfirmEmailChangePage({
  searchParams,
}: Readonly<ConfirmEmailChangePageProps>) {
  const { code } = await searchParams

  return (
    <>
      <SiteHeader />
      <main className="min-h-svh px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <PageReveal className="mx-auto max-w-[34rem]">
          <ConfirmEmailChangeView code={code} />
        </PageReveal>
      </main>
      <SiteFooter />
    </>
  )
}
