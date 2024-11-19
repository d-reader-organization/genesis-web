'use client'

import { Button, Text } from '@/components/ui'
import { SearchInput } from './DiscoverSearchBar'
import React from 'react'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Settings2, ChevronDown } from 'lucide-react'
import { useDiscoverFilterStore } from '@/providers/DiscoverFilterStoreProvider'
import { DiscoverFilterType } from './DiscoverFilterType'

export const DiscoverFilterBar: React.FC = () => {
  const [isFilterSheetOpen, setFilterSheetOpen] = React.useState<boolean>(false)
  const clearAll = useDiscoverFilterStore((state) => state.resetToInitialState)

  return (
    <div className='flex'>
      <FilterSheet isOpen={isFilterSheetOpen} triggerOpenChange={(open: boolean) => setFilterSheetOpen(open)} />
      <div className='flex gap-4 w-[100%]'>
        <Button
          className='max-h-10 flex text-grey-100 bg-grey-500 gap-2'
          onClick={() => setFilterSheetOpen(!isFilterSheetOpen)}
        >
          <Settings2 size={19} />
          <Text as='p' styleVariant='body-normal'>
            Filter
          </Text>
        </Button>
        <Button onClick={clearAll} className='max-h-10 bg-grey-500 text-grey-100'>
          <Text as='p' styleVariant='body-normal'>
            Clear all
          </Text>
        </Button>
        <SearchInput />
        <Button
          className='max-h-10 p-4 flex justify-center items-center bg-grey-500 text-grey-100 gap-2'
          onClick={() => setFilterSheetOpen(!isFilterSheetOpen)}
        >
          <Text as='p' styleVariant='body-normal'>
            Sort by
          </Text>
          <ChevronDown size={19} />
        </Button>
      </div>
    </div>
  )
}

type FilterSheetProps = {
  isOpen: boolean
  triggerOpenChange: (open: boolean) => void
}

const FilterSheet: React.FC<FilterSheetProps> = ({ isOpen, triggerOpenChange }) => {
  const completeGenresList = useDiscoverFilterStore((state) => state.completeGenresList)
  const updateAllParamGenreSlugs = useDiscoverFilterStore((store) => store.updateAllParamGenreSlugs)
  const comicGenreSlugs = useDiscoverFilterStore((store) => store.comicParams.genreSlugs)

  return (
    <div className='max-md:hidden'>
      <Sheet open={isOpen} onOpenChange={triggerOpenChange}>
        <SheetTitle className='sr-only'>Open menu</SheetTitle>
        <SheetContent
          aria-describedby={undefined}
          side='left'
          showCloseIcon
          className='p-6 flex flex-col h-full w-full bg-grey-600 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.50)] max-w-[420px]'
          onInteractOutside={() => {
            triggerOpenChange(false)
          }}
        >
          <Text as='p' styleVariant='body-xlarge' fontWeight='bold'>
            Filter by
          </Text>
          {/* <div className='flex flex-col'>
          {genres?.map((filter: Genre) => (
            <FilterType key={filter.slug} filter={filter} />
          ))}
        </div> */}
          <div className='flex flex-col'>
            <DiscoverFilterType
              filter={completeGenresList}
              filterLabel='Genres'
              selectedTags={comicGenreSlugs}
              updateSelectedTags={updateAllParamGenreSlugs}
            />
          </div>
        </SheetContent>
      </Sheet>
      {/* page blur on sheet opening <div
        className={cn(
          'fixed inset-0 bg-transparent  backdrop-blur-[25px] z-40 transition-all duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden='true'
      /> */}
    </div>
  )
}
