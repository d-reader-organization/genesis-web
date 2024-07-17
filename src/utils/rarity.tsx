import RareRarityIcon from 'public/assets/vector-icons/rare-rarity-icon.svg'
import LegendaryRarityIcon from 'public/assets/vector-icons/legendary-rarity-icon.svg'
import EpicRarityIcon from 'public/assets/vector-icons/epic-rarity-icon.svg'
import CommonRarityIcon from 'public/assets/vector-icons/common-rarity-icon.svg'
import UncommonRarityIcon from 'public/assets/vector-icons/uncommon-rarity-icon.svg'

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
