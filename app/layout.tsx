import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

// Domena docelowa: inner-logos.pl (jeszcze niekupiona). Na Vercel można nadpisać
// przez NEXT_PUBLIC_SITE_URL, np. adresem preview, do czasu podpięcia domeny.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://inner-logos.pl'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Inner Logos — Biofeedback i wsparcie logoterapeutyczne',
  description:
    'Inner Logos to gabinet terapeutyczny łączący trening biofeedback z podejściem logoterapeutycznym. Umów pierwszą wizytę i odzyskaj wewnętrzną równowagę.',
  generator: 'v0.app',
  openGraph: {
    title: 'Inner Logos — Biofeedback i wsparcie logoterapeutyczne',
    description:
      'Gabinet terapeutyczny łączący trening biofeedback z podejściem logoterapeutycznym.',
    type: 'website',
    locale: 'pl_PL',
    url: '/',
    siteName: 'Inner Logos',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Inner Logos' }],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className={`light ${geistSans.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
