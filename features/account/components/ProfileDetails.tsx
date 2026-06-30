"use client"

import { useState } from "react"
import {
  RiShieldCheckLine,
  RiShieldKeyholeLine,
  RiUser3Line,
} from "@remixicon/react"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { changeEmailSchema, updateProfileSchema } from "../account.schema"
import type { Profile } from "../account.types"
import { useRequestEmailChange } from "../usecases/useRequestEmailChange"
import { useUpdateProfile } from "../usecases/useUpdateProfile"

interface ProfileDetailsProps {
  profile: Profile
}

interface ProfileFormErrors {
  fullName?: string
  email?: string
}

export function ProfileDetails({ profile }: ProfileDetailsProps) {
  const updateProfile = useUpdateProfile()
  const requestEmailChange = useRequestEmailChange()

  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState(profile.fullName)
  const [email, setEmail] = useState(profile.email)
  const [errors, setErrors] = useState<ProfileFormErrors>({})

  const isSubmitting = updateProfile.isPending || requestEmailChange.isPending

  const resetForm = () => {
    setFullName(profile.fullName)
    setEmail(profile.email)
    setErrors({})
  }

  const startEditing = () => {
    resetForm()
    setIsEditing(true)
  }

  const stopEditing = () => {
    resetForm()
    setIsEditing(false)
  }

  const handleSave = async () => {
    const trimmedFullName = fullName.trim()
    const trimmedEmail = email.trim()
    const nextErrors: ProfileFormErrors = {}
    const nameChanged = trimmedFullName !== profile.fullName
    const emailChanged = trimmedEmail !== profile.email

    const profileResult = updateProfileSchema.safeParse({
      fullName: trimmedFullName,
    })

    if (!profileResult.success) {
      nextErrors.fullName = profileResult.error.issues[0]?.message
    }

    if (emailChanged) {
      const emailResult = changeEmailSchema.safeParse({
        newEmail: trimmedEmail,
      })

      if (!emailResult.success) {
        nextErrors.email = emailResult.error.issues[0]?.message
      }
    }

    if (nextErrors.fullName || nextErrors.email) {
      setErrors(nextErrors)
      return
    }

    if (!nameChanged && !emailChanged) {
      stopEditing()
      return
    }

    let didUpdateName = false

    try {
      if (nameChanged) {
        await updateProfile.mutateAsync({ fullName: trimmedFullName })
        didUpdateName = true
      }

      if (emailChanged) {
        await requestEmailChange.mutateAsync({ newEmail: trimmedEmail })
      }

      if (nameChanged && emailChanged) {
        toast.success(
          "Profile updated. Check your email to confirm the new address."
        )
      } else if (nameChanged) {
        toast.success("Profile updated.")
      } else {
        toast.success("Check your email to confirm the new address.")
      }

      setErrors({})
      setIsEditing(false)
    } catch {
      if (didUpdateName && emailChanged) {
        toast.success(
          "Your name was updated. We couldn't start the email change yet."
        )
        setIsEditing(false)
        return
      }

      toast.error("We couldn't update your profile. Please try again.")
    }
  }

  return (
    <section className="surface-card p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow-label text-brand">Profile Details</p>
          <h2 className="mt-3 font-heading text-[1.55rem] leading-none tracking-[-0.05em]">
            Personal information
          </h2>
        </div>
        <button
          type="button"
          className="text-[0.72rem] font-medium tracking-[0.14em] text-brand uppercase hover:underline disabled:opacity-50"
          onClick={isEditing ? stopEditing : startEditing}
          disabled={isSubmitting}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-[var(--radius)] border border-border/70 bg-secondary/55 p-5">
          <div className="flex items-center gap-2 text-brand">
            <RiUser3Line className="size-4" />
            <p className="text-[0.72rem] font-medium tracking-[0.16em] uppercase">
              Full Name
            </p>
          </div>

          {isEditing ? (
            <>
              <input
                type="text"
                value={fullName}
                onChange={(event) => {
                  setFullName(event.target.value)
                  setErrors((current) => ({ ...current, fullName: undefined }))
                }}
                className="field-input mt-3"
                placeholder="Enter your full name"
              />
              {errors.fullName ? (
                <p className="mt-2 text-[0.76rem] text-destructive">
                  {errors.fullName}
                </p>
              ) : null}
            </>
          ) : (
            <p className="mt-3 font-heading text-[1.1rem] font-medium tracking-[-0.03em]">
              {profile.fullName}
            </p>
          )}
        </div>

        <div className="rounded-[var(--radius)] border border-border/70 bg-secondary/55 p-5">
          <div className="flex items-center gap-2 text-brand">
            <RiShieldCheckLine className="size-4" />
            <p className="text-[0.72rem] font-medium tracking-[0.16em] uppercase">
              Email
            </p>
          </div>

          {isEditing ? (
            <>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setErrors((current) => ({ ...current, email: undefined }))
                }}
                className="field-input mt-3"
                placeholder="name@example.com"
              />
              <div className="mt-3 flex items-start gap-2 text-muted-foreground">
                <RiShieldKeyholeLine className="mt-0.5 size-4 shrink-0 text-brand" />
                <p className="text-[0.78rem] leading-6">
                  Changing your email sends a confirmation link before the new
                  address becomes active.
                </p>
              </div>
              {errors.email ? (
                <p className="mt-2 text-[0.76rem] text-destructive">
                  {errors.email}
                </p>
              ) : null}
            </>
          ) : (
            <p className="mt-3 font-heading text-[1.1rem] font-medium tracking-[-0.03em]">
              {profile.email}
            </p>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => void handleSave()}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={stopEditing}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      ) : null}
    </section>
  )
}
