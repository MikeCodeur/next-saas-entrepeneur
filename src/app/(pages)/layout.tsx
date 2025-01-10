import "./globals.css"

import {Inter} from "next/font/google"
import type {Metadata} from "next"
import {ModalProvider} from "../components/modal"
import NextAuthProvider from "@/app/components/auth/auth-provider"
import React from "react"
import {ThemeProvider} from "next-themes"
import {Toaster} from "sonner"
import {TurnOffDefaultPropsWarning} from "@/app/components/charts/warning-chart"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Tracker entrepreneur",
  description:
    "Tracker de temps pour le sport et de finance pour les entrepreneurs",
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthProvider>
            <ModalProvider>{children}</ModalProvider>
          </NextAuthProvider>
        </ThemeProvider>
        <TurnOffDefaultPropsWarning />
        <Toaster richColors />
      </body>
    </html>
  )
}
