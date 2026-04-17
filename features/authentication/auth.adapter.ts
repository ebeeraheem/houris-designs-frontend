import apiClient from "@/services/api/client"
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

export const postRegister = async (
  payload: RegisterPayload
): Promise<ApiAuthResponse> => {
  const response = await apiClient.post<ApiAuthResponse>(
    ENDPOINTS.REGISTER,
    payload
  )
  return response.data
}

export const postLogin = async (
  payload: LoginPayload
): Promise<ApiAuthResponse> => {
  const response = await apiClient.post<ApiAuthResponse>(
    ENDPOINTS.LOGIN,
    payload
  )
  return response.data
}

export const postLogout = async (): Promise<ApiAuthResponse> => {
  const response = await apiClient.post<ApiAuthResponse>(ENDPOINTS.LOGOUT)
  return response.data
}

export const postRefresh = async (): Promise<ApiAuthResponse> => {
  const response = await apiClient.post<ApiAuthResponse>(ENDPOINTS.REFRESH)
  return response.data
}

export const postForgotPassword = async (
  payload: ForgotPasswordPayload
): Promise<ApiAuthResponse> => {
  const response = await apiClient.post<ApiAuthResponse>(
    ENDPOINTS.FORGOT_PASSWORD,
    payload
  )
  return response.data
}

export const postResetPassword = async (
  payload: ResetPasswordPayload
): Promise<ApiAuthResponse> => {
  const response = await apiClient.post<ApiAuthResponse>(
    ENDPOINTS.RESET_PASSWORD,
    payload
  )
  return response.data
}
