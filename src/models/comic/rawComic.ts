import { AudienceType } from '@/utils/enums'
import { RawComicStats } from './rawComicStats'
import { PartialGenre } from '../genre'

export interface RawComic {
  title: string
  slug: string
  audienceType: AudienceType
  completedAt: string
  verifiedAt: string
  publishedAt: string
  popularizedAt: string
  cover: string
  banner: string
  logo: string
  description: string
  flavorText: string
  website: string
  twitter: string
  discord: string
  telegram: string
  instagram: string
  tikTok: string
  youTube: string
  stats: RawComicStats
  genres: PartialGenre[]
}
