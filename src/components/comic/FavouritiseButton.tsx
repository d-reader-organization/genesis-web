'use client'

import { useOptimistic, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { favouritiseComic } from '@/app/lib/api/comic/mutations'
import { RequireAuthWrapperButton } from '../shared/buttons/RequireAuthWrapperButton'
import { cn } from '@/lib/utils'
import { Heart } from 'lucide-react'
import { Text } from '@/components/ui'

type Props = {
  comicSlug: string
  isFavourite?: boolean
  favouritesCount?: number
}

export const FavouritiseComicButton: React.FC<Props> = ({ comicSlug, isFavourite=false, favouritesCount=0 }) => {
  const [, startTransition] = useTransition()
  const [state, setNewState] = useOptimistic(
    {
      favouritesCount,
      isFavourite,
    },
    (state) => {
      return {
        favouritesCount: state.isFavourite ? state.favouritesCount - 1 : state.favouritesCount + 1,
        isFavourite: !state.isFavourite,
      }
    }
  )
  const { refresh } = useRouter()

  const handleSubmit = async () => {
    startTransition(async () => {
      setNewState(null)
      await favouritiseComic(comicSlug)
      refresh()
    })
  }

  return (
    <RequireAuthWrapperButton
      icon={Heart}
      variant='outline'
      onClick={handleSubmit}
      className={cn('rounded-xl min-w-[80px]', state.isFavourite && 'bg-red-500 bg-opacity-40 text-red-500 border-0')}
      iconClassname={cn(state.isFavourite && 'fill-red-500')}
    >
      <Text as='span' styleVariant='body-large' className={cn(state.isFavourite && 'text-white')}>
        {state.favouritesCount}
      </Text>
    </RequireAuthWrapperButton>
  )
}
