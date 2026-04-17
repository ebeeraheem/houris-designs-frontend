import { useMutation } from "@tanstack/react-query"
import { authService } from "../auth.service"
import type { ResetPasswordPayload } from "../auth.schema"

export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      authService.resetPassword(payload),
  })
}
