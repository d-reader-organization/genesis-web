import { ComicRarity } from '@/enums/comicRarity'
import { CandyMachineReceipt } from '../candyMachine/candyMachineReceipt'

export interface AssetEventData {
  name: string
  address: string
  isUsed: boolean
  isSigned: boolean
  rarity: ComicRarity
  image: string
}

export interface AssetMintEvent extends CandyMachineReceipt {
  assets: AssetEventData[]
}
