import React from 'react'
import { Text } from '../ui'
import LogoIcon from 'public/assets/vector-icons/logo-with-text.svg'

type Props = {
  title?: string
}

const UnauthenticatedNavigation: React.FC<Props> = ({ title }) => (
  <div className='flex justify-between w-full border-b border-grey-300 p-6'>
    {title ? (
      <Text as='h1' className='font-semibold text-[32px] empty:before:content-[\200B]'>
        {title}
      </Text>
    ) : (
      <LogoIcon className='h-8 w-auto' />
    )}
  </div>
)

export { UnauthenticatedNavigation }
