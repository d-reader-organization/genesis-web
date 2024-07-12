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
