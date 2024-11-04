import { PartialGenre } from '@/models/genre'
import React from 'react'
import { Text } from '@/components/ui/Text'
import { cn } from '@/lib/utils'

type Props = {
  genres: PartialGenre[]
} & React.HTMLAttributes<HTMLDivElement>

export const GenresList: React.FC<Props> = ({ genres }) => (
  <div className='flex mb-4 overflow-y-auto gap-10 md:gap-4'>
    {genres.map((genre) => (
      <div className='flex items-center gap-1 md:gap-2 whitespace-nowrap' key={genre.slug}>
        <img src={genre.icon} alt='' className='size-6 rounded-[4px]' />
        <Text styleVariant='body-large' as='p'>
          {genre.name}
        </Text>
      </div>
    ))}
  </div>
)

export const GenreTags: React.FC<Props> = ({ className, genres }) => (
  <div className='flex gap-2 items-center overflow-x-auto'>
    {genres.map((genre, index) => (
      <div
        className={cn('p-2 flex justify-center items-center rounded-lg bg-grey-500', className)}
        key={`${genre.name}-${index}`}
      >
        <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100 min-w-10'>
          {genre.name}
        </Text>
      </div>
    ))}
  </div>
)
