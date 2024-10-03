import React, { PropsWithChildren } from 'react'
import Image from 'next/image'

type Props = {
  image: string
} & PropsWithChildren

export const ContentWithGradientImageBg: React.FC<Props> = ({ children, image }) => (
  <div className='relative h-full w-full overflow-hidden rounded-xl p-4'>
    <Image src={image} alt='Background' className='object-cover' fill priority />
    <div className='absolute inset-0 bg-gradient-to-b from-grey-500 to-transparent' />
    <div className='relative z-10 h-full'>{children}</div>
  </div>
)
