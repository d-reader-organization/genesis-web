import { pluralizeString } from '@/utils/helpers'
import { Text } from '../ui/Text'
import React from 'react'

type Props = {
  count: number
  withText?: boolean
}

export const CopiesCount: React.FC<Props> = ({ count, withText = false }) => (
  <div className='absolute top-2 right-2 bg-white bg-opacity-20 h-6 min-w-6 w-fit p-1 flex justify-center items-center rounded-lg'>
    <Text as='span' styleVariant='body-small' fontWeight='bold' className='leading-140'>
      {count}
      {withText ? ` ${pluralizeString(count, 'EP')}` : ''}
    </Text>
  </div>
)
