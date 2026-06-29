import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTitle,
} from "./dialog"

describe("Dialog", () => {
  it("renders an accessible dialog and closes on Escape", async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()

    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogPortal>
          <DialogContent>
            <DialogTitle>Size Guide</DialogTitle>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )

    expect(screen.getByRole("dialog")).toBeInTheDocument()

    await user.keyboard("{Escape}")

    expect(onOpenChange).toHaveBeenCalled()
    expect(onOpenChange.mock.calls[0][0]).toBe(false)
  })
})
