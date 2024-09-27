import { PartialGenre } from '@/models/genre'
import React from 'react'
import { Text } from '@/components/ui/Text'

type Props = {
  genres: PartialGenre[]
}

export const GenresList: React.FC<Props> = ({ genres }) => (
  <div className='flex mb-4 overflow-y-auto gap-10 md:gap-4'>
    {genres.map((genre) => (
      <div className='flex items-center gap-1 md:gap-2 whitespace-nowrap' key={genre.slug}>
        <img src={genre.icon} alt='' className='size-6 rounded-[4px]' />
        <Text className='text-lg' as='p'>
          {genre.name}
        </Text>
      </div>
    ))}
  </div>
)

export const GenreTags: React.FC<Props> = ({ genres }) => (
  <div className='flex gap-2 items-center overflow-x-auto'>
    {genres.map((genre, index) => (
      <div
        className='text-base font-medium leading-[22.4px] text-grey-100 p-2 flex justify-center items-center rounded-lg bg-grey-500'
        key={`${genre.name}-${index}`}
      >
        {genre.name}
      </div>
    ))}
  </div>
)
