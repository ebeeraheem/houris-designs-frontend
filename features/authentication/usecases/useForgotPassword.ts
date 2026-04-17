import { useMutation } from "@tanstack/react-query"
import { authService } from "../auth.service"
import type { ForgotPasswordPayload } from "../auth.schema"

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      authService.forgotPassword(payload),
  })
}
