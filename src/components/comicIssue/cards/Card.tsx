import { ComicIssue } from '@/models/comicIssue'
import Image from 'next/image'
import clsx from 'clsx'
import { RoutePath } from '@/enums/routePath'
import Link from 'next/link'
import { Text } from '../../ui'
import { Overlay } from '../Overlay'
import { PriceTag } from '../../shared/tags/PriceTag'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  comicIssue: ComicIssue
}

export const ComicIssueCard: React.FC<Props> = ({ comicIssue, className, ...props }) => (
  <div
    className={clsx(
      'relative border-[3.2px] rounded-2xl border-solid border-grey-500 aspect-comic-issue-cover-aspect-ratio w-full cursor-pointer pointer transition ease-in transform duration-200 hover:-translate-y-1',
      className
    )}
    {...props}
  >
    <Link
      className='absolute top-0 left-0 w-full h-full text-inherit'
      href={RoutePath.ComicIssue(comicIssue.id)}
      prefetch={false}
    >
      <Overlay className='rounded-2xl' />
      <Image
        sizes='(max-width: 580px) 100vw,(max-width: 900px) 50vw,(max-width: 1200)33vw,25vw'
        className='-z-[1] object-cover rounded-2xl'
        src={comicIssue.cover}
        alt=''
        fill
      />

      <div className='w-full py-2 px-4 absolute bottom-0 left-0'>
        {comicIssue.comic && (
          <Text
            className='w-full text-grey-100 text-ellipsis overflow-hidden whitespace-nowrap'
            as='p'
            styleVariant='body-normal'
          >
            {comicIssue.comic.title}
          </Text>
        )}
        <Text className='w-full font-bold overflow-hidden whitespace-nowrap' as='p' styleVariant='body-normal'>
          {comicIssue.title}
        </Text>

        <div className='flex justify-between'>
          {comicIssue.stats && (
            <div className='py-[0.1rem] text-center rounded-[32px] text-sm select-none'>
              EP {comicIssue.number}/{comicIssue.stats.totalIssuesCount}
            </div>
          )}
          {comicIssue.stats && <PriceTag from colorfulIcon size={14} price={comicIssue.stats.price} />}
        </div>
      </div>
    </Link>
  </div>
)
