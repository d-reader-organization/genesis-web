import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../ui'
import { Comic } from '@/models/comic'
import { RoutePath } from '@/enums/routePath'
import { Ellipsis } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  comic: Comic
  showNumberOfEps?: boolean
  showEpsText?: boolean
  showReadButton?: boolean
}

export const ComicCard: React.FC<Props> = ({
  comic,
  showNumberOfEps = false,
  showEpsText = false,
  showReadButton = false,
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
        'flex flex-col gap-2 relative w-full rounded-xl hover:brightness-115 border border-grey-300 p-2 pb-3',
        className
      )}
    >
      <Image
        alt={comic.title}
        src={comic.cover}
        className='rounded-xl h-auto w-full aspect-comic-cover object-cover'
        width={1000}
        height={895}
      />
      <div className='flex absolute top-3 right-3 gap-1'>
        {/** comic isfree missing in api model, plug isFree const */}
        {false && (
          <Text
            as='p'
            styleVariant='body-normal'
            fontWeight='bold'
            className='bg-yellow-500 rounded-xl px-2 text-black'
          >
            FREE
          </Text>
        )}
        {comic.stats?.issuesCount && (
          <Text
            as='p'
            styleVariant='body-normal'
            fontWeight='bold'
            className=' bg-gray-700 bg-opacity-60 rounded-xl px-2 backdrop-blur-lg'
          >
            {showNumberOfEps && issuesCount} {showEpsText && issuesLabel}
          </Text>
        )}
      </div>
      <div className='flex flex-col px-2 justify-center'>
        <Text as='p' styleVariant='body-large' fontWeight='bold' className='line-clamp-1 overflow-ellipsis'>
          {comic.title}
        </Text>
        <Text as='p' styleVariant='body-normal' className='text-grey-100 line-clamp-1 overflow-ellipsis'>
          {comic.creator ? 'by ' + comic.creator.name : ''}
        </Text>
        {showReadButton && (
          <div className='flex w-full gap-3 max-h-10 mt-2'>
            <Link
              href={RoutePath.ComicRead(comic.slug)}
              className='flex w-full items-center justify-center rounded-xl bg-grey-400 text-grey-100  p-3'
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
      </div>
    </Link>
  )
}
