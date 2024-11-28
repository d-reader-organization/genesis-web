import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../ui'
import { IconLink } from '@/components/shared/IconLink'
import UserPlusIcon from 'public/assets/vector-icons/user-plus-icon.svg'
import { AvatarImage } from '@/components/shared/AvatarImage'
import { Creator } from '@/models/creator'
import { RoutePath } from '@/enums/routePath'

type Props = {
  creator: Creator
}

export const CreatorCard: React.FC<Props> = ({ creator }) => (
  <Link
    href={RoutePath.Creator(creator.slug)}
    className='flex flex-col h-[220px] w-full rounded-xl hover:brightness-125 border border-grey-300 p-2'
    key={creator.slug}
  >
    <Image
      src={creator.banner}
      alt={''}
      className='rounded-xl h-[126px] w-full'
      style={{ objectFit: 'cover', objectPosition: 'top' }}
      width={1536}
      height={300}
    />
    <div className='relative p-2 flex gap-2 items-end justify-between h-full'>
      <AvatarImage
        src={creator.avatar}
        alt={`${creator.name} Avatar`}
        size='medium'
        className='absolute inset-x-4 -inset-y-8'
      />
      <div className='flex flex-col items-start justify-end'>
        <Text as='p' styleVariant='body-large' fontWeight='bold' className='line-clamp-1 overflow-ellipsis'>
          {creator.name}
        </Text>
        <Text as='p' styleVariant='body-normal'>
          {`${creator.stats.followersCount} Followers`}
        </Text>
      </div>
      <IconLink
        className='flex bg-grey-400 rounded-lg sm:rounded-xl gap-2 p-4 max-h-12 text-grey-100'
        href={'#'}
        Icon={UserPlusIcon}
      >
        <UserPlusIcon className='w-5' />
        <Text as='p' styleVariant='body-large' fontWeight='medium' className='max-sm:text-xs'>
          Follow
        </Text>
      </IconLink>
    </div>
  </Link>
)
//TODO CHECK GRIDS