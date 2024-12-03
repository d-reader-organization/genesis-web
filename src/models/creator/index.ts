import { CreatorStats } from './creatorStats'
import { CreatorMyStats } from './creatorMyStats'

export interface BasicCreator {
  id: number
  email: string
  name: string
  slug: string
  isVerified: boolean
  avatar: string
  banner: string
  logo: string
  description: string
  flavorText: string
  tippingAddress: string
  website: string
  twitter: string
  instagram: string
  linktree: string
}

export interface Creator extends BasicCreator {
  stats: CreatorStats
  myStats: CreatorMyStats
}

export type UpdateCreatorData = Partial<
  Pick<
    Creator,
    'email' | 'description' | 'flavorText' | 'tippingAddress' | 'website' | 'twitter' | 'instagram' | 'linktree'
  >
>

export type UpdateCreatorFilesData = Partial<{
  avatar: File
  banner: File
  logo: File
}>

export type SearchResultCreator = Pick<Creator, 'avatar' | 'name' | 'slug'> & { issuesCount: number }

export type FollowCreator = Pick<Creator, 'slug'>
