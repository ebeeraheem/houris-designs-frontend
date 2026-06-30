import { isAxiosError } from "axios"

import apiClient from "@/services/api/client"
import type { ApiClientRequestConfig } from "@/services/api/client"
import { extractApiData } from "@/services/api/extract-api-data"
import type { ApiProfile, ApiShippingAddress } from "./account.types"
import type {
  UpdateProfilePayload,
  ChangeEmailPayload,
  UpdateAddressPayload,
  ChangePasswordPayload,
} from "./account.schema"
import { toUpdateAddressRequest } from "./account.transformer"

const ENDPOINTS = {
  PROFILE: "/api/account/profile",
  CHANGE_EMAIL: "/api/account/email",
  CONFIRM_EMAIL: "/api/account/email/confirm",
  ADDRESS: "/api/account/address",
  CHANGE_PASSWORD: "/api/account/password",
} as const

export const fetchProfile = async (
  config?: ApiClientRequestConfig
): Promise<ApiProfile> => {
  const response = await apiClient.get<ApiProfile | { data: ApiProfile }>(
    ENDPOINTS.PROFILE,
    config
  )
  return extractApiData(response.data)
}

// The initial session probe must be a single fast request: skip the interceptor's
// token-refresh round-trip so a logged-out user resolves immediately. A background
// refresh (see useSessionBootstrap) re-validates returning users with an expired
// access token without blocking first paint.
const quietProfileConfig: ApiClientRequestConfig = {
  skipAuthRedirect: true,
  skipAuthRefresh: true,
}

export const fetchProfileQuiet = async (): Promise<ApiProfile> => {
  return fetchProfile(quietProfileConfig)
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
  // The confirm endpoint is anonymous and the customer clicking the email link
  // may be signed out, so never let a 401 trip the refresh/redirect interceptor.
  const config: ApiClientRequestConfig = {
    params: { code },
    skipAuthRedirect: true,
  }
  await apiClient.get(ENDPOINTS.CONFIRM_EMAIL, config)
}

export const fetchAddress = async (): Promise<ApiShippingAddress | null> => {
  try {
    const response = await apiClient.get<
      ApiShippingAddress | null | { data: ApiShippingAddress | null }
    >(ENDPOINTS.ADDRESS)
    return extractApiData(response.data)
  } catch (error) {
    // The backend returns 404 when the customer has no saved address yet;
    // treat that as "no address" rather than an error.
    if (isAxiosError(error) && error.response?.status === 404) {
      return null
    }
    throw error
  }
}

export const putAddress = async (
  payload: UpdateAddressPayload
): Promise<void> => {
  // The backend responds with 204 No Content, so there is no body to read.
  await apiClient.put(ENDPOINTS.ADDRESS, toUpdateAddressRequest(payload))
}

export const putChangePassword = async (
  payload: ChangePasswordPayload
): Promise<void> => {
  await apiClient.put(ENDPOINTS.CHANGE_PASSWORD, payload)
}
