import { postContactMessage } from "./contact.adapter"
import type { ContactPayload } from "./contact.schema"
import type { ContactResponse } from "./contact.types"

export const contactService = {
  submit: (payload: ContactPayload): Promise<ContactResponse> => {
    return postContactMessage(payload)
  },
}
