import { accountRepository } from "./account.repository"
import type { Profile, ShippingAddress } from "./account.types"
import type {
  UpdateProfilePayload,
  ChangeEmailPayload,
  UpdateAddressPayload,
  ChangePasswordPayload,
} from "./account.schema"

export const accountService = {
  getProfile: (): Promise<Profile> => {
    return accountRepository.getProfile()
  },

  updateProfile: (payload: UpdateProfilePayload): Promise<Profile> => {
    return accountRepository.updateProfile(payload)
  },

  requestEmailChange: (payload: ChangeEmailPayload): Promise<void> => {
    return accountRepository.requestEmailChange(payload)
  },

  confirmEmailChange: (code: string): Promise<void> => {
    return accountRepository.confirmEmailChange(code)
  },

  getAddress: (): Promise<ShippingAddress | null> => {
    return accountRepository.getAddress()
  },

  updateAddress: (payload: UpdateAddressPayload): Promise<ShippingAddress> => {
    return accountRepository.updateAddress(payload)
  },

  changePassword: (payload: ChangePasswordPayload): Promise<void> => {
    return accountRepository.changePassword(payload)
  },
}
