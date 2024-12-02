import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../../ui'
import { Comic } from '@/models/comic'
import { RoutePath } from '@/enums/routePath'
import { cn } from '@/lib/utils'
import { COMIC_COVER_SIZE } from '@/constants/imageSizes'
import { CopiesCount } from '@/components/shared/CopiesCount'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  comic: Comic
}

export const DefaultComicCard: React.FC<Props> = ({ comic, className }) => {
  const isFree = false // TODO: showIsFree && comic.isFree

  return (
    <Link
      href={RoutePath.Comic(comic.slug)}
      prefetch={false}
      className={cn(
        'flex flex-col gap-3 w-full relative hover:brightness-110 p-2 border border-grey-300 rounded-2xl size-full',
        className
      )}
    >
      <Image
        src={comic.cover}
        alt=''
        className='rounded-2xl h-auto aspect-comic-cover object-cover opacity-50'
        {...COMIC_COVER_SIZE}
      />
      <div className='absolute w-[120px] h-[120px] m-auto -top-2 bottom-14 left-0 right-0'>
        <Image alt='' src={comic.logo} fill className='object-contain pointer-events-none' />
      </div>
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
        <CopiesCount count={comic.stats?.issuesCount} episodes />
      </div>
      <div className='flex flex-col px-2'>
        <Text
          title={comic.title}
          as='p'
          styleVariant='body-large'
          fontWeight='bold'
          className='line-clamp-1 overflow-ellipsis'
        >
          {comic.title}
        </Text>
        <Text as='p' styleVariant='body-normal' className='text-grey-100 line-clamp-1 overflow-ellipsis'>
          {comic.creator ? 'by ' + comic.creator.name : ''}
        </Text>
      </div>
    </Link>
  )
}
