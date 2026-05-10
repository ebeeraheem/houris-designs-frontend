import { useQuery, type QueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"

import { fetchProfileQuiet } from "@/features/account/account.adapter"
import { toProfile } from "@/features/account/account.transformer"
import type { Profile } from "@/features/account/account.types"
import { AUTH_QUERY_KEY } from "../auth.constants"

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
      console.log("[Auth Profile] ✓ Profile fetched successfully:", {
        id: profile.id,
        email: profile.email,
      })
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
