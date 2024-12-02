'use client'

import { cn } from '@/lib/utils'
import { Text } from '../ui'
import { Loader2 } from 'lucide-react'
import ChevronDownIcon from 'public/assets/vector-icons/chevron-down.svg'

interface ShowMoreButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void
  disabled: boolean
}

export const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({ onClick, disabled, ...buttonProps }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center max-w-40 px-4 py-3 max-h-12 mt-6 bg-transparent text-grey-100 rounded-xl hover:brightness-110 disabled:opacity-50',
        disabled ? 'border-none' : 'border border-grey-300'
      )}
      {...buttonProps}
    >
      {disabled ? (
        <Loader2 className='size-12 animate-spin text-yellow-500' />
      ) : (
        <div className='flex justify-center items-center gap-2 text-grey-100'>
          <Text as='p' styleVariant='body-large' fontWeight='bold' className='flex justify-center items-center gap-1'>
            Show more
          </Text>
          <ChevronDownIcon className='w-5 h-5' />
        </div>
      )}
    </button>
  )
}