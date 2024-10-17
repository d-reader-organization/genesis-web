import React from 'react'
import { InfoList } from '../shared/InfoList'
import { Comic } from '@/models/comic'
import { CollectionStatusItem } from '../shared/CollectionStatusItem'
import { InfoListActions } from '../shared/InfoListActions'

type Props = { comic: Comic }

export const ComicStats: React.FC<Props> = ({ comic }) => {
  return (
    <div className='flex justify-start gap-4 md:flex-row-reverse md:justify-end'>
      <InfoList orientation='vertical'>
        <CollectionStatusItem label='issues' value={comic.stats?.issuesCount} />
        <CollectionStatusItem label='readers' value={comic.stats?.viewersCount} />
        <CollectionStatusItem label='ongoing' value={comic.isCompleted ? 'no ' : 'yes'} />
      </InfoList>

      <InfoListActions
        averageRating={comic.stats?.averageRating}
        comicSlug={comic.slug}
        favouritesCount={comic.stats?.favouritesCount}
        isFavourite={comic.myStats?.isFavourite}
        rating={comic.myStats?.rating}
      />
    </div>
  )
}
