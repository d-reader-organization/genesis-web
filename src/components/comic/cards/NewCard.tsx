import { Comic } from '@/models/comic'
import Link from 'next/link'
import React from 'react'
import { ContentWithGradientImageBg } from '../../shared/ContentWithGradientImageBg'
import { cn } from '@/lib/utils'
import { Text } from '../../ui/Text'
import { RoutePath } from '@/enums/routePath'
import { pluralizeString } from '@/utils/helpers'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  comic: Comic
}

export const NewCard: React.FC<Props> = ({ className, comic }) => (
  <Link
    href={RoutePath.Comic(comic.slug)}
    prefetch={false}
    className='flex flex-col aspect-comic-cover justify-end w-full p-2 border border-grey-300 rounded-xl size-full'
  >
    <ContentWithGradientImageBg
      image={comic.cover}
      className={cn('hover:brightness-110 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)]', className)}
      gradientClassName='from-grey-500'
      gradientDirectionClassName='bg-gradient-to-t'
    >
      <div className='flex flex-col gap-2 absolute bottom-0 p-2 sm:p-4'>
          <Text as='h4' styleVariant='secondary-heading' className='line-clamp-1 overflow-ellipsis max-md:text-sm'>
            {comic.title}
          </Text>
          {comic.stats && (
            <Text
              as='span'
              styleVariant='body-normal'
              className='line-clamp-1 overflow-ellipsis text-grey-100 max-md:text-xs'
            >
              {comic.stats.issuesCount + ' ' + pluralizeString('Episode', comic.stats.issuesCount)}
            </Text>
          )}
          <div className='flex flex-wrap gap-2'>
            {comic.genres &&
              comic.genres.map((name, index) => (
                <div
                  className={cn(
                    'flex justify-center items-center px-2 py-[2px] rounded-lg',
                    index === 0 ? 'bg-transparent border border-grey-100' : 'bg-grey-300 bg-opacity-30'
                  )}
                  key={`${name}-${index}`}
                >
                  <Text as='span' styleVariant='body-normal' className='text-grey-100'>
                    {name.name}
                  </Text>
                </div>
              ))}
          </div>
        </div>
    </ContentWithGradientImageBg>
  </Link>
)
