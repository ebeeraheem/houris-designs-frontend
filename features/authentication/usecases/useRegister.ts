import { useMutation } from "@tanstack/react-query"
import { authService } from "../auth.service"
import type { RegisterPayload } from "../auth.schema"

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
  })
}
