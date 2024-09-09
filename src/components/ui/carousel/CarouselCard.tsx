import { Badge } from '@/components/shared/Badge'
import React from 'react'

type Props = {
  data?: unknown
}

export const CarouselCard: React.FC<Props> = () => {
  return (
    <div className='bg-grey-400 rounded-2xl shadow-[4px_4px_0px_0px_#000] max-h-[511px] max-w-[354px] flex flex-col justify-between p-4'>
      <Badge>
        <span className='size-[14px] rounded-full bg-green-500 mr-2 text-white' />
        Minting Live
      </Badge>
      <div className='flex flex-col gap-4'>
        <p className='text-grey-100 line-clamp-1 text-ellipsis whitespace-nowrap text-xl font-medium'>Comic name</p>
        <p className='line-clamp-1 text-ellipsis whitespace-nowrap text-xl font-bold'>Episode name</p>
      </div>
    </div>
  )
}
