import Link from "next/link"

import { PageReveal } from "@/components/page-reveal"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ForgotPasswordForm } from "@/features/authentication/components"

export default function ForgotPasswordPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-svh px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <PageReveal className="mx-auto max-w-[28rem]">
          <div data-page-intro className="mb-8 text-center">
            <p className="eyebrow-label text-brand">Reset Password</p>
            <h1 className="mt-3 font-heading text-[1.8rem] leading-[0.92] font-medium tracking-[-0.05em] uppercase sm:text-[2.2rem]">
              Forgot Password
            </h1>
            <p className="mt-3 text-[0.78rem] leading-6 text-muted-foreground">
              Enter your email and we&apos;ll send you a link to reset your
              password.
            </p>
          </div>

          <div data-page-section>
            <ForgotPasswordForm />
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
