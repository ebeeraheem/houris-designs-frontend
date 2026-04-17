import { useMutation, useQueryClient } from "@tanstack/react-query"
import { accountService } from "../account.service"
import { ACCOUNT_QUERY_KEY } from "../account.constants"
import type { UpdateAddressPayload } from "../account.schema"

export function useUpdateAddress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateAddressPayload) =>
      accountService.updateAddress(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ACCOUNT_QUERY_KEY, "address"],
      })
    },
  })
}
