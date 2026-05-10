import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../auth.service"
import type { LoginPayload } from "../auth.schema"
import { syncAuthProfile } from "./useAuthProfile"

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: async () => {
      await syncAuthProfile(queryClient)
    },
  })
}
