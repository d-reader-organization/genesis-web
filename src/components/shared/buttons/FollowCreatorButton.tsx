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
      className={cn('rounded-lg w-[130px]', className)}
      onClick={handleFollow}
      variant={isFollowing ? 'outline' : 'white'}
    >
      <UserPlusIcon className='w-[18px]' />
      <Text as='span' styleVariant='body-small' fontWeight='bold' className='max-md:text-xs'>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Text>
    </Button>
  )
}