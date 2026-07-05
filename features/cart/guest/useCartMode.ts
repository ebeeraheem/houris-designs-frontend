import { useAuthSession } from "@/features/authentication/usecases/useAuthProfile"
import { cartService } from "../cart.service"
import { guestCartService } from "./guestCart.service"

/**
 * Resolves which cart backs the UI: the server cart for authenticated
 * customers, the localStorage guest cart otherwise. All cart usecases branch
 * through this hook so pages and components stay auth-agnostic.
 */
export function useCartMode() {
  const { data: session, isLoading } = useAuthSession()
  const isAuthenticated = Boolean(session?.isAuthenticated)

  return {
    isAuthenticated,
    isLoading,
    mode: isAuthenticated ? ("server" as const) : ("guest" as const),
    service: isAuthenticated ? cartService : guestCartService,
  }
}
