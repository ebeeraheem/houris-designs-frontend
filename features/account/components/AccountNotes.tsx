"use client"

import { useLogoutAction } from "@/features/authentication/usecases/useLogoutAction"
import { Button } from "@/components/ui/button"

export function AccountNotes() {
  const { handleLogout, isPending } = useLogoutAction()

  return (
    <section className="surface-panel p-4 sm:p-5">
      <Button
        variant="outline"
        className="w-full border-destructive/20 text-destructive hover:bg-destructive/10"
        type="button"
        onClick={() => {
          void handleLogout()
        }}
        disabled={isPending}
      >
        {isPending ? "Signing Out..." : "Sign Out"}
      </Button>
    </section>
  )
}
