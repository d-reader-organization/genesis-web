import { ComicRarity } from '@/utils/enums'
import { AssetAttribute } from './assetAttribute'

export interface Asset {
  address: string
  uri: string
  image: string
  name: string
  description: string
  ownerAddress: string
  royalties: number
  isUsed: boolean
  isSigned: boolean
  comicName: string
  comicIssueName: string
  comicIssueId: number
  isListed: boolean
  attributes: AssetAttribute[]
  rarity: ComicRarity
}
