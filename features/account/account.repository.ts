import type { Profile, ShippingAddress } from "./account.types"
import type {
  UpdateProfilePayload,
  ChangeEmailPayload,
  UpdateAddressPayload,
  ChangePasswordPayload,
} from "./account.schema"
import {
  fetchProfile,
  patchProfile,
  postChangeEmail,
  getConfirmEmailChange,
  fetchAddress,
  putAddress,
  putChangePassword,
} from "./account.adapter"
import { toProfile, toShippingAddress } from "./account.transformer"

export interface IAccountRepository {
  getProfile(): Promise<Profile>
  updateProfile(payload: UpdateProfilePayload): Promise<Profile>
  requestEmailChange(payload: ChangeEmailPayload): Promise<void>
  confirmEmailChange(code: string): Promise<void>
  getAddress(): Promise<ShippingAddress | null>
  updateAddress(payload: UpdateAddressPayload): Promise<ShippingAddress>
  changePassword(payload: ChangePasswordPayload): Promise<void>
}

export const accountRepository: IAccountRepository = {
  getProfile: async () => {
    const raw = await fetchProfile()
    return toProfile(raw)
  },

  updateProfile: async (payload) => {
    const raw = await patchProfile(payload)
    return toProfile(raw)
  },

  requestEmailChange: async (payload) => {
    await postChangeEmail(payload)
  },

  confirmEmailChange: async (code) => {
    await getConfirmEmailChange(code)
  },

  getAddress: async () => {
    const raw = await fetchAddress()
    if (!raw) return null
    return toShippingAddress(raw)
  },

  updateAddress: async (payload) => {
    const raw = await putAddress(payload)
    return toShippingAddress(raw)
  },

  changePassword: async (payload) => {
    await putChangePassword(payload)
  },
}
