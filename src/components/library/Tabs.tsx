import { Text } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import React from 'react'
import { SoonTag } from '../shared/Tags'
import { cn } from '@/lib/utils'
import { Comic } from '@/models/comic'
import { OwnedCard } from '../comic/cards/OwnedCard'
import { RoutePath } from '@/enums/routePath'

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

const tabs: { title: string; value: string; isComingSoon?: boolean }[] = [
  {
    title: 'Owned',
    value: 'owned',
  },
  {
    isComingSoon: true,
    title: 'Favorites',
    value: 'favorites',
  },
  {
    isComingSoon: true,
    title: 'Creators',
    value: 'creators',
  },
]

type Props = {
  comics: Comic[]
} & React.HTMLAttributes<HTMLDivElement>

export const LibraryTabs: React.FC<Props> = ({ comics }) => {
  // TODO think about better handling of this
  const sortedLetters = sortAndGetLetterOccurrences(comics)
  const sortedLettersEntries = Object.keys(sortedLetters)

  return (
    <Tabs defaultValue={tabs.at(0)?.title.toLowerCase()} className='w-full max-w-screen-xl p-4'>
      <TabsList className='w-full justify-between items-start'>
        <div className='flex gap-4 w-full max-md:justify-center'>
          {tabs.map((tab) => (
            <TabTrigger key={tab.title} title={tab.title} value={tab.value} isComingSoon={tab.isComingSoon} />
          ))}
        </div>
      </TabsList>
      <TabsContent className='mt-0 border-t border-grey-300 w-full' value='owned'>
        {sortedLettersEntries.map((letter, index) => {
          const { startAt, endAt } = getSublistBoundaries(sortedLetters, index)

          return (
            <div
              key={`${letter}-${index}`}
              className='flex justify-between gap-8 md:gap-16 py-10 border-b border-b-grey-300'
            >
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
        })}
      </TabsContent>
      <TabsContent className='mt-0 pt-4 border-t border-grey-300' value='favorites'></TabsContent>
      <TabsContent className='mt-0 pt-4 border-t border-grey-300' value='creators'></TabsContent>
    </Tabs>
  )
}

type TabTriggerProps = {
  isComingSoon?: boolean
  title: string
  value: string
}

const TabTrigger: React.FC<TabTriggerProps> = ({ isComingSoon, title, value }) => (
  <TabsTrigger
    className={cn(
      'flex-col sm:flex gap-2 w-fit text-grey-200 data-[state=active]:text-white pb-4',
      isComingSoon ? 'pointer-events-none' : ''
    )}
    value={value}
  >
    <Text as='h4' styleVariant='secondary'>
      {title}
    </Text>
    {isComingSoon ? <SoonTag /> : null}
  </TabsTrigger>
)
