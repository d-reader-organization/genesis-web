import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../../ui'
import { PriceTag } from '../../shared/tags/PriceTag'
import { ComicIssue } from '@/models/comicIssue'
import { RoutePath } from '@/enums/routePath'
import { cn } from '@/lib/utils'
import { COMIC_ISSUE_COVER_SIZE } from '@/constants/imageSizes'
import { OverflownTextWithTooltip } from '@/components/ui/OverflownTextWithTooltip'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  comicIssue: ComicIssue
}

export const ComicIssueCard: React.FC<Props> = ({ comicIssue, className }) => {
  const isFree = !(comicIssue.stats?.price != null && comicIssue.stats.price !== 0)

  return (
    <Link
      href={RoutePath.ComicIssue(comicIssue.id)}
      className={cn(
        'flex relative flex-col w-full p-2 border border-grey-300 rounded-2xl hover:brightness-115',
        className
      )}
    >
      <Image
        src={comicIssue.cover}
        alt=''
        {...COMIC_ISSUE_COVER_SIZE}
        className='rounded-2xl h-auto w-full aspect-comic-issue-cover'
      />
      {isFree && (
        <Text
          as='span'
          styleVariant='body-normal'
          fontWeight='bold'
          className='bg-yellow-500 rounded-xl p-1 px-2 text-black absolute right-3 top-3'
        >
          FREE
        </Text>
      )}
      <div className='flex flex-col text-gray-100 px-2 pt-2'>
        {comicIssue.comic && (
          <Text as='span' styleVariant='body-normal' className='text-gray-100 line-clamp-1 overflow-ellipsis'>
            {comicIssue.comic.title}
          </Text>
        )}
        <OverflownTextWithTooltip text={comicIssue.title} className='text-lg font-bold' />
        {comicIssue.stats && (
          <div className='flex relative w-full justify-between text-gray-100'>
            <Text as='span' styleVariant='body-normal' className='text-gray-100'>
              EP {comicIssue.number}/{comicIssue.stats.totalIssuesCount}
            </Text>
            {!isFree && (
              <PriceTag styleVariant='body-normal' inline={false} bold icon size={14} price={comicIssue.stats.price} />
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
