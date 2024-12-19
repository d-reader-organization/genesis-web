'use client'

import { RequireAuthWrapperButton } from '../shared/buttons/RequireAuthWrapperButton'
import { cn } from '@/lib/utils'
import { Text } from '@/components/ui'
import useToggle from '@/hooks/useToggle'
import { StarRatingDialog } from '@/components/shared/dialogs/StarRatingDialog'
import { Nullable } from '@/models/common'
import { Star } from 'lucide-react'

type Props = {
  comicSlug: string
  rating?: Nullable<number>
  averageRating?: Nullable<number>
}

export const RateComicButton: React.FC<Props> = ({ comicSlug, rating, averageRating }) => {
  const [isOpenStarRatingDialog, toggleStarRating] = useToggle()
    console.log(rating)
  return (
    <>
      <RequireAuthWrapperButton
        icon={Star}
        onClick={() => toggleStarRating()}
        variant='outline'
        className={cn('rounded-xl min-w-[80px] w-[80px]', rating && 'bg-yellow-500 bg-opacity-40 text-yellow-500 border-0')}
        iconClassname={cn(rating && 'fill-yellow-500')}
      >
        <Text as='span' styleVariant='body-large' className={cn(rating && 'text-white')}>
          {averageRating}
        </Text>
      </RequireAuthWrapperButton>
      <StarRatingDialog comicSlug={comicSlug} open={isOpenStarRatingDialog} toggleDialog={toggleStarRating} />
    </>
  )
}
