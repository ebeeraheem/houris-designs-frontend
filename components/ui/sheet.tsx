"use client"

import * as React from "react"
import * as DialogPrimitive from "@base-ui/react/dialog"
import { cva, type VariantProps } from "class-variance-authority"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/utils/cn"

const Sheet = DialogPrimitive.Dialog.Root
const SheetPortal = DialogPrimitive.Dialog.Portal
const SheetTrigger = DialogPrimitive.Dialog.Trigger
const SheetOverlay = React.forwardRef<
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

SheetOverlay.displayName = "SheetOverlay"

const sheetVariants = cva(
  "fixed z-81 flex flex-col overflow-hidden border bg-background shadow-lift transition-transform duration-300 ease-out outline-none data-[ending-style]:duration-200",
  {
    variants: {
      side: {
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full sm:max-w-sm",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full sm:max-w-sm",
        top: "inset-x-0 top-0 h-auto border-b data-[ending-style]:-translate-y-full data-[starting-style]:-translate-y-full",
        bottom:
          "inset-x-0 bottom-0 h-auto border-t data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof DialogPrimitive.Dialog.Popup> &
    VariantProps<typeof sheetVariants>
>(({ className, side, ...props }, ref) => (
  <DialogPrimitive.Dialog.Popup
    ref={ref}
    className={cn(sheetVariants({ side }), className)}
    {...props}
  />
))

SheetContent.displayName = "SheetContent"

const SheetTitle = React.forwardRef<
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

SheetTitle.displayName = "SheetTitle"

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<typeof DialogPrimitive.Dialog.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Dialog.Description
    ref={ref}
    className={cn("text-sm leading-7 text-muted-foreground", className)}
    {...props}
  />
))

SheetDescription.displayName = "SheetDescription"

function SheetClose({
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

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 border-b border-border/60 px-5 py-4 sm:px-6",
        className
      )}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mt-auto flex flex-col-reverse gap-2 border-t border-border/60 px-5 py-4 sm:flex-row sm:justify-end sm:px-6",
        className
      )}
      {...props}
    />
  )
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5",
        className
      )}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
}
