import { useMutation } from "@tanstack/react-query"
import { accountService } from "../account.service"
import type { ChangePasswordPayload } from "../account.schema"

export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      accountService.changePassword(payload),
  })
}
