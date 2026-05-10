import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../auth.service"
import type { RegisterPayload } from "../auth.schema"
import { syncAuthProfile } from "./useAuthProfile"

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: async () => {
      await syncAuthProfile(queryClient)
    },
  })
}
