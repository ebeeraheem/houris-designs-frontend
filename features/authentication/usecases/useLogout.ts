import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../auth.service"
import { ACCOUNT_QUERY_KEY } from "@/features/account/account.constants"
import { LEGACY_SHIPPING_ADDRESS_STORAGE_KEY } from "@/features/orders/checkout.constants"
import { clearAuthSession } from "./useAuthProfile"

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: async () => {
      clearAuthSession(queryClient)
      await queryClient.removeQueries({ queryKey: [ACCOUNT_QUERY_KEY] })

      // Evict any shipping address left in localStorage by the old
      // localStorage-based implementation so it can't surface for another
      // account on this browser.
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(LEGACY_SHIPPING_ADDRESS_STORAGE_KEY)
      }
    },
  })
}
