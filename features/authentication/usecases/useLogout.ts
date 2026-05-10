import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../auth.service"
import { ACCOUNT_QUERY_KEY } from "@/features/account/account.constants"
import { clearAuthSession } from "./useAuthProfile"

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: async () => {
      clearAuthSession(queryClient)
      await queryClient.removeQueries({ queryKey: [ACCOUNT_QUERY_KEY] })
    },
  })
}
