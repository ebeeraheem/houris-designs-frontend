import { useQuery } from "@tanstack/react-query"
import { sizeService } from "../size.service"
import { SIZES_QUERY_KEY } from "../size.constants"

export function useGetSizeGuide() {
  return useQuery({
    queryKey: [SIZES_QUERY_KEY],
    queryFn: () => sizeService.getSizeGuide(),
    staleTime: Infinity,
  })
}
