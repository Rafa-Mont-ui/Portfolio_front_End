import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Kode_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const kodeMono = Kode_Mono({
    subsets: ["latin"],
    variable: "--font-kode-mono",
  });

export const metadata: Metadata = {
  title: 'Portfolio — Desenvolvedor Front-End',
  description: 'Portfolio de desenvolvedor front-end especializado em React, Next.js e TypeScript. Construindo interfaces modernas e de alta performance.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#06090f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`scroll-smooth ${kodeMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
