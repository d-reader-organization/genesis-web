import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'dReader - Discover',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  description: '📚 Affordable, Authentic & Limited Edition - from manga to comics. Discover new content on dReader!',
  keywords: 'NFT, asset, dReader, dPublisher, Comic, Solana, SOL, mint, collection, manga, manwha',
  openGraph: {
    type: 'website',
    title: 'dReader - Discover',
    description: '📚 Affordable, Authentic & Limited Edition - from manga to comics. Discover new content on dReader!',
    images: '/assets/images/metadata-discover.jpg',
    url: process.env.NEXT_PUBLIC_SITE_URL + '/discover/comics',
    siteName: 'dReader',
  },
  appleWebApp: {
    title: 'dReader - Discover',
    startupImage: '/assets/apple-touch-icon.png',
  },
  twitter: {
    title: 'dReader - Discover',
    description: '📚 Affordable, Authentic & Limited Edition - from manga to comics. Discover new content on dReader!',
    card: 'summary_large_image',
    site: '@dReaderApp',
    creator: '@dReaderApp',
    images: '/assets/images/metadata-discover.jpg',
  },
}

export default function DiscoverLayout({ children }: { children: React.ReactNode }) {
  return children
}
