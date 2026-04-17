import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../auth.service"
import { AUTH_QUERY_KEY } from "../auth.constants"

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] })
      await queryClient.removeQueries({ queryKey: [AUTH_QUERY_KEY] })
    },
  })
}
