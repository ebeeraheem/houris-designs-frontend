import apiClient from "@/services/api/client"
import type { ApiClientRequestConfig } from "@/services/api/client"
import type { ApiAuthResponse } from "./auth.types"
import type {
  RegisterPayload,
  LoginPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from "./auth.schema"

const ENDPOINTS = {
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  REFRESH: "/api/auth/refresh",
  FORGOT_PASSWORD: "/api/auth/forgot-password",
  RESET_PASSWORD: "/api/auth/reset-password",
} as const

const authRequestConfig: ApiClientRequestConfig = {
  skipAuthRedirect: true,
  skipAuthRefresh: true,
}

export const postRegister = async (
  payload: RegisterPayload
): Promise<ApiAuthResponse> => {
  const response = await apiClient.post(
    ENDPOINTS.REGISTER,
    payload,
    authRequestConfig
  )
  return { status: response.status }
}

export const postLogin = async (
  payload: LoginPayload
): Promise<ApiAuthResponse> => {
  const response = await apiClient.post(
    ENDPOINTS.LOGIN,
    payload,
    authRequestConfig
  )
  return { status: response.status }
}

export const postLogout = async (): Promise<ApiAuthResponse> => {
  const response = await apiClient.post(
    ENDPOINTS.LOGOUT,
    undefined,
    authRequestConfig
  )
  return { status: response.status }
}

export const postRefresh = async (): Promise<ApiAuthResponse> => {
  const response = await apiClient.post(
    ENDPOINTS.REFRESH,
    undefined,
    authRequestConfig
  )
  return { status: response.status }
}

export const postForgotPassword = async (
  payload: ForgotPasswordPayload
): Promise<ApiAuthResponse> => {
  const response = await apiClient.post(
    ENDPOINTS.FORGOT_PASSWORD,
    payload,
    authRequestConfig
  )
  return { status: response.status }
}

export const postResetPassword = async (
  payload: ResetPasswordPayload
): Promise<ApiAuthResponse> => {
  const response = await apiClient.post(
    ENDPOINTS.RESET_PASSWORD,
    payload,
    authRequestConfig
  )
  return { status: response.status }
}
