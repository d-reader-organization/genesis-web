import React from 'react'
import { Creator } from '@/models/creator'
import { AvatarImage } from '../shared/AvatarImage'
import { cn } from '@/utils/general'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  creator: Pick<Creator, 'name' | 'slug' | 'isVerified' | 'avatar'> | undefined
}

export const CreatorInfoLink: React.FC<Props> = ({ className, creator }) =>
  !!creator ? (
    <div className={cn('flex items-center gap-3 max-h-[42px]', className)}>
      <AvatarImage size={42} src={creator.avatar} />
      <div className='flex flex-col gap-1 justify-center items-start'>
        <span className='text-xs font-medium leading-normal text-grey-200'>Author</span>
        <span className='text-base font-bold leading-[22.4px]'>{creator.name}</span>
      </div>
    </div>
  ) : null
