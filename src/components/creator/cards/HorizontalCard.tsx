import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../../ui'
import { IconLink } from '@/components/shared/IconLink'
import UserPlusIcon from 'public/assets/vector-icons/user-plus-icon.svg'
import { AvatarImage } from '@/components/shared/AvatarImage'
import { Creator } from '@/models/creator'
import { RoutePath } from '@/enums/routePath'
import { CREATOR_IMAGE_SIZES } from '@/constants/imageSizes'

type Props = {
  creator: Creator
}

export const HorizontalCreatorCard: React.FC<Props> = ({ creator }) => (
  <Link
    href={RoutePath.Creator(creator.slug)}
    className='flex flex-col w-full rounded-xl hover:brightness-115 border border-grey-300 p-2'
    key={creator.slug}
  >
    <Image
      src={creator.banner}
      alt=''
      className='rounded-xl w-full aspect-creator-banner object-cover object-top'
      {...CREATOR_IMAGE_SIZES['banner']}
    />
    <div className='relative p-2 flex gap-2 items-end justify-between h-full'>
      <AvatarImage src={creator.avatar} alt='' size='medium' className='absolute inset-x-4 -inset-y-8' />
      <div className='flex flex-col items-start justify-end'>
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
