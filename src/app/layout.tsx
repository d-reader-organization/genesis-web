import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from '@/components/ui/toast/Toaster'

const satoshi = localFont({
  src: [
    { path: './fonts/Satoshi-Light.woff2', weight: '300', style: 'normal' },
    { path: './fonts/Satoshi-LightItalic.woff2', weight: '300', style: 'italic' },
    { path: './fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Satoshi-Italic.woff2', weight: '400', style: 'italic' },
    { path: './fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Satoshi-MediumItalic.woff2', weight: '500', style: 'italic' },
    { path: './fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/Satoshi-BoldItalic.woff2', weight: '700', style: 'italic' },
    { path: './fonts/Satoshi-Black.woff2', weight: '900', style: 'normal' },
    { path: './fonts/Satoshi-BlackItalic.woff2', weight: '900', style: 'italic' },
  ],
  display: 'swap',
  preload: true,
  variable: '--font-satoshi',
})

export const metadata: Metadata = {
  title: 'dReader',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  description:
    '📚 Affordable, Authentic & Limited Edition - from manga to comics. dReader is a new kind of platform for discovering, trading, collecting, and reading digital comics.',
  keywords: 'NFT, asset, dReader, dPublisher, Comic, Solana, SOL, mint, collection, manga, manwha',
  openGraph: {
    type: 'website',
    title: 'dReader',
    description:
      '📚 Affordable, Authentic & Limited Edition - from manga to comics. dReader is a new kind of platform for discovering, trading, collecting, and reading digital comics.',
    images: '/assets/images/metadata-home.jpg',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'dReader',
  },
  appleWebApp: {
    title: 'dReader',
    startupImage: '/assets/apple-touch-icon.png',
  },
  twitter: {
    title: 'dReader',
    description:
      '📚 Affordable, Authentic & Limited Edition - from manga to comics. dReader is a new kind of platform for discovering, trading, collecting, and reading digital comics.',
    card: 'summary_large_image',
    site: '@dReaderApp',
    creator: '@dReaderApp',
    images: '/assets/images/metadata-home.jpg',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={satoshi.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
