import { RiMailLine, RiMapPinLine, RiShieldCheckLine } from "@remixicon/react"
import { ContactForm } from "./ContactForm"

const contactDetails = [
  {
    icon: RiMailLine,
    label: "General Enquiries",
    value: "info@hourisdesigns.com",
    href: "mailto:info@hourisdesigns.com",
  },
  {
    icon: RiShieldCheckLine,
    label: "Customer Support",
    value: "support@hourisdesigns.com",
    href: "mailto:support@hourisdesigns.com",
  },
  {
    icon: RiMapPinLine,
    label: "Registered Address",
    value: "NO 65 RIJIYAR ZAKI QTRS UNGOGO KANO",
  },
]

export function ContactPageView() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
      <section className="surface-panel p-6 sm:p-8 lg:p-10">
        <p className="eyebrow-label text-brand">Contact Us</p>
        <h1 className="mt-4 font-heading text-[2.2rem] leading-[0.92] font-medium tracking-[-0.07em] uppercase sm:text-[3rem] lg:text-[3.8rem]">
          We would love to hear from you
        </h1>
        <p className="mt-5 max-w-[36rem] text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
          For order support, sizing questions, collaborations, or general
          enquiries, send us a message and our team will respond by email.
        </p>

        <div className="mt-10 space-y-4">
          {contactDetails.map((item) => (
            <div
              key={item.label}
              className="rounded-[var(--radius)] border border-border bg-background p-4"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-[var(--radius)] border border-brand/20 bg-brand/5 text-brand">
                  <item.icon className="size-4" />
                </span>
                <div>
                  <p className="field-label">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 block text-sm leading-6 text-foreground underline-offset-4 hover:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm leading-6 text-foreground">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-card p-6 sm:p-8 lg:p-10">
        <div className="mb-8">
          <p className="eyebrow-label text-brand">Send a Message</p>
          <h2 className="section-heading mt-3">How can we help?</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Share the details we need, and our team will follow up by email.
          </p>
        </div>
        <ContactForm />
      </section>
    </div>
  )
}
