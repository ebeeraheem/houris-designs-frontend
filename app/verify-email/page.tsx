import { PageReveal } from "@/components/page-reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { VerifyEmailStatus } from "@/features/authentication/components"

interface VerifyEmailPageProps {
  searchParams: Promise<{
    code?: string
  }>
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const params = await searchParams

  return (
    <>
      <SiteHeader />
      <main className="min-h-svh px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <PageReveal className="mx-auto max-w-[30rem]">
          <div data-page-intro className="mb-8 text-center">
            <p className="eyebrow-label text-brand">Email Verification</p>
            <h1 className="mt-3 font-heading text-[1.8rem] leading-[0.92] font-medium tracking-[-0.05em] uppercase sm:text-[2.2rem]">
              Verify Your Email
            </h1>
          </div>

          <div data-page-section>
            <VerifyEmailStatus code={params.code ?? null} />
          </div>
        </PageReveal>
      </main>
      <SiteFooter />
    </>
  )
}
