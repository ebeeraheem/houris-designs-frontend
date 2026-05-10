import { PageReveal } from "@/components/page-reveal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { OrderDetailView } from "@/features/orders/components/OrderDetailView"

interface OrderDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params

  return (
    <>
      <SiteHeader />
      <main className="min-h-svh py-8 sm:py-12 lg:py-16">
        <PageReveal className="page-shell">
          <OrderDetailView orderId={id} />
        </PageReveal>
      </main>
      <SiteFooter />
    </>
  )
}
