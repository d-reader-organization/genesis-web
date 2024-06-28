import { ComicRarity } from '@/enums/comicRarity'

export const NO_RARITIES: ComicRarity[] = [ComicRarity.Common]

export const THREE_RARITIES: ComicRarity[] = [ComicRarity.Common, ComicRarity.Rare, ComicRarity.Legendary]

export const FIVE_RARITIES: ComicRarity[] = [
  ComicRarity.Common,
  ComicRarity.Uncommon,
  ComicRarity.Rare,
  ComicRarity.Epic,
  ComicRarity.Legendary,
]

export const getRarityShares = (numberOfCovers: number) => {
  switch (numberOfCovers) {
    case 1:
      return NO_RARITIES
    case 3:
      return THREE_RARITIES
    case 5:
      return FIVE_RARITIES
    default:
      return []
  }
}
