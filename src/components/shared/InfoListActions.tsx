'use client'

import React from 'react'
import { InfoList } from './InfoList'
import { Button } from '../ui/Button'
import { StarIcon } from './icons/StarIcon'
import { isNil } from 'lodash'
import { roundNumber } from '@/utils/numbers'
import { HeartIcon } from './icons/HeartIcon'
import { Nullable } from '@/models/common'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  averageRating?: Nullable<number>
  isFavourite?: boolean
  favouritesCount?: number
  orientation?: 'horizontal' | 'vertical'
  rating?: Nullable<number>
}

export const InfoListActions: React.FC<Props> = ({
  averageRating,
  className,
  isFavourite = false,
  favouritesCount = 0,
  orientation = 'vertical',
  rating,
}) => (
  <InfoList className={className} orientation={orientation}>
    <Button className='rounded-none' onClick={() => console.log(`open star rating dialog`)} variant='ghost'>
      <StarIcon size='lg' solid={!isNil(rating)} />
      &nbsp;<span>{roundNumber(averageRating ?? null) || '-'}</span>
    </Button>
    <Button onClick={() => console.log(`favorite comic`)} variant='ghost'>
      <HeartIcon solid={isFavourite} />
      &nbsp;<span>{favouritesCount}</span>
    </Button>
  </InfoList>
)
