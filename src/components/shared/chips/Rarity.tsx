import { Text } from '@/components/ui'
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
      'p-2 flex items-center justify-center gap-1 rounded-lg border-2 border-black text-black h-fit',
      getRarityColor(rarity),
      className
    )}
  >
    <div className='flex items-center justify-center gap-1'>
      <RarityIcon className='h-3 -mb-0.5 mr-0.5' />
      <Text as='span' styleVariant='body-small' fontWeight='semibold' className='font-obviouslyNarrow mt-1'>
        {rarity.toUpperCase()}
      </Text>
    </div>
    {supply ? <span className='text-[10px] font-bold leading-tight'>x{supply}</span> : null}
  </div>
)
