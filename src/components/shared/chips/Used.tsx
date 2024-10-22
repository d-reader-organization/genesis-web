import UsedIcon from 'public/assets/vector-icons/used-icon.svg'
import React from 'react'

export const UsedChip: React.FC = () => (
  <div className='rounded-lg flex justify-center items-center size-7 bg-blue-100 border-2 border-grey-600'>
    <UsedIcon className='text-black' />
  </div>
)
