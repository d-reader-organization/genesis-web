'use client'

import { useOptimistic, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { bookmarkComic } from '@/app/lib/api/comic/mutations'
import { RequireAuthWrapperButton } from '../shared/buttons/RequireAuthWrapperButton'
import { Text } from '@/components/ui'
import { cn } from '@/lib/utils'
import BookmarkIcon from 'public/assets/vector-icons/bookmark.svg'

type Props = {
  comicSlug: string
  isBookmarked?: boolean
}

export const BookmarkComicButton: React.FC<Props> = ({ comicSlug, isBookmarked }) => {
  const [, startTransition] = useTransition()
  const [isBookmarkedState, setIsBookmarkedState] = useOptimistic(isBookmarked, (state) => {
    return !state
  })
  const { refresh } = useRouter()

  const handleSubmit = async () => {
    startTransition(async () => {
      setIsBookmarkedState(false)
      await bookmarkComic(comicSlug)
      refresh()
    })
  }

  return (
    <RequireAuthWrapperButton
      variant='outline'
      onClick={handleSubmit}
      className={cn('rounded-xl min-w-[106px] w-[106px] sm:px-2 gap-1', isBookmarkedState && 'bg-green-accent bg-opacity-40 text-green-accent border-0')}
    >
      <BookmarkIcon className='w-6' />
      <Text as='span' styleVariant='body-large' className={cn(isBookmarkedState && 'text-white')}>
        Favorite
      </Text>
    </RequireAuthWrapperButton>
  )
}
