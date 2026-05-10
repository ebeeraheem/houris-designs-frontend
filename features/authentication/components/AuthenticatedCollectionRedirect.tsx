"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { PRODUCT_ROUTES } from "@/features/products"
import { useAuthSession } from "../usecases/useAuthProfile"

export function AuthenticatedCollectionRedirect() {
  const router = useRouter()
  const { data: session } = useAuthSession()

  useEffect(() => {
    if (!session?.isAuthenticated) {
      return
    }

    router.replace(PRODUCT_ROUTES.LIST)
  }, [router, session?.isAuthenticated])

  return null
}
