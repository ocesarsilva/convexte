import "@/styles/globals.css"

import type { Metadata, Viewport } from "next"
import { RootProviders } from "@/contexts/root-providers"

import { APP_TITLE } from "@/lib/constants"
import { fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: {
    default: APP_TITLE,
    template: `%s - ${APP_TITLE}`,
  },
  description: `${APP_TITLE} - Gerencie seus leads de maneira mais rápida e inteligente.`,
  icons: [{ rel: "icon", url: "/icon.png" }],
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
<<<<<<< Updated upstream
          "min-h-screen bg-background font-sans antialiased",
          fontMono.variable,
          fontSans.variable
=======
          "dark min-h-screen bg-background font-sans antialiased",
          fontMono.className,
          fontSans.className
>>>>>>> Stashed changes
        )}
      >
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
