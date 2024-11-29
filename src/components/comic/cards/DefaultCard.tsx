import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../../ui'
import { Comic } from '@/models/comic'
import { RoutePath } from '@/enums/routePath'
import { cn } from '@/lib/utils'
import { COMIC_COVER_SIZE } from '@/constants/imageSizes'
import { pluralizeString } from '@/utils/helpers'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  comic: Comic
}

export const DefaultComicCard: React.FC<Props> = ({
  comic,
  className,
}) => {
  const issuesLabel = pluralizeString('EP', comic.stats?.issuesCount)
  const isFree = false // TODO: showIsFree && comic.isFree

  return (
    <Link
      href={RoutePath.Comic(comic.slug)}
      prefetch={false}
      className={cn(
        'flex flex-col gap-3 w-full relative rounded-xl hover:brightness-110 border border-grey-300 p-2 pb-3',
        className
      )}
    >
      <Image
        src={comic.cover}
        alt=''
        className={cn('rounded-xl h-auto aspect-comic-cover object-cover')}
        {...COMIC_COVER_SIZE}
      />
      <Image
        alt=''
        src={comic.logo}
        width={120}
        height={120}
        // TODO: logo actually has no standard height and width, IMHO this should be a fill 🤔
        className='object-cover h-120 w-auto absolute m-auto -top-2 bottom-14 left-0 right-0 pointer-events-none'
      />
      <div className='flex absolute top-3 right-3 gap-1'>
        {isFree && (
          <Text
            as='span'
            styleVariant='body-normal'
            fontWeight='bold'
            className='bg-yellow-500 rounded-xl p-1 px-2 text-black'
          >
            FREE
          </Text>
        )}
        {issuesLabel && (
          <Text
            as='p'
            styleVariant='body-normal'
            fontWeight='bold'
            className=' bg-white bg-opacity-20 rounded-xl backdrop-blur-lg p-1 px-2'
          >
            {issuesLabel}
          </Text>
        )}
      </div>
      <div className='flex flex-col px-2'>
        <Text title={comic.title} as='p' styleVariant='body-large' fontWeight='bold' className='line-clamp-1 overflow-ellipsis'>
          {comic.title}
        </Text>
        <Text as='p' styleVariant='body-normal' className='text-grey-100 line-clamp-1 overflow-ellipsis'>
          {comic.creator ? 'by ' + comic.creator.name : ''}
        </Text>
      </div>
    </Link>
  )
}