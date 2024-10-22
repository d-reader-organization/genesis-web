import { OwnedCard } from '@/components/comic/cards/OwnedCard'
import { RoutePath } from '@/enums/routePath'
import { Comic } from '@/models/comic'
import { Text } from '@/components//ui/Text'
import React from 'react'

type Props = { comics: Comic[] }

const sortAndGetLetterOccurrences = (comics: Comic[]): Record<string, number> => {
  return comics.reduce<Record<string, number>>((prev, curr) => {
    const uppercaseChar = curr.title.at(0)?.toUpperCase() ?? ''

    return {
      ...prev,
      [uppercaseChar]: !!prev[uppercaseChar] ? prev[uppercaseChar] + 1 : 1,
    }
  }, {})
}

const getSublistBoundaries = (
  sortedLetters: Record<string, number>,
  currentIndex: number
): { startAt: number; endAt: number } => {
  let previousLettersCount = 0
  for (let i = 0; i < currentIndex; ++i) {
    previousLettersCount += sortedLetters[Object.keys(sortedLetters).at(i) ?? 0] ?? 0
  }

  return {
    startAt: previousLettersCount,
    endAt: previousLettersCount + sortedLetters[Object.keys(sortedLetters).at(currentIndex) ?? 0],
  }
}

export const OwnedComicsContent: React.FC<Props> = ({ comics }) => {
  // TODO think about better handling of this
  const sortedLetters = sortAndGetLetterOccurrences(comics)
  const sortedLettersEntries = Object.keys(sortedLetters)

  return sortedLettersEntries.map((letter, index) => {
    const { startAt, endAt } = getSublistBoundaries(sortedLetters, index)

    return (
      <div key={`${letter}-${index}`} className='flex justify-between gap-8 md:gap-16 py-10 border-b border-b-grey-300'>
        <Text className='w-fit' as='h3' styleVariant='secondary'>
          {letter}
        </Text>
        <div className='flex flex-wrap gap-6 md:gap-10 w-full'>
          {comics.slice(startAt, endAt).map((comic) => (
            <OwnedCard key={`owned_${comic.slug}`} comic={comic} href={RoutePath.ComicRead(comic.slug)} />
          ))}
        </div>
      </div>
    )
  })
}
