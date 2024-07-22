import VerifiedIcon from 'public/assets/vector-icons/verified-icon.svg'
import { getRandomFloat } from '@/utils/helpers'
import { Creator } from '@/models/creator'
import Image from 'next/image'
import clsx from 'clsx'
import { Text } from '../ui'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  creator: Creator
}

export const CreatorItem: React.FC<Props> = ({ creator, className, ...props }) => {
  return (
    <div
      className={clsx(
        'w-full relative flex bg-grey-500 border-[3.2px] rounded-2xl border-solid border-grey-500 py-3 px-4 cursor-pointer transition ease-in transform duration-200 hover:-translate-y-1',
        className
      )}
      {...props}
    >
      <Image
        width={60}
        height={60}
        className='z-0 object-cover rounded-full bg-grey-700 w-[60px] h-[60px]'
        src={creator.avatar}
        alt=''
      />
      <div className='flex flex-col py-2 pr-2 pl-1 w-full overflow-hidden'>
        <div className='flex items-center w-full'>
          <Text as='p' className='font-bold text-ellipsis overflow-hidden whitespace-nowrap'>
            {creator.name}
          </Text>
          {creator.isVerified ? <VerifiedIcon className='h-[14px] w-[14px] ml-2' /> : ''}
        </div>
        <Text as='p' className='text-[#abff2e]'>
          {'--' || getRandomFloat(10, 30)} %
        </Text>
      </div>
    </div>
  )
}
