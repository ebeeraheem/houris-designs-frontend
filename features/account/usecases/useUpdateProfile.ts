import { useMutation, useQueryClient } from "@tanstack/react-query"
import { accountService } from "../account.service"
import { ACCOUNT_QUERY_KEY } from "../account.constants"
import type { UpdateProfilePayload } from "../account.schema"

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      accountService.updateProfile(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ACCOUNT_QUERY_KEY, "profile"],
      })
    },
  })
}
