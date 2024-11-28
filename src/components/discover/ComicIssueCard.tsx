import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../ui'
import { PriceTag } from '../shared/tags/PriceTag'
import { ComicIssue } from '@/models/comicIssue'
import { RoutePath } from '@/enums/routePath'
import { cn } from '@/lib/utils'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  comicIssue: ComicIssue
  showPrice?: boolean
}

export const ComicIssueCard: React.FC<Props> = ({ comicIssue, showPrice = true, className }) => {
  const isFree = !(comicIssue.stats?.price != null && comicIssue.stats.price !== 0)

  return (
    <Link
      href={RoutePath.ComicIssue(comicIssue.id)}
      className={cn(
        'flex relative flex-col w-full p-2 border border-grey-300 rounded-xl hover:brightness-115',
        className
      )}
    >
      <Image
        alt={''}
        src={comicIssue.cover}
        width={895}
        height={1000}
        className='rounded-xl h-auto w-full aspect-comic-issue-cover'
      />
      {showPrice && isFree && (
        <Text
          as='p'
          styleVariant='body-normal'
          fontWeight='bold'
          className='bg-yellow-500 rounded-xl px-2 text-black absolute right-4 top-4'
        >
          FREE
        </Text>
      )}
      <div className='flex flex-col  text-gray-100 px-2 pt-2'>
        {comicIssue.comic && (
          <Text as='p' styleVariant='body-normal' className='text-gray-100 line-clamp-1 overflow-ellipsis'>
            {comicIssue.comic.title}
          </Text>
        )}
        <Text as='p' styleVariant='body-large' fontWeight='bold' className='line-clamp-1 overflow-ellipsis'>
          {comicIssue.title}
        </Text>
        {comicIssue.stats && (
          <div className='flex relative w-full justify-between text-gray-100'>
            <Text as='p' styleVariant='body-normal' className='text-gray-100'>
              EP {comicIssue.number}/{comicIssue.stats.totalIssuesCount}
            </Text>
            {showPrice && !isFree && (
              <PriceTag styleVariant='body-normal' inline={false} icon size={14} price={comicIssue.stats.price} />
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
