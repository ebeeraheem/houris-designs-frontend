import apiClient from "@/services/api/client"
import type { ApiSizeGuideResponse } from "./size.types"

const ENDPOINTS = {
  GUIDE: "/api/sizes",
} as const

export const fetchSizeGuide = async (): Promise<ApiSizeGuideResponse> => {
  const response = await apiClient.get<ApiSizeGuideResponse>(ENDPOINTS.GUIDE)
  return response.data
}
