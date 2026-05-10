import { useMutation } from "@tanstack/react-query"
import { accountService } from "../account.service"
import type { ChangeEmailPayload } from "../account.schema"

export function useRequestEmailChange() {
  return useMutation({
    mutationFn: (payload: ChangeEmailPayload) =>
      accountService.requestEmailChange(payload),
  })
}
