import { useQuery } from "@tanstack/react-query"
import { accountService } from "../account.service"
import { ACCOUNT_QUERY_KEY } from "../account.constants"

interface UseGetAddressOptions {
  enabled?: boolean
}

export function useGetAddress(options: UseGetAddressOptions = {}) {
  return useQuery({
    queryKey: [ACCOUNT_QUERY_KEY, "address"],
    queryFn: () => accountService.getAddress(),
    enabled: options.enabled ?? true,
  })
}
