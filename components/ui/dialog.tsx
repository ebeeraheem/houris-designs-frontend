"use client"

import * as React from "react"
import * as DialogPrimitive from "@base-ui/react/dialog"
import { type VariantProps } from "class-variance-authority"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/utils/cn"

const Dialog = DialogPrimitive.Dialog.Root
const DialogPortal = DialogPrimitive.Dialog.Portal
const DialogTrigger = DialogPrimitive.Dialog.Trigger

const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof DialogPrimitive.Dialog.Backdrop>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Dialog.Backdrop
    ref={ref}
    className={cn(
      "fixed inset-0 z-80 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
      className
    )}
    {...props}
  />
))

DialogOverlay.displayName = "DialogOverlay"

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof DialogPrimitive.Dialog.Popup>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Dialog.Popup
    ref={ref}
    className={cn(
      "fixed top-1/2 left-1/2 z-81 flex max-h-[90vh] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[var(--radius)] border bg-background shadow-lift outline-none transition-all duration-200 ease-out data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      className
    )}
    {...props}
  />
))

DialogContent.displayName = "DialogContent"

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<typeof DialogPrimitive.Dialog.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Dialog.Title
    ref={ref}
    className={cn(
      "font-heading text-[1.35rem] leading-none font-medium tracking-[-0.04em]",
      className
    )}
    {...props}
  />
))

DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<typeof DialogPrimitive.Dialog.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Dialog.Description
    ref={ref}
    className={cn("text-sm leading-7 text-muted-foreground", className)}
    {...props}
  />
))

DialogDescription.displayName = "DialogDescription"

function DialogClose({
  className,
  variant = "ghost",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Dialog.Close> &
  VariantProps<typeof buttonVariants>) {
  return (
    <DialogPrimitive.Dialog.Close
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-b border-border/60 px-5 py-4 sm:px-6",
        className
      )}
      {...props}
    />
  )
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto px-5 py-5 sm:px-6", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
