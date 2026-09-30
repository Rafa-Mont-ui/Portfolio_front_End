import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SmoothScroll } from '@/components/ui/smooth-scroll'
import { Cursor } from '@/components/ui/cursor'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
})

export const metadata: Metadata = {
  title: 'Rafael Monteiro — Desenvolvedor Front-End',
  description:
    'Desenvolvedor front-end especializado em React, Next.js e TypeScript. Interfaces rápidas, acessíveis e com cuidado de design.',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'Rafael Monteiro — Desenvolvedor Front-End',
    description: 'Interfaces rápidas, acessíveis e com cuidado de design.',
    locale: 'pt_BR',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a09',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans antialiased">
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        <div aria-hidden="true" className="grain" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
