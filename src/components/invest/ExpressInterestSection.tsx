'use client'

import { useState } from 'react'
import { Button } from '../ui'

interface Option {
  label: string
  value: number
}

const EXPRESS_INTEREST_OPTIONS: Option[] = [
  { label: '$20', value: 20 },
  { label: '$100', value: 100 },
  { label: '$500', value: 500 },
  { label: '$1,000', value: 1000 },
  { label: '$2,500', value: 2500 },
]

export const ExpressInterestSection: React.FC = () => {
  const [selectedOption, setOption] = useState<Option | undefined>()
  // "other" option should open a text input
  // we need to pull in the data from the project

  const onSubmit = () => {
    // send API request with the selected amount
    // throw confetti after submitting
    // redirectTo after a couple of seconds
    return
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {EXPRESS_INTEREST_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant='outline'
            className={`h-12 text-xl border-yellow-500 hover:bg-yellow-500 hover:text-black ${selectedOption?.label == option.label ? 'bg-yellow-500 text-black ' : ''}`}
            onClick={() => setOption(option)}
          >
            {option.label}
          </Button>
        ))}
        <Button variant='outline' className='h-12 text-xl border-yellow-500 hover:bg-yellow-500 hover:text-black'>
          Other
        </Button>
      </div>

      <Button className='w-full h-12 bg-yellow-500 text-black' onClick={onSubmit}>
        Submit
      </Button>
    </div>
  )
}
