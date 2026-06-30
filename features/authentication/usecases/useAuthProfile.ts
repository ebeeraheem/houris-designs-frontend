import { useEffect, useRef } from "react"
import {
  useQuery,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import { isAxiosError } from "axios"

import { fetchProfileQuiet } from "@/features/account/account.adapter"
import { toProfile } from "@/features/account/account.transformer"
import type { Profile } from "@/features/account/account.types"
import { AUTH_QUERY_KEY } from "../auth.constants"
import { authService } from "../auth.service"

export const authProfileQueryKey = [AUTH_QUERY_KEY, "profile"] as const

export interface AuthSession {
  isAuthenticated: boolean
  isServerConfirmed: boolean
  profile: Profile | null
}

const unauthenticatedSession: AuthSession = {
  isAuthenticated: false,
  isServerConfirmed: true,
  profile: null,
}

function toAuthSession(
  profile: Profile | null,
  isServerConfirmed: boolean
): AuthSession {
  return {
    isAuthenticated: Boolean(profile) || !isServerConfirmed,
    isServerConfirmed,
    profile,
  }
}

export async function fetchAuthProfile(): Promise<Profile | null> {
  try {
    if (process.env.NODE_ENV === "development") {
      console.log("[Auth Profile] Fetching profile...")
    }

    const raw = await fetchProfileQuiet()
    const profile = toProfile(raw)

    if (process.env.NODE_ENV === "development") {
      console.log("[Auth Profile] ✓ Profile fetched successfully")
    }

    return profile
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[Auth Profile] ⚠️ 401 Unauthorized - No valid session")
      }
      return null
    }

    if (process.env.NODE_ENV === "development") {
      console.error("[Auth Profile] ✗ Unexpected error:", error)
    }

    throw error
  }
}

export async function syncAuthProfile(queryClient: QueryClient) {
  const profile = await fetchAuthProfile()

  queryClient.setQueryData(authProfileQueryKey, profile)

  return profile
}

export function clearAuthSession(queryClient: QueryClient) {
  queryClient.setQueryData(authProfileQueryKey, null)
}

export function useAuthProfile() {
  return useQuery({
    queryKey: authProfileQueryKey,
    queryFn: fetchAuthProfile,
    retry: false,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

/**
 * Runs once at app root. The profile probe skips token refresh for speed, so a
 * returning user whose access token expired resolves as "logged out" initially.
 * This re-validates them in the background: if a single refresh succeeds, it
 * refetches the profile (header flips signed-out → signed-in). For a genuinely
 * logged-out user the refresh fails and nothing else happens — the one-shot ref
 * guard prevents any refetch loop.
 */
export function useSessionBootstrap() {
  const queryClient = useQueryClient()
  const { data: profile, isLoading } = useAuthProfile()
  const attempted = useRef(false)

  useEffect(() => {
    if (isLoading || profile || attempted.current) {
      return
    }

    attempted.current = true

    authService
      .refresh()
      .then(() => {
        void queryClient.invalidateQueries({ queryKey: authProfileQueryKey })
      })
      .catch(() => {
        // No valid session to refresh — stay logged out.
      })
  }, [isLoading, profile, queryClient])
}

export function useAuthSession() {
  const { data: profile, isLoading, error } = useAuthProfile()

  const session: AuthSession = profile
    ? toAuthSession(profile, true)
    : unauthenticatedSession

  return {
    data: session,
    isLoading,
    error,
  }
}
