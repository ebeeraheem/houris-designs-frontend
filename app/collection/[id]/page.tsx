import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getDemoProductById } from "@/features/products/demo-products"
import { ProductDetailClient } from "./product-detail-client"

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params
  const product = getDemoProductById(id)

  if (!product) {
    return (
      <>
        <SiteHeader />
        <main className="min-h-svh px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-muted-foreground">Product not found</p>
        </main>
        <SiteFooter />
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <ProductDetailClient product={product} />
      <SiteFooter />
    </>
  )
}
