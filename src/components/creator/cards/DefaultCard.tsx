import Link from 'next/link'
import Image from 'next/image'
import { Text } from '@/components/ui'
import UserPlusIcon from 'public/assets/vector-icons/user-plus-icon.svg'
import { AvatarImage } from '@/components/shared/AvatarImage'
import { Creator } from '@/models/creator'
import { RoutePath } from '@/enums/routePath'
import { CREATOR_BANNER_SIZE } from '@/constants/imageSizes'
import { followCreator } from '@/app/lib/api/creator/mutations'
import { useRouter } from 'next/navigation'
import { pluralizeString } from '@/utils/helpers'
import { cn } from '@/lib/utils'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  creator: Creator
}

export const DefaultCard: React.FC<Props> = ({ creator, className }) => {
  const { refresh } = useRouter()

  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    await followCreator({
      slug: creator.slug,
    })

    refresh()
  }

  // const handleUnfollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault()
  //   e.stopPropagation()

  //   await unfollowCreator({
  //     slug: creator.slug,
  //   })

  //   refresh()
  // }

  return (
    <Link
      href={RoutePath.Creator(creator.slug)}
      prefetch={false}
      className={cn(
        'flex flex-col gap-2 w-full rounded-2xl hover:brightness-110 border border-grey-300 p-2',
        className
      )}
    >
      <Image
        src={creator.banner}
        alt=''
        className='rounded-2xl w-full aspect-creator-banner object-cover object-top'
        {...CREATOR_BANNER_SIZE}
      />
      <div className='flex relative p-2 justify-between mt-4 gap-2 flex-col items-center pb-1 md:gap-0 md:flex-row md:items-start'>
        <AvatarImage
          src={creator.avatar}
          alt=''
          size='large'
          className='absolute max-md:-top-7 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:-translate-y-1/2 md:inset-x-6 md:-inset-y-14'
        />
        <div className='flex flex-col items-center md:items-start'>
          <Text
            as='span'
            styleVariant='body-large'
            fontWeight='bold'
            className='line-clamp-1 overflow-ellipsis max-sm:text-base'
          >
            {creator.name}
          </Text>
          <Text as='span' styleVariant='body-normal' className='line-clamp-1 overflow-ellipsis max-sm:text-sm'>
            {creator.stats.followersCount + ' ' + pluralizeString('Follower', creator.stats.followersCount)}
          </Text>
        </div>
        {!creator.myStats?.isFollowing && (
          <button
            className='flex bg-grey-300 bg-opacity-30 items-center rounded-xl gap-2 max-md:mt-1 p-4 max-h-9 sm:max-h-11 text-grey-100'
            onClick={handleFollow}
          >
            <UserPlusIcon className='w-4 sm:w-5' />
            <Text as='span' styleVariant='body-large' fontWeight='medium' className='max-sm:text-sm'>
              Follow
            </Text>
          </button>
        )}
        {creator.myStats?.isFollowing && (
          <button
            className='flex bg-grey-300 bg-opacity-30 items-center rounded-xl gap-2 max-md:mt-1 p-4 max-h-9 sm:max-h-11 text-grey-100'
            onClick={handleFollow}
          >
            <UserPlusIcon className='w-5' />
            <Text as='span' styleVariant='body-large' fontWeight='medium' className='max-sm:text-sm'>
              Unfollow
            </Text>
          </button>
        )}
      </div>
    </Link>
  )
}
