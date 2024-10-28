import React from 'react'
import { Text } from '../ui/Text'

type InfoProps = {
  title: string
  value: string | number
}

export const InfoStats: React.FC<InfoProps> = ({ title, value }) => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <Text as='span' styleVariant='body-normal' className='text-grey-100' fontWeight='medium'>
        {title}
      </Text>
      <Text as='span' styleVariant='body-large' className='font-obviouslyNarrow' fontWeight='semibold'>
        {value}
      </Text>
    </div>
  )
}
