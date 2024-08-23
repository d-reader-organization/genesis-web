import { Button } from '@/components/ui/Button'
import React from 'react'
import { Loader } from '../Loader'

type Props = { isLoading: boolean; onClick: () => void }

export const UnwrapButton: React.FC<Props> = ({ isLoading, onClick }) => {
  return (
    <Button className='border border-green-500 bg-transparent cursor-pointer w-20 h-12' onClick={onClick}>
      {isLoading ? <Loader /> : 'Open'}
    </Button>
  )
}
