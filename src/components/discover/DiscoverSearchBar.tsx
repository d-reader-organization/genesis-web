'use client'

import React from 'react'
import { Input } from '@/components/ui/Input'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export const SearchInput: React.FC<Props> = ({ className }) => {
  const searchRef = React.useRef<HTMLDivElement>(null)
  const searchTerm = useDiscoverQueryStore((state) => state.comicParams.search)
  const setSearchTerm = useDiscoverQueryStore((state) => state.updateSearch)

  return (
    <div className={cn('relative z-10 w-full', className)} ref={searchRef}>
      {searchTerm ? (
        <button className='absolute top-3 left-3' onClick={() => setSearchTerm(undefined)}>
          <X className='size-[18px] text-white' />
        </button>
      ) : (
        <Search className='size-[18px] absolute top-3 left-3 text-grey-200' />
      )}
      <Input
        placeholder='Search'
        value={searchTerm || ''}
        className='pl-10 pr-10 w-full max-w-[100%]'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}
