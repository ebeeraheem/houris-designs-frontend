"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

import { useSessionBootstrap } from "@/features/authentication/usecases/useAuthProfile"
import { SiteToaster } from "./ui/site-toaster"

function SessionBootstrap() {
  useSessionBootstrap()
  return null
}

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <SessionBootstrap />
      {children}
      <SiteToaster />
    </QueryClientProvider>
  )
}
