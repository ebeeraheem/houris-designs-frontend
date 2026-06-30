import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios"
import { getApiBaseUrl } from "./base-url"

export interface ApiClientRequestConfig extends AxiosRequestConfig {
  skipAuthRedirect?: boolean
  skipAuthRefresh?: boolean
  _retryAfterRefresh?: boolean
}

const REFRESH_ENDPOINT = "/api/auth/refresh"

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 15000,
  withCredentials: true,
})

let refreshRequest: Promise<void> | null = null

const refreshRequestConfig: ApiClientRequestConfig = {
  skipAuthRedirect: true,
  skipAuthRefresh: true,
}

function redirectToSignIn() {
  if (typeof window !== "undefined") {
    window.location.href = "/signin"
  }
}

function getRefreshRequest() {
  if (!refreshRequest) {
    refreshRequest = apiClient
      .post(REFRESH_ENDPOINT, undefined, refreshRequestConfig)
      .then(() => undefined)
      .finally(() => {
        refreshRequest = null
      })
  }

  return refreshRequest
}

apiClient.interceptors.request.use((config) => {
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & ApiClientRequestConfig)
      | undefined
    const shouldSkipRedirect = Boolean(originalRequest?.skipAuthRedirect)
    const shouldSkipRefresh = Boolean(originalRequest?.skipAuthRefresh)

    if (error.response?.status !== 401) {
      return Promise.reject(error)
    }

    if (
      originalRequest &&
      !shouldSkipRefresh &&
      !originalRequest._retryAfterRefresh
    ) {
      originalRequest._retryAfterRefresh = true

      try {
        await getRefreshRequest()
        return apiClient(originalRequest)
      } catch (refreshError) {
        if (!shouldSkipRedirect) {
          redirectToSignIn()
        }

        return Promise.reject(refreshError)
      }
    }

    if (!shouldSkipRedirect) {
      redirectToSignIn()
    }

    return Promise.reject(error)
  }
)

export default apiClient
