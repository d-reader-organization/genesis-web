'use client'

import React from 'react'
import { InfoList } from '../shared/InfoList'
import { Button } from '../ui/Button'
import { StarIcon } from '../shared/icons/StarIcon'
import { roundNumber } from '@/utils/numbers'
import { isNil } from 'lodash'
import { Comic } from '@/models/comic'
import { HeartIcon } from '../shared/icons/HeartIcon'
import { CollectionStatusItem } from '../shared/CollectionStatusItem'
import { PriceTag } from '../tags/PriceTag'

type Props = { comic: Comic }

export const ComicStats: React.FC<Props> = ({ comic }) => {
  return (
    <div className='flex justify-start gap-4 md:flex-row-reverse md:justify-end'>
      <InfoList orientation='vertical'>
        <CollectionStatusItem
          label='volume'
          value={<PriceTag maxDecimals={0} price={1030220000000} bold symbol reverse />}
        />
        <CollectionStatusItem label='issues' value={comic.stats?.issuesCount} />
        <CollectionStatusItem label='readers' value={comic.stats?.viewersCount} />
        <CollectionStatusItem label='ongoing' value={comic.isCompleted ? 'no ' : 'yes'} />
      </InfoList>

      <InfoList orientation='vertical'>
        <Button className='rounded-none' onClick={() => console.log(`open star rating dialog`)} variant='ghost'>
          <StarIcon size='lg' solid={!isNil(comic.myStats?.rating)} />
          &nbsp;<span>{roundNumber(comic.stats?.averageRating ?? null) || '-'}</span>
        </Button>
        <Button onClick={() => console.log(`favorite comic`)} variant='ghost'>
          <HeartIcon solid={comic.myStats?.isFavourite} />
          &nbsp;<span>{comic.stats?.favouritesCount}</span>
        </Button>
      </InfoList>
    </div>
  )
}
