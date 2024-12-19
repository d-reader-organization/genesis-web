import React from 'react'
import { Text } from '../ui/Text'
import { Comic } from '@/models/comic'
import { Socials } from '../shared/Socials'
import { AvatarImage } from '../shared/AvatarImage'
import { cn } from '@/lib/utils'
import { AudienceWidget } from '../shared/AudienceWidget'
import { StatsList } from '../shared/StatsList'
import { StatsItem } from '../shared/StatsItem'
import { RateComicButton } from './RateButton'
import { FavouritiseComicButton } from './FavouritiseButton'
import { BookmarkComicButton } from './BookmarkButton'
import { ViewMoreText } from '../ui/ViewMoreText'

type Props = {
  comic: Comic
}

export const ComicHeader: React.FC<Props> = ({ comic }) => (
  <div className='flex flex-col md:flex-row md:justify-between pb-8'>
    <LeftSection comic={comic} />
    <RightSection comic={comic} />
  </div>
)

const LeftSection: React.FC<Props> = ({ comic }) => {
  return (
    <div className='flex flex-col gap-7 w-full md:max-w-[680px] justify-end'>
      <Text className='font-normal' as='h3' styleVariant='primary-heading'>
        {comic.title}
      </Text>
      <div className='flex flex-col gap-3 pb-6'>
      {comic.genres && (
        <div className='flex flex-wrap gap-2'>
          {comic.genres.map((genre, index) => (
            <div
              className={cn('flex justify-center items-center px-2 py-[2px] rounded-lg bg-grey-500')}
              key={`${genre}-${index}`}
            >
              <Text as='span' styleVariant='body-normal' className='text-grey-100 max-sm:text-sm'>
                {genre.name}
              </Text>
            </div>
          ))}
          <AudienceWidget audience={comic.audienceType} />
        </div>
      )}
      <ViewMoreText as='p' className='whitespace-pre-wrap text-grey-100' styleVariant='body-normal'>
        {comic.description}
      </ViewMoreText>
      </div>
      {comic.creator && (
        <div className='flex items-center gap-3 pt'>
          <AvatarImage src={comic.creator.avatar} size='small' className='border-grey-300 border' />
          <Text as='p' styleVariant='body-normal' fontWeight='bold'>
            {comic.creator.name}
          </Text>
        </div>
      )}
    </div>
  )
}

const RightSection: React.FC<Props> = ({ comic }) => (
  <div className='flex flex-col w-full sm:max-w-[282px] gap-5 items-end'>
    <Socials website={comic.website} instagram={comic.instagram} twitter={comic.twitter} />
    <div className='flex justify-between w-full ACTIONBUTTONSWRAPPER'>
      <RateComicButton
        comicSlug={comic.slug}
        averageRating={comic.stats?.averageRating}
        rating={comic.myStats?.rating}
      />
      <FavouritiseComicButton
        comicSlug={comic.slug}
        isFavourite={comic.myStats?.isFavourite}
        favouritesCount={comic.stats?.favouritesCount}
      />
      <BookmarkComicButton comicSlug={comic.slug} isBookmarked={comic.myStats?.isBookmarked} />
    </div>
    <StatsList separator>
      <StatsItem label='Episodes' value={comic.stats?.issuesCount} />
      <StatsItem label='Episodes' value={comic.stats?.issuesCount} />
      <StatsItem label='Readers' value={comic.stats?.readersCount} />
      <StatsItem label='Series' value={comic.isCompleted ? 'Completed' : 'Ongoing'} />
    </StatsList>
  </div>
)
