import Image from 'next/image'
import React from 'react'
import { StatelessCover } from '@/models/comicIssue/statelessCover'
import { RarityChip } from '../shared/RarityChip'

type Props = {
  cover: StatelessCover
  isPriority: boolean
  onClick: () => void
}

export const CoverSlide: React.FC<Props> = ({ cover, isPriority, onClick }) => (
  <div className='flex-[0_0_100%] h-[400px] md:h-[520px]'>
    <button className='relative flex justify-center hover:brightness-110' onClick={onClick}>
      <Image
        alt={`${cover.rarity} - cover`}
        src={cover.image}
        width='0'
        height='0'
        priority={isPriority}
        sizes='(max-width: 350px) 100vw, 350px'
        className='rounded-2xl min-h-96 w-full object-cover'
      />
      <RarityChip className='absolute -bottom-[14px]' rarity={cover.rarity} />
    </button>
  </div>
)
