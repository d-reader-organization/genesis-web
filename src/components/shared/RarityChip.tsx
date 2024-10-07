import { ComicRarity } from '@/enums/comicRarity'
import { cn } from '@/lib/utils'
import { getRarityColor } from '@/utils/rarity'
import RarityIcon from 'public/assets/vector-icons/rarity-icon.svg'
import React from 'react'

type Props = {
  rarity: ComicRarity
  supply?: number
} & React.HTMLAttributes<HTMLDivElement>

export const RarityChip: React.FC<Props> = ({ className, rarity, supply }) => (
  <div
    className={cn(
      'p-2 max-h-7 flex items-center justify-center gap-1 rounded-lg border-2 border-black text-black',
      className,
      getRarityColor(rarity)
    )}
  >
    <RarityIcon className='h-3' />
    <h6 className='text-sm font-semibold leading-4 mt-0.5'>{rarity.toUpperCase()}</h6>
    {supply ? <span className='text-[10px] font-bold leading-[10px]'>x{supply}</span> : null}
  </div>
)
