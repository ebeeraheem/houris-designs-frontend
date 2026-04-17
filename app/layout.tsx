import type { Metadata } from "next"
import {
  Cormorant_Garamond,
  Geist_Mono,
  Instrument_Sans,
} from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/components/providers"
import { cn } from "@/utils/cn"

export const metadata: Metadata = {
  title: "Houris Designs | Made-to-Measure Fashion",
  description:
    "Houris Designs creates made-to-measure fashion with precision fit. Every garment is crafted specifically for you using our two-dimensional sizing system.",
  icons: {
    icon: "/icon.svg",
  },
}

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const editorialSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-editorial",
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        instrumentSans.variable,
        editorialSerif.variable,
        fontMono.variable
      )}
    >
      <body className="font-sans">
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
