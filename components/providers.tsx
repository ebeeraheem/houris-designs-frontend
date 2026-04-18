"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

import { SmoothScroll } from "./smooth-scroll"
import { PageTransition } from "./page-transition"
import { CustomCursor } from "./custom-cursor"

export function Providers({ children }: { children: React.ReactNode }) {
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
      <SmoothScroll>
        <PageTransition>
          {children}
          <CustomCursor />
        </PageTransition>
      </SmoothScroll>
    </QueryClientProvider>
  )
}
