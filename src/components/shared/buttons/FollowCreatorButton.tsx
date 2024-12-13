'use client'

import UserPlusIcon from 'public/assets/vector-icons/user-plus-icon.svg'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { useRouter } from 'next/navigation'
import { followCreator } from '@/app/lib/api/creator/mutations'
import { useOptimistic, useTransition } from 'react'
import { cn } from '@/lib/utils'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  isFollowing: boolean
  creatorSlug: string
}

export const FollowCreatorButton: React.FC<Props> = ({ isFollowing, creatorSlug, className }) => {
  const [, startTransition] = useTransition()
  const [isFollowingState, setIsFollowingState] = useOptimistic(isFollowing, (state) => {
    return !state
  })
  const { refresh } = useRouter()

  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    startTransition(async () => {
      setIsFollowingState(null)
      await followCreator(creatorSlug)
      refresh()
    })
  }

  return (
    <Button
      className={cn('min-w-[124px]', className)}
      variant={isFollowingState ? 'outline' : 'white'}
      onClick={handleFollow}
    >
      <UserPlusIcon className='w-[18px]' />
      <Text as='span' styleVariant='body-small' fontWeight='bold' className='max-sm:text-xs'>
        {isFollowingState ? 'Unfollow' : 'Follow'}
      </Text>
    </Button>
  )
}
