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
      'p-2 flex items-center justify-center gap-1 rounded-lg border-2 border-black text-black h-7',
      getRarityColor(rarity),
      className
    )}
  >
    <div className='flex items-center justify-center'>
      <RarityIcon className='h-3 -mb-0.5 mr-0.5' />
      <Text as='span' styleVariant='body-small' fontWeight='semibold' className='font-obviouslyNarrow mt-1'>
        {rarity.toUpperCase()}
      </Text>
    </div>
    {supply ? (
      <Text as='span' styleVariant='body-xsmall' fontWeight='bold' className='text-xxs'>
        x{supply}
      </Text>
    ) : null}
  </div>
)
