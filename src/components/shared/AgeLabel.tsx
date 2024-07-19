import React from 'react'
import { Text } from '../ui'

type Props = { age: number }

export const AgeLabel: React.FC<Props> = ({ age }) => (
  <div className='flex justify-center items-center border-2 p-1 rounded-full border-orange-400 size-7'>
    <Text className='text-xs font-bold' as='p'>
      {age}
    </Text>
  </div>
)
