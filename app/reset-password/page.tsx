import { PageReveal } from "@/components/page-reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ResetPasswordForm } from "@/features/authentication/components"

interface ResetPasswordPageProps {
  searchParams: Promise<{
    code?: string
  }>
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { code } = await searchParams

  return (
    <>
      <SiteHeader />
      <main className="min-h-svh px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <PageReveal className="mx-auto max-w-[28rem]">
          <div data-page-intro className="mb-8 text-center">
            <h1 className="font-heading text-[1.8rem] leading-[0.92] font-medium tracking-[-0.05em] uppercase sm:text-[2.2rem]">
              Choose a New Password
            </h1>
          </div>

          <div data-page-section>
            <ResetPasswordForm code={code} />
          </div>
        </PageReveal>
      </main>
      <SiteFooter />
    </>
  )
}
