import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductDetailClient } from "./product-detail-client"

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params

  return (
    <>
      <SiteHeader />
      <ProductDetailClient productId={id} />
      <SiteFooter />
    </>
  )
}
