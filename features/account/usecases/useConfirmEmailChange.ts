"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { accountService } from "../account.service"
import { ACCOUNT_QUERY_KEY } from "../account.constants"

export function useConfirmEmailChange() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (code: string) => accountService.confirmEmailChange(code),
    onSuccess: async () => {
      // Refresh the cached profile so a signed-in user sees the new email.
      await queryClient.invalidateQueries({
        queryKey: [ACCOUNT_QUERY_KEY, "profile"],
      })
    },
  })
}
