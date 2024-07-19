import React from 'react'
import { Text } from '@/components/ui'

type Props = {
  count: number
}

export const TotalPagesText: React.FC<Props> = ({ count }) => (
  <div className='flex gap-1'>
    <Text className='text-lg font-medium' as='p'>
      {count}
    </Text>
    <Text className='text-lg font-medium text-grey-100' as='p'>
      pages
    </Text>
  </div>
)
