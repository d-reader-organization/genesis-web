'use client'

import UserPlusIcon from 'public/assets/vector-icons/user-plus-icon.svg'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { useRouter } from 'next/navigation'
import { followCreator } from '@/app/lib/api/creator/mutations'
import { useOptimistic, useTransition } from 'react'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  isFollowing: boolean
  creatorSlug: string
}

export const FollowCreatorButton: React.FC<Props> = ({ isFollowing, creatorSlug }) => {
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
      className='min-w-[124px]'
      variant={isFollowingState ? 'white' : 'secondary'}
      size='md'
      onClick={handleFollow}
    >
      <UserPlusIcon className='w-4 sm:w-5' />
      <Text as='span' styleVariant='body-small' fontWeight='medium' className='max-sm:text-xs'>
        {isFollowingState ? 'Unfollow' : 'Follow'}
      </Text>
    </Button>
  )
}
