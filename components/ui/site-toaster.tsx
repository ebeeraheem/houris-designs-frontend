"use client"

import {
  RiCheckboxCircleFill,
  RiCloseLine,
  RiErrorWarningFill,
  RiInformationFill,
  RiLoader4Line,
} from "@remixicon/react"
import {
  Toaster,
  ToastBar,
  resolveValue,
  toast as hotToast,
  type Toast,
} from "react-hot-toast"

import { cn } from "@/utils/cn"

function getToastLabel(type: Toast["type"]) {
  switch (type) {
    case "success":
      return "Success"
    case "error":
      return "Notice"
    case "loading":
      return "Working"
    default:
      return "Update"
  }
}

function getToastIcon(type: Toast["type"]) {
  switch (type) {
    case "success":
      return <RiCheckboxCircleFill className="size-5" />
    case "error":
      return <RiErrorWarningFill className="size-5" />
    case "loading":
      return <RiLoader4Line className="size-5 animate-spin" />
    default:
      return <RiInformationFill className="size-5" />
  }
}

export function SiteToaster() {
  return (
    <Toaster
      position="top-right"
      gutter={12}
      containerStyle={{ top: 18, right: 18 }}
      toastOptions={{
        duration: 5000,
      }}
    >
      {(toast) => (
        <ToastBar
          toast={toast}
          style={{
            background: "transparent",
            boxShadow: "none",
            maxWidth: "none",
            padding: 0,
          }}
        >
          {() => (
            <div
              className={cn(
                "houris-toast",
                toast.type === "success" && "houris-toast--success",
                toast.type === "error" && "houris-toast--error",
                toast.type === "loading" && "houris-toast--loading"
              )}
            >
              <div
                className={cn(
                  "houris-toast__edge",
                  toast.type === "success" && "houris-toast__edge--success",
                  toast.type === "error" && "houris-toast__edge--error",
                  toast.type === "loading" && "houris-toast__edge--loading"
                )}
              />

              <div
                className={cn(
                  "houris-toast__icon",
                  toast.type === "success" && "houris-toast__icon--success",
                  toast.type === "error" && "houris-toast__icon--error",
                  toast.type === "loading" && "houris-toast__icon--loading"
                )}
              >
                {getToastIcon(toast.type)}
              </div>

              <div className="houris-toast__content">
                <div className="houris-toast__header">
                  <span
                    className={cn(
                      "houris-toast__pill",
                      toast.type === "success" && "houris-toast__pill--success",
                      toast.type === "error" && "houris-toast__pill--error",
                      toast.type === "loading" && "houris-toast__pill--loading"
                    )}
                  >
                    {getToastLabel(toast.type)}
                  </span>

                  <button
                    type="button"
                    className="houris-toast__dismiss"
                    onClick={() => hotToast.dismiss(toast.id)}
                    aria-label="Dismiss notification"
                  >
                    <RiCloseLine className="size-4" />
                  </button>
                </div>

                <div className="houris-toast__message">
                  {resolveValue(toast.message, toast)}
                </div>
              </div>

              {toast.type !== "loading" ? (
                <div
                  className={cn(
                    "houris-toast__progress",
                    toast.visible && "houris-toast__progress--active",
                    toast.type === "success" &&
                      "houris-toast__progress--success",
                    toast.type === "error" && "houris-toast__progress--error"
                  )}
                />
              ) : null}
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  )
}
