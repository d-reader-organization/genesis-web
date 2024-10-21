import { ComicRarity } from '@/enums/comicRarity'
import { cn } from '@/lib/utils'
import { getRarityColor } from '@/utils/rarity'
import RarityIcon from 'public/assets/vector-icons/rarity-icon.svg'
import React from 'react'

type Props = {
  rarity: ComicRarity
  supply?: number
  vertical?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const RarityChip: React.FC<Props> = ({ className, rarity, supply, vertical = false }) => (
  <div
    className={cn(
      'p-2 flex items-center justify-center gap-1 rounded-lg border-2 border-black text-black',
      className,
      vertical ? 'flex-col' : 'flex-row',
      vertical ? 'max-h-10' : 'max-h-7',
      getRarityColor(rarity)
    )}
  >
    <div className='flex justify-center'>
      <RarityIcon className='h-3 -mb-0.5 mr-0.5' />
      <h6 className='text-sm font-semibold leading-3'>{rarity.toUpperCase()}</h6>
    </div>
    {supply ? <span className='text-[10px] font-bold leading-[10px]'>x{supply}</span> : null}
  </div>
)
