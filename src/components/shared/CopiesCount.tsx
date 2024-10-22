import { Text } from '../ui/Text'
import React from 'react'

type Props = {
  count: number
}

export const CopiesCount: React.FC<Props> = ({ count }) => (
  <Text as='span' styleVariant='body-small' fontWeight='bold' className='leading-140'>
    {count}
  </Text>
)
