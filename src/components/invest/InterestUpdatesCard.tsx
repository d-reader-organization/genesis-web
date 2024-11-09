'use client'

import { useFetchUserInterestedReceipts } from '@/api/invest/queries/useFetchUserInterestedReceipts'
import { formatDate } from 'date-fns'
import { Text } from '../ui'
import { Divider } from '../shared/Divider'
import clsx from 'clsx'
import ACTIVITY_ICON from 'public/assets/vector-icons/activity-icon.svg'
import ANON_BUNNY from 'public/assets/images/anon-bunny.png'
import Image from 'next/image'

type Props = {
  slug: string
  className: string
}

export const InterestUpdatesCard: React.FC<Props> = ({ slug, className }) => {
  const { data: receipts } = useFetchUserInterestedReceipts(slug)

  return (
    receipts &&
    receipts.length > 0 && (
      <div
        className={clsx(
          'flex flex-col mx-auto mt-8 w-full md:max-w-[488px] md:max-h-[478px] bg-grey-500 rounded-xl p-2 max-md:rounded-none',
          className
        )}
      >
        <div className='flex justify-between rounded-t-lg py-6 px-4 bg-grey-600 max-md:bg-grey-500 items-center'>
          <Text as='h5' styleVariant='primary-heading'>
            Campaign Activity
          </Text>
          <ACTIVITY_ICON />
        </div>
        <div className='bg-grey-300 overflow-y-auto h-[362px]'>
          <div className='flex flex-col gap-6 p-6 pl-4 pr-2 bg-grey-500'>
            {receipts.map((receipt) => (
              <div key={receipt.id} className='flex flex-col gap-6'>
                <div className='flex gap-4'>
                  <Image
                    alt='avatar'
                    src={ANON_BUNNY}
                    width={32}
                    height={32}
                    className='size-7 object-cover rounded-full border border-black'
                  />
                  <Text as='p' styleVariant='body-normal'>
                    <strong>{receipt.username}</strong> has expressed interest to invest{' '}
                    <strong>${receipt.expressedAmount}!</strong> {formatDate(receipt.timestamp, 'MM/dd/yyyy')}
                  </Text>
                </div>
                <Divider />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  )
}
