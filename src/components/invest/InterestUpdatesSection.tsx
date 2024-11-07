'use client'

import { useFetchUserInterestedReceipts } from '@/api/invest/queries/useFetchUserInterestedReceipts'
import { formatDate } from 'date-fns'
import { Text } from '../ui'

type Props = {
  slug: string
}

export const InterestUpdatesSection: React.FC<Props> = ({ slug }) => {
  const { data: receipts } = useFetchUserInterestedReceipts(slug)

  return (
    <section className='w-full flex flex-col justify-center align-center gap-3 border-2 rounded-xl'>
      <div className='border-b-2 p-2'>
        <Text as='h3' styleVariant='secondary-heading'>
          Express Interest Updates
        </Text>
      </div>
      <div className='p-4 max-h-[300px] overflow-y-scroll'>
        {receipts &&
          receipts.map((receipt) => (
            <Text key={receipt.username} as='p' styleVariant='body-normal'>
              {receipt.username} has expressed interest to invest ${receipt.expressedAmount} on{' '}
              {formatDate(receipt.timestamp, 'MM/dd/yyyy')}
            </Text>
          ))}
      </div>
    </section>
  )
}
