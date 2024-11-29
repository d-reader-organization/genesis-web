import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../../ui'
import { IconLink } from '@/components/shared/IconLink'
import UserPlusIcon from 'public/assets/vector-icons/user-plus-icon.svg'
import { AvatarImage, AvatarSize } from '@/components/shared/AvatarImage'
import { Creator } from '@/models/creator'
import { RoutePath } from '@/enums/routePath'
import { CREATOR_IMAGE_SIZES } from '@/constants/imageSizes'

type Props = {
  creator: Creator
  avatarSize?: AvatarSize
}

export const VerticalCreatorCard: React.FC<Props> = ({ creator, avatarSize = 'medium' }) => (
  <Link
    href={RoutePath.Creator(creator.slug)}
    className='flex flex-col w-full rounded-xl hover:brightness-115 border border-grey-300 p-2'
    key={creator.slug}
  >
    <Image
      src={creator.banner}
      alt=''
      className='rounded-xl w-full object-cover object-top aspect-creator-banner'
      {...CREATOR_IMAGE_SIZES['banner']}
    />
    <div className='flex flex-col relative p-2 gap-2 items-center h-full'>
      <AvatarImage
        src={creator.avatar}
        alt=''
        size={avatarSize}
        className='absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      />
      <div className='flex flex-col items-center mt-5'>
        <Text as='p' styleVariant='body-large' fontWeight='bold' className='line-clamp-1 overflow-ellipsis'>
          {creator.name}
        </Text>
        <Text as='p' styleVariant='body-normal'>
          {creator.stats.followersCount + ' Followers'}
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
