import Link from "next/link"

import { PageReveal } from "@/components/page-reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import {
  AuthenticatedCollectionRedirect,
  SignInForm,
} from "@/features/authentication/components"
import { getSafeReturnUrl } from "@/features/authentication/returnUrl"

interface SignInPageProps {
  searchParams: Promise<{
    returnUrl?: string | string[]
  }>
}

export default async function SignInPage({
  searchParams,
}: Readonly<SignInPageProps>) {
  const { returnUrl } = await searchParams
  const safeReturnUrl = getSafeReturnUrl(returnUrl) ?? undefined

  return (
    <>
      <AuthenticatedCollectionRedirect returnUrl={safeReturnUrl} />
      <SiteHeader />
      <main className="min-h-svh px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <PageReveal className="mx-auto max-w-[28rem]">
          <div data-page-intro className="mb-8 text-center">
            <h1 className="font-heading text-[1.8rem] leading-[0.92] font-medium tracking-[-0.05em] uppercase sm:text-[2.2rem]">
              Sign In
            </h1>
          </div>

          <div data-page-section>
            <SignInForm returnUrl={safeReturnUrl} />
          </div>

          <p
            data-page-section
            className="mt-6 text-center text-[0.78rem] text-muted-foreground"
          >
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-brand hover:underline">
              Create one
            </Link>
          </p>
        </PageReveal>
      </main>
      <SiteFooter />
    </>
  )
}
