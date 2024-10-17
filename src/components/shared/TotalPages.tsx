import React from 'react'
import { Text } from '@/components/ui'

type Props = {
  count: number
}

export const TotalPagesText: React.FC<Props> = ({ count }) => (
  <div className='flex gap-1'>
    <Text as='p' styleVariant='body-large' fontWeight='medium'>
      {count}
    </Text>
    <Text className='text-grey-100' as='p' styleVariant='body-large' fontWeight='medium'>
      pages
    </Text>
  </div>
)
