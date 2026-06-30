"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { RiCheckboxCircleLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { getContactErrorMessage } from "../contact-error"
import { contactSchema, type ContactPayload } from "../contact.schema"
import { useSubmitContact } from "../usecases/useSubmitContact"

const CONTACT_SUCCESS_STATUSES = new Set([200, 201])
const MIN_SUBMIT_DELAY_MS = 3000

export function ContactForm() {
  const formLoadedAtMs = useRef<number | null>(null)
  const submitContact = useSubmitContact()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
      formLoadedAt: "",
      companyWebsite: "",
    },
  })

  const refreshLoadedAt = () => {
    const now = new Date()
    formLoadedAtMs.current = now.getTime()
    setValue("formLoadedAt", now.toISOString(), { shouldValidate: true })
  }

  useEffect(() => {
    refreshLoadedAt()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFormSubmit = async (payload: ContactPayload) => {
    if (payload.companyWebsite?.trim()) {
      reset()
      refreshLoadedAt()
      setIsSubmitted(true)
      return
    }

    const elapsed = formLoadedAtMs.current
      ? Date.now() - formLoadedAtMs.current
      : 0

    if (elapsed < MIN_SUBMIT_DELAY_MS) {
      toast.error("We could not send your message. Please try again.")
      return
    }

    try {
      const response = await submitContact.mutateAsync(payload)

      if (!CONTACT_SUCCESS_STATUSES.has(response.status)) {
        toast.error("We could not send your message. Please try again.")
        return
      }

      reset()
      refreshLoadedAt()
      setIsSubmitted(true)
    } catch (error) {
      toast.error(getContactErrorMessage(error))
    }
  }

  if (isSubmitted) {
    return (
      <div className="surface-card p-6 text-center sm:p-8">
        <div className="mx-auto inline-flex rounded-[var(--radius)] bg-success/12 p-3 text-success">
          <RiCheckboxCircleLine className="size-6" />
        </div>
        <h2 className="mt-4 font-heading text-[1.4rem] font-medium tracking-[-0.04em]">
          Message received
        </h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          Thank you for reaching out. We&apos;ll be in touch soon.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-5"
          onClick={() => setIsSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
      >
        <label htmlFor="companyWebsite">Company website</label>
        <input
          id="companyWebsite"
          {...register("companyWebsite")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <input type="hidden" {...register("formLoadedAt")} />

      <div>
        <label htmlFor="fullName" className="field-label mb-1.5 block">
          Full Name
        </label>
        <input
          id="fullName"
          {...register("fullName")}
          type="text"
          autoComplete="name"
          className="field-input"
          placeholder="Your name"
          disabled={submitContact.isPending}
        />
        {errors.fullName && (
          <p className="mt-2 text-xs text-destructive">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="field-label mb-1.5 block">
          Email
        </label>
        <input
          id="email"
          {...register("email")}
          type="email"
          autoComplete="email"
          className="field-input"
          placeholder="you@example.com"
          disabled={submitContact.isPending}
        />
        {errors.email && (
          <p className="mt-2 text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="field-label mb-1.5 block">
          Subject
        </label>
        <input
          id="subject"
          {...register("subject")}
          type="text"
          className="field-input"
          placeholder="Order, sizing, collaboration, or support"
          disabled={submitContact.isPending}
        />
        {errors.subject && (
          <p className="mt-2 text-xs text-destructive">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="field-label mb-1.5 block">
          Message
        </label>
        <textarea
          id="message"
          {...register("message")}
          className="field-input min-h-36 resize-y py-3"
          placeholder="Tell us how we can help."
          disabled={submitContact.isPending}
        />
        {errors.message && (
          <p className="mt-2 text-xs text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={submitContact.isPending}
      >
        {submitContact.isPending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
