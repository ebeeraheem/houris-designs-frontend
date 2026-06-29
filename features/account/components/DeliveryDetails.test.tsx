import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

vi.mock("../usecases/useGetAddress", () => ({
  useGetAddress: () => ({
    data: null,
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
  }),
}))

vi.mock("../usecases/useUpdateAddress", () => ({
  useUpdateAddress: () => ({ mutateAsync: vi.fn(), isPending: false }),
}))

vi.mock("@/features/authentication/usecases/useAuthProfile", () => ({
  useAuthSession: () => ({
    data: { isAuthenticated: true, isServerConfirmed: true, profile: null },
    isLoading: false,
  }),
}))

import { DeliveryDetails } from "./DeliveryDetails"

const FIELD_LABELS = [
  "Recipient Name",
  "Country",
  "Address Line 1",
  "Address Line 2",
  "City",
  "State / Region",
  "Postal Code",
]

describe("DeliveryDetails", () => {
  it("associates every edit-form field with its label", async () => {
    const user = userEvent.setup()
    render(<DeliveryDetails />)

    await user.click(screen.getByRole("button", { name: /add/i }))

    for (const label of FIELD_LABELS) {
      expect(screen.getByLabelText(label)).toBeInTheDocument()
    }
  })
})
