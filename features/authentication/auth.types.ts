export interface ApiAuthResponse {
  success: boolean
  message: string
}

export interface ApiRegisterRequest {
  fullName: string
  email: string
  password: string
}

export interface ApiLoginRequest {
  email: string
  password: string
}

export interface ApiForgotPasswordRequest {
  email: string
}

export interface ApiResetPasswordRequest {
  email: string
  token: string
  newPassword: string
}

export interface AuthUser {
  id: string
  email: string
  fullName: string
  role: "Customer"
}
