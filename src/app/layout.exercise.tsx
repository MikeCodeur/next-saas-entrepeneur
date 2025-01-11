import React from 'react'
import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import './globals.css'
import {ThemeProvider} from 'next-themes'
import {cn} from '@/lib/utils'
import {Toaster} from '@/components/ui/toaster'

// 🐶 Importe le composant SessionProvider
// 🤖 import {SessionProvider} from 'next-auth/react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Tracker entrepreneur',
  description:
    'Tracker de temps pour le sport et de finance pour les entrepreneurs',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          geistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* 🐶 Wrappe le children dans un SessionProvider */}
          {/* 🤖 <SessionProvider> */}
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
