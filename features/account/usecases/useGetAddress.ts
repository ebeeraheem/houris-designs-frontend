import { useQuery } from "@tanstack/react-query"
import { accountService } from "../account.service"
import { ACCOUNT_QUERY_KEY } from "../account.constants"

export function useGetAddress() {
  return useQuery({
    queryKey: [ACCOUNT_QUERY_KEY, "address"],
    queryFn: () => accountService.getAddress(),
  })
}
