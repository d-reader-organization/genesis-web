import { ComicRarity } from '@/enums/comicRarity'

export type CollectibleComic = {
  address: string
  uri: string
  image: string
  name: string
  description: string
  ownerAddress: string
  royalties: number
  isUsed: boolean
  isSigned: boolean
  rarity: ComicRarity
  comicName: string
  comicIssueName: string
  comicIssueId: number
  attributes: CollectibleComicAttributesDto[]
  isListed: boolean
}

type CollectibleComicAttributesDto = {
  trait: string
  value: string
}
