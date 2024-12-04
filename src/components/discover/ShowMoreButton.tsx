'use client'

import { Text } from '../ui'
import LoaderCircle from 'public/assets/vector-icons/loader-circle.svg'
import ChevronDownIcon from 'public/assets/vector-icons/chevron-down.svg'

interface ShowMoreButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void
  disabled: boolean
}

export const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({ onClick, disabled, ...buttonProps }) => {
  if (disabled) {
    return (
      <div className='py-10'>
        <LoaderCircle className='size-10 animate-spin text-yellow-500 sm:size-12' />
      </div>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='flex justify-center items-center gap-2 px-4 py-3 max-h-12 mt-6 bg-transparent text-grey-100 rounded-xl hover:brightness-110 border border-grey-300'
      {...buttonProps}
    >
      <Text as='span' styleVariant='body-large' fontWeight='bold' className='max-md:text-base'>
        Show more
      </Text>
      <ChevronDownIcon className='w-4 h-4 md:w-6 md:h-6' />
    </button>
  )
}
