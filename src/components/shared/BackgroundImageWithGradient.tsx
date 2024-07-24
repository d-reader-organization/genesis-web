import React, { PropsWithChildren } from 'react'
type Props = {
  image: string
} & PropsWithChildren

export const BackgroundImageWithGradient: React.FC<Props> = ({ children, image }) => (
  <>
    <div
      className='bg-cover bg-no-repeat bg-center fixed top-0 left-0 -z-[1] w-full h-screen opacity-10'
      style={{ backgroundImage: `url('${image}')` }}
    >
      <div className='absolute left-0 right-0 bottom-0 top-auto -z-[1] bg-0-top bg-repeat-x size-full md:bg-[linear-gradient(180deg,rgba(21,23,28,1)_0%,rgba(21,23,28,0)_77.29%)]' />
    </div>
    <div className='flex justify-center absolute w-full top-24'>{children}</div>
  </>
)
