'use client'

import React from 'react'
import { Input } from '@/components/ui/Input'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { RoutePath } from '@/enums/routePath'
import { usePathname } from 'next/navigation'
import LoaderCircle from 'public/assets/vector-icons/loader-circle.svg'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export const DiscoverSearchBar: React.FC<Props> = ({ className }) => {
  const searchRef = React.useRef<HTMLDivElement>(null)
  const searchTerm = useDiscoverQueryStore((state) => state.comicParams.search)
  const setSearchTerm = useDiscoverQueryStore((state) => state.updateSearch)
  const isFetching = useDiscoverQueryStore((state) => state.isFetching)
  const pathname = usePathname()

  const getPlaceholder = React.useCallback(() => {
    if (pathname === RoutePath.DiscoverComics) return 'Search by comics'
    if (pathname === RoutePath.DiscoverComicIssues) return 'Search by episodes'
    if (pathname === RoutePath.DiscoverCreators) return 'Search by creators'
    return 'Search'
  }, [pathname])

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
        placeholder={getPlaceholder()}
        value={searchTerm || ''}
        className='pl-10 pr-10 w-full max-w-[100%] rounded-lg'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <LoaderCircle
        className={cn('size-[18px] animate-spin absolute top-3 right-3 text-grey-200', isFetching ? '' : 'hidden')}
      />
    </div>
  )
}
