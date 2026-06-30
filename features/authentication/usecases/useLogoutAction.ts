"use client"

import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import { isSuccessfulAuthStatus } from "../auth.constants"
import { useLogout } from "./useLogout"

interface UseLogoutActionOptions {
  onSuccess?: () => void
  redirectTo?: string
}

export function useLogoutAction(options?: UseLogoutActionOptions) {
  const router = useRouter()
  const logout = useLogout()

  const handleLogout = async () => {
    try {
      const response = await logout.mutateAsync()

      if (!isSuccessfulAuthStatus(response.status)) {
        toast.error("We couldn't sign you out. Please try again.")
        return false
      }

      options?.onSuccess?.()
      router.replace(options?.redirectTo ?? "/")
      router.refresh()

      return true
    } catch {
      toast.error("We couldn't sign you out. Please try again.")
      return false
    }
  }

  return {
    handleLogout,
    isPending: logout.isPending,
  }
}
