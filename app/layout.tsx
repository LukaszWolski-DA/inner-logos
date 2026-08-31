import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

export const metadata: Metadata = {
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
    // TODO: podmień na docelowy adres i grafikę Open Graph
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Inner Logos' }],
  },
  icons: {
    // TODO: podmień placeholdery na docelowy favicon
    icon: '/favicon.ico',
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
