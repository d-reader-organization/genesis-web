'use client'

import { cn } from '@/lib/utils'
import UserPlusIcon from 'public/assets/vector-icons/user-plus-icon.svg'
import { Button, Text } from '@/components/ui'
import { useRouter } from 'next/navigation'
import { followCreator } from '@/app/lib/api/creator/mutations'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  isFollowing: boolean
  creatorSlug: string
}

export const FollowCreatorButton: React.FC<Props> = ({ isFollowing, creatorSlug, className }) => {
  const { refresh } = useRouter()

  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await followCreator(creatorSlug)
    refresh()
  }

  return (
    <Button
      className={cn(
        'flex items-center rounded-xl gap-2 p-3 max-h-9 sm:max-h-11 w-[110px]',
        isFollowing ? 'bg-white text-black' : 'text-grey-100 bg-grey-300 bg-opacity-30',
        className
      )}
      onClick={handleFollow}
    >
      <UserPlusIcon className='w-4 sm:w-5' />
      <Text as='span' styleVariant='body-small' fontWeight='medium' className='max-sm:text-xs'>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Text>
    </Button>
  )
}
