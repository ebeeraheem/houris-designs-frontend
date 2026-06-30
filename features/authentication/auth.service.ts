import {
  postRegister,
  postLogin,
  postLogout,
  postRefresh,
  postForgotPassword,
  postResetPassword,
} from "./auth.adapter"
import type { ApiAuthResponse } from "./auth.types"
import type {
  RegisterPayload,
  LoginPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from "./auth.schema"

export const authService = {
  register: (payload: RegisterPayload): Promise<ApiAuthResponse> => {
    return postRegister(payload)
  },

  login: (payload: LoginPayload): Promise<ApiAuthResponse> => {
    return postLogin(payload)
  },

  logout: (): Promise<ApiAuthResponse> => {
    return postLogout()
  },

  refresh: (): Promise<ApiAuthResponse> => {
    return postRefresh()
  },

  forgotPassword: (
    payload: ForgotPasswordPayload
  ): Promise<ApiAuthResponse> => {
    return postForgotPassword(payload)
  },

  resetPassword: (payload: ResetPasswordPayload): Promise<ApiAuthResponse> => {
    return postResetPassword(payload)
  },
}
