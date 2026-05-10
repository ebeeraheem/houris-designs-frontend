import Link from "next/link"
import Image from "next/image"

const footerNavigation = {
  collection: [
    { label: "All Products", href: "/collection" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "New Arrivals", href: "/collection?sort=newest" },
  ],
  account: [
    { label: "My Account", href: "/account" },
    { label: "Order History", href: "/account/orders" },
    { label: "Cart", href: "/cart" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 px-3 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-384">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.26em] uppercase"
            >
              <Image
                src="/favicon-32x32.png"
                alt="Houris Designs Logo"
                width={16}
                height={16}
                className="size-4"
              />
              Houris design
            </Link>
            <p className="mt-4 max-w-[20rem] text-sm leading-7 text-muted-foreground">
              Made-to-measure clothing, crafted for you. Every garment sewn to
              your unique specifications.
            </p>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="eyebrow-label text-foreground/60">Collection</h3>
            <ul className="mt-4 space-y-2.5">
              {footerNavigation.collection.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[0.78rem] tracking-[0.04em] text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="eyebrow-label text-foreground/60">Account</h3>
            <ul className="mt-4 space-y-2.5">
              {footerNavigation.account.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[0.78rem] tracking-[0.04em] text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="eyebrow-label text-foreground/60">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {footerNavigation.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[0.78rem] tracking-[0.04em] text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border/40 pt-5 sm:mt-14 sm:flex-row sm:items-center sm:pt-6">
          <p className="text-[0.68rem] tracking-[0.14em] text-foreground/40">
            &copy; {new Date().getFullYear()} Houris Designs. All rights
            reserved.
          </p>
          <p className="text-[0.68rem] tracking-[0.14em] text-foreground/30">
            Crafted with precision
          </p>
        </div>
      </div>
    </footer>
  )
}
