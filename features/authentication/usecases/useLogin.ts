import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../auth.service"
import { AUTH_QUERY_KEY } from "../auth.constants"
import type { LoginPayload } from "../auth.schema"

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] })
    },
  })
}
