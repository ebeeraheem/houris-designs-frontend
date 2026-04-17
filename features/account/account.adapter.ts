import apiClient from "@/services/api/client"
import { extractApiData } from "@/services/api/extract-api-data"
import type { ApiProfile, ApiShippingAddress } from "./account.types"
import type {
  UpdateProfilePayload,
  ChangeEmailPayload,
  UpdateAddressPayload,
  ChangePasswordPayload,
} from "./account.schema"

const ENDPOINTS = {
  PROFILE: "/api/account/profile",
  CHANGE_EMAIL: "/api/account/email",
  CONFIRM_EMAIL: "/api/account/email/confirm",
  ADDRESS: "/api/account/address",
  CHANGE_PASSWORD: "/api/account/password",
} as const

export const fetchProfile = async (): Promise<ApiProfile> => {
  const response = await apiClient.get<ApiProfile | { data: ApiProfile }>(
    ENDPOINTS.PROFILE
  )
  return extractApiData(response.data)
}

export const patchProfile = async (
  payload: UpdateProfilePayload
): Promise<ApiProfile> => {
  const response = await apiClient.put<ApiProfile | { data: ApiProfile }>(
    ENDPOINTS.PROFILE,
    payload
  )
  return extractApiData(response.data)
}

export const postChangeEmail = async (
  payload: ChangeEmailPayload
): Promise<void> => {
  await apiClient.post(ENDPOINTS.CHANGE_EMAIL, payload)
}

export const getConfirmEmailChange = async (code: string): Promise<void> => {
  await apiClient.get(ENDPOINTS.CONFIRM_EMAIL, {
    params: { code },
  })
}

export const fetchAddress = async (): Promise<ApiShippingAddress | null> => {
  const response = await apiClient.get<
    ApiShippingAddress | null | { data: ApiShippingAddress | null }
  >(ENDPOINTS.ADDRESS)
  return extractApiData(response.data)
}

export const putAddress = async (
  payload: UpdateAddressPayload
): Promise<ApiShippingAddress> => {
  const response = await apiClient.put<
    ApiShippingAddress | { data: ApiShippingAddress }
  >(ENDPOINTS.ADDRESS, payload)
  return extractApiData(response.data)
}

export const putChangePassword = async (
  payload: ChangePasswordPayload
): Promise<void> => {
  await apiClient.put(ENDPOINTS.CHANGE_PASSWORD, payload)
}
