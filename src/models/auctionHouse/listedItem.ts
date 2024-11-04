import { ComicRarity } from '@/utils/enums'
import { AssetAttribute } from '@/models/asset/assetAttribute'
import { WalletIdentity } from '@/models/wallet/walletIdentity'

export interface ListedAssetItem {
  id: number
  assetAddress: string
  name: string
  cover: string
  seller: WalletIdentity
  tokenAddress: string
  price: number
  attributes: AssetAttribute[]
  isUsed: boolean
  isSigned: boolean
  rarity: ComicRarity
}
