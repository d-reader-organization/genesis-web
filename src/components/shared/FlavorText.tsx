import React from 'react'
import { Text } from '@/components/ui/Text'

export const FlavorText: React.FC<{ text: string }> = ({ text }) => (
  <Text className='border-l-4 border-l-important-color italic pl-2 mb-2 text-grey-100' as='p'>
    {text}
  </Text>
)
