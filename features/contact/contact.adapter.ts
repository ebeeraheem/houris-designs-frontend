import apiClient from "@/services/api/client"
import type { ApiClientRequestConfig } from "@/services/api/client"
import type { ContactPayload } from "./contact.schema"
import type { ContactResponse } from "./contact.types"

const ENDPOINTS = {
  CONTACT: "/api/contact",
} as const

const contactRequestConfig: ApiClientRequestConfig = {
  skipAuthRedirect: true,
  skipAuthRefresh: true,
}

export const postContactMessage = async (
  payload: ContactPayload
): Promise<ContactResponse> => {
  const response = await apiClient.post(
    ENDPOINTS.CONTACT,
    payload,
    contactRequestConfig
  )

  return { status: response.status }
}
