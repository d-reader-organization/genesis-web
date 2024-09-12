'use client'

import React, { useOptimistic } from 'react'
import { InfoList } from './InfoList'
import { Button } from '../ui/Button'
import { StarIcon } from './icons/StarIcon'
import { isNil } from 'lodash'
import { roundNumber } from '@/utils/numbers'
import { HeartIcon } from './icons/HeartIcon'
import { Nullable } from '@/models/common'
import { StarRatingDialog } from './dialogs/StarRatingDialog'
import useToggle from '@/hooks/useToggle'
import { useRouter } from 'next/navigation'
import { favouritiseComic } from '@/app/lib/api/comic/mutations'
import { favouritiseComicIssue } from '@/app/lib/api/comicIssue/mutations'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  averageRating?: Nullable<number>
  comicIssueId?: number
  comicSlug?: string
  isFavourite?: boolean
  favouritesCount?: number
  orientation?: 'horizontal' | 'vertical'
  rating?: Nullable<number>
}

export const InfoListActions: React.FC<Props> = ({
  averageRating,
  className,
  comicIssueId,
  comicSlug,
  isFavourite = false,
  favouritesCount = 0,
  orientation = 'vertical',
  rating,
}) => {
  const [isOpenStarRatingDialog, toggleStarRating] = useToggle()
  return (
    <>
      <InfoList className={className} orientation={orientation}>
        <Button className='rounded-none' onClick={toggleStarRating} variant='ghost'>
          <StarIcon size='lg' solid={!isNil(rating)} />
          &nbsp;<span>{roundNumber(averageRating ?? null) || '-'}</span>
        </Button>
        <HeartIconButton
          comicIssueId={comicIssueId}
          comicSlug={comicSlug}
          count={favouritesCount}
          isFavourite={isFavourite}
        />
      </InfoList>
      <StarRatingDialog
        comicSlug={comicSlug}
        comicIssueId={comicIssueId}
        open={isOpenStarRatingDialog}
        toggleDialog={toggleStarRating}
      />
    </>
  )
}

type HeartIconButtonProps = {
  comicSlug?: string
  comicIssueId?: number
  count: number
  isFavourite: boolean
}

const HeartIconButton: React.FC<HeartIconButtonProps> = ({ comicIssueId, comicSlug, count, isFavourite }) => {
  const [state, setNewState] = useOptimistic(
    {
      count,
      isFavourite,
    },
    (state) => {
      return {
        count: state.isFavourite ? state.count - 1 : state.count + 1,
        isFavourite: !state.isFavourite,
      }
    }
  )
  const { refresh } = useRouter()

  const handleSubmit = async () => {
    setNewState(null)
    if (comicSlug) {
      await favouritiseComic(comicSlug)
    } else if (comicIssueId) {
      await favouritiseComicIssue(comicIssueId)
    }
    refresh()
  }

  return (
    <Button onClick={handleSubmit} variant='ghost'>
      <HeartIcon solid={state.isFavourite} />
      &nbsp;<span>{state.count}</span>
    </Button>
  )
}
