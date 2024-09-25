import RareRarityIcon from 'public/assets/vector-icons/rare-rarity-icon.svg'
import LegendaryRarityIcon from 'public/assets/vector-icons/legendary-rarity-icon.svg'
import EpicRarityIcon from 'public/assets/vector-icons/epic-rarity-icon.svg'
import CommonRarityIcon from 'public/assets/vector-icons/common-rarity-icon.svg'
import UncommonRarityIcon from 'public/assets/vector-icons/uncommon-rarity-icon.svg'
import { ComicRarity } from '@/enums/comicRarity'

export const getRarityIcon = (rarity: string) => {
  switch (rarity.toLowerCase()) {
    case 'common':
      return <CommonRarityIcon />
    case 'uncommon':
      return <UncommonRarityIcon />
    case 'rare':
      return <RareRarityIcon />
    case 'epic':
      return <EpicRarityIcon />
    case 'legendary':
      return <LegendaryRarityIcon />
    default:
      return <CommonRarityIcon />
  }
}

// had to split this in two functions so tailwind knows about color classes at build time
export const getRarityColor = (rarity: ComicRarity) => {
  switch (rarity) {
    case ComicRarity.Common:
      return 'bg-yellow-50'
    case ComicRarity.Uncommon:
      return 'bg-yellow-200'
    case ComicRarity.Rare:
      return 'bg-orange-100'
    case ComicRarity.Epic:
      return 'bg-orange-200'
    case ComicRarity.Legendary:
      return 'bg-orange-300'
  }
}

export const getRarityTextColor = (rarity: ComicRarity) => {
  switch (rarity) {
    case ComicRarity.Common:
      return 'text-yellow-50'
    case ComicRarity.Uncommon:
      return 'text-yellow-200'
    case ComicRarity.Rare:
      return 'text-orange-100'
    case ComicRarity.Epic:
      return 'text-orange-200'
    case ComicRarity.Legendary:
      return 'text-orange-300'
  }
}
