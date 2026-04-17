import Link from "next/link"

import { PageReveal } from "@/components/page-reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ResetPasswordForm } from "@/features/authentication/components"

interface ResetPasswordPageProps {
  searchParams: Promise<{
    email?: string
    token?: string
  }>
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams

  return (
    <>
      <SiteHeader />
      <main className="min-h-svh px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <PageReveal className="mx-auto max-w-[30rem]">
          <div data-page-intro className="mb-8 text-center">
            <p className="eyebrow-label text-brand">Reset Password</p>
            <h1 className="mt-3 font-heading text-[1.8rem] leading-[0.92] font-medium tracking-[-0.05em] uppercase sm:text-[2.2rem]">
              Choose a New Password
            </h1>
            <p className="mt-3 text-[0.78rem] leading-6 text-muted-foreground">
              This screen now matches the live API contract: email, reset token,
              and new password.
            </p>
          </div>

          <div data-page-section>
            <ResetPasswordForm
              defaultEmail={params.email}
              defaultToken={params.token}
            />
          </div>

          <p
            data-page-section
            className="mt-6 text-center text-[0.78rem] text-muted-foreground"
          >
            Remember your password?{" "}
            <Link href="/signin" className="text-brand hover:underline">
              Sign in
            </Link>
          </p>
        </PageReveal>
      </main>
      <SiteFooter />
    </>
  )
}
