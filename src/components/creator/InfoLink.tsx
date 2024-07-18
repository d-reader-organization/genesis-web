import React from 'react'
import { Creator } from '@/models/creator'
import { AvatarImage } from '../shared/AvatarImage'
import { Text } from '@/components/ui/Text'
import VerifiedIcon from 'public/assets/vector-icons/verified-icon.svg'
import clsx from 'clsx'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  creator: Pick<Creator, 'name' | 'slug' | 'isVerified' | 'avatar'> | undefined
}

export const CreatorInfoLink: React.FC<Props> = ({ className, creator }) =>
  !!creator ? (
    <div className={clsx('flex items-center gap-2 mt-4', className)}>
      <AvatarImage size={48} src={creator.avatar} />
      <div className='ml-2 flex flex-col gap-1'>
        <Text className='text-grey-100 italic -mb-1 text-xs' as='p'>
          author
        </Text>
        <div className='flex items-center gap-2'>
          <Text className='font-bold text-lg' as='p'>
            {creator.name}
          </Text>
          {creator.isVerified && <VerifiedIcon className='size-[14px] ' />}
        </div>
      </div>
    </div>
  ) : null
