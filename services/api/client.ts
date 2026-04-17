import axios from "axios"

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/signin"
    }
    return Promise.reject(error)
  }
)

export default apiClient
