import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'dReader - Launchpad',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  description: '📚 Affordable, Authentic & Limited Edition - from manga to comics. Collect comics on dReader!',
  keywords: 'NFT, asset, dReader, dPublisher, Comic, Solana, SOL, mint, collection, manga, manwha',
  appleWebApp: {
    title: 'dReader - Launchpad',
    startupImage: '/assets/apple-touch-icon.png',
  },
}

export default function MintLayout({ children }: { children: React.ReactNode }) {
  return children
}
