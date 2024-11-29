import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../../ui'
import { Comic } from '@/models/comic'
import { RoutePath } from '@/enums/routePath'
import { Ellipsis } from 'lucide-react'
import { cn } from '@/lib/utils'
import { COMIC_IMAGE_SIZES } from '@/constants/imageSizes'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  comic: Comic
  showNumberOfEps?: boolean
  showEpsText?: boolean
  showLogo?: boolean
  withCoverOpacity?: boolean
  showReadButton?: boolean
}

export const ComicCard: React.FC<Props> = ({
  comic,
  showNumberOfEps = true,
  showEpsText: showEpisodesTag = true,
  showReadButton = false,
  showLogo = false,
  withCoverOpacity = false,
  //showIsFree = true,
  className,
}) => {
  const issuesCount = comic.stats?.issuesCount ?? 0
  const issuesLabel = issuesCount > 1 ? 'EPs' : 'EP'
  //const isFree = showIsFree && comic.isFree

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
        className={cn('rounded-xl h-auto aspect-comic-cover object-cover', withCoverOpacity && 'opacity-50')}
        {...COMIC_IMAGE_SIZES['cover']}
      />
      {showLogo && (
        <Image
          alt=''
          src={comic.logo}
          width={120}
          height={120}
          className='object-cover h-120 w-auto absolute m-auto -top-2 bottom-14 left-0 right-0 pointer-events-none'
        />
      )}
      <div className='flex absolute top-3 right-3 gap-1'>
        {/** comic isfree missing in api model, plug isFree const */}
        {false && (
          <Text
            as='span'
            styleVariant='body-normal'
            fontWeight='bold'
            className='bg-yellow-500 rounded-xl p-1 px-2 text-black'
          >
            FREE
          </Text>
        )}
        {comic.stats?.issuesCount && (
          <Text
            as='p'
            styleVariant='body-normal'
            fontWeight='bold'
            className=' bg-white bg-opacity-20 rounded-xl backdrop-blur-lg p-1 px-2'
          >
            {showNumberOfEps && issuesCount} {showEpisodesTag && issuesLabel}
          </Text>
        )}
      </div>
      <div className='flex flex-col px-2'>
        <Text as='p' styleVariant='body-large' fontWeight='bold' className='line-clamp-1 overflow-ellipsis'>
          {comic.title}
        </Text>
        <Text as='p' styleVariant='body-normal' className='text-grey-100 line-clamp-1 overflow-ellipsis'>
          {comic.creator ? 'by ' + comic.creator.name : ''}
        </Text>
      </div>
      {showReadButton && (
        <div className='flex w-full gap-3 max-h-10 px-2'>
          <Link
            href={RoutePath.ReadComic(comic.slug)}
            className='flex w-full items-center justify-center rounded-xl bg-grey-400 text-grey-100 p-3 shadow-md'
          >
            <Text as='p' styleVariant='body-large'>
              Read
            </Text>
          </Link>
          <button className='flex justify-center items-center p-2 border border-grey-300 rounded-xl'>
            <Ellipsis />
          </button>
        </div>
      )}
    </Link>
  )
}
//TODO: pluralize string, dropdown icon, 