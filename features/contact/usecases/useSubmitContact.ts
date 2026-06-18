import { useMutation } from "@tanstack/react-query"
import { contactService } from "../contact.service"
import type { ContactPayload } from "../contact.schema"

export function useSubmitContact() {
  return useMutation({
    mutationFn: (payload: ContactPayload) => contactService.submit(payload),
  })
}
