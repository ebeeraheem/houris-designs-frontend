import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/components/providers"

export const metadata: Metadata = {
  title: "Houris Designs | Made-to-Measure Fashion",
  description:
    "Houris Designs creates made-to-measure fashion with precision fit. Every garment is crafted specifically for you using our two-dimensional sizing system.",
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body className="font-sans">
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
