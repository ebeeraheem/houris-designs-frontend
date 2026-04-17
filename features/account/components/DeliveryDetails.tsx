import { RiMapPinLine } from "@remixicon/react"

interface Address {
  recipientName: string
  addressLine1: string
  addressLine2?: string
  city: string
  stateRegion: string
  postalCode: string
  country: string
}

interface DeliveryDetailsProps {
  address: Address | null
}

export function DeliveryDetails({ address }: DeliveryDetailsProps) {
  return (
    <section className="surface-card p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow-label text-brand">Delivery Details</p>
          <h2 className="mt-3 font-heading text-[1.55rem] leading-none tracking-[-0.05em]">
            Shipping address
          </h2>
        </div>
        <button className="text-[0.72rem] font-medium tracking-[0.14em] text-brand uppercase hover:underline">
          Edit
        </button>
      </div>

      {address ? (
        <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div className="rounded-[1.15rem] border border-border/70 bg-secondary/55 p-5">
            <div className="flex items-center gap-2 text-brand">
              <RiMapPinLine className="size-4" />
              <p className="text-[0.72rem] font-medium tracking-[0.16em] uppercase">
                Primary Address
              </p>
            </div>
            <p className="mt-4 font-heading text-[1.05rem] font-medium tracking-[-0.03em]">
              {address.recipientName}
            </p>
            <p className="mt-3 text-[0.82rem] leading-7 text-muted-foreground">
              {address.addressLine1}
              {address.addressLine2 && (
                <>
                  <br />
                  {address.addressLine2}
                </>
              )}
              <br />
              {address.city}, {address.stateRegion} {address.postalCode}
              <br />
              {address.country}
            </p>
          </div>

          <div className="rounded-[1.15rem] border border-border/70 bg-background px-5 py-4 text-[0.78rem] leading-6 text-muted-foreground md:max-w-[14rem]">
            Delivery windows and order updates will follow the address saved
            here.
          </div>
        </div>
      ) : (
        <p className="mt-6 text-[0.82rem] leading-6 text-muted-foreground">
          No saved address yet.
        </p>
      )}
    </section>
  )
}
