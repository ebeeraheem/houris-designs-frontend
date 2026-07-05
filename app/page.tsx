import {
  EditorialHero,
  FeaturedCollection,
  BrandEthos,
} from "@/features/landing/components"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <EditorialHero />
      <FeaturedCollection />
      <BrandEthos />
      <SiteFooter />
    </>
  )
}
