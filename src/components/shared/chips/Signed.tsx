import SignedIcon from 'public/assets/vector-icons/signed-icon.svg'
import React from 'react'

export const SignedChip: React.FC = () => (
  <div className='rounded-lg flex justify-center items-center size-7 bg-purple-100 border-2 border-grey-600'>
    <SignedIcon className='text-black' />
  </div>
)
