"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  AboutHero,
  StorySection,
  StatsSection,
  ValuesSection,
  CraftsmanshipSection,
  AboutCTA,
} from "@/features/about/components"

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden">
        <AboutHero />
        <StorySection />
        <StatsSection />
        <ValuesSection />
        <CraftsmanshipSection />
        <AboutCTA />
      </main>
      <SiteFooter />
    </>
  )
}
