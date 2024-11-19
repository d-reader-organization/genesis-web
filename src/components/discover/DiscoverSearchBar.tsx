'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Loader2, Search, X } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useFetchComics } from '@/api/comic/queries/useFetchComics'
import { useFetchCreators } from '@/api/creator/queries/useFetchCreators'
import { useFetchComicIssues } from '@/api/comicIssue'
import { usePathname } from 'next/navigation'
import { RoutePath } from '@/enums/routePath'

type Props = React.InputHTMLAttributes<HTMLInputElement>

type SearchResultModel = {
  id: string
  image: string
  title: string
  episodeCount: number
  href: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResult, setSearchResult] = useState<SearchResultModel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showResults, setShowResults] = useState<boolean>(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const { refetch: fetchComics } = useFetchComics({ skip: 0, take: 3, titleSubstring: searchTerm.toLowerCase() }, false)
  const { refetch: fetchCreators } = useFetchCreators(
    { skip: 0, take: 3, nameSubstring: searchTerm.toLowerCase() },
    false
  )
  const { refetch: fetchComicIssues } = useFetchComicIssues({
    params: { skip: 0, take: 3, titleSubstring: searchTerm.toLowerCase() },
    enabled: false,
  })

  const searchAPI = async (): Promise<SearchResultModel[]> => {
    let searchResult: SearchResultModel[] = []
    let fetchResult

    switch (true) {
      case pathname.includes(RoutePath.DiscoverComics): {
        fetchResult = await fetchComics()
        searchResult = (fetchResult.data?.pages.at(0) ?? []).map((comic) => ({
          id: comic.slug,
          image: comic.cover,
          title: comic.title,
          episodeCount: comic.stats?.issuesCount ?? 0,
          href: RoutePath.Comic(comic.slug),
        }))
        break
      }
      case pathname.includes(RoutePath.DiscoverCreators): {
        fetchResult = await fetchCreators()
        searchResult = (fetchResult.data?.pages.at(0) ?? []).map((creator) => ({
          id: creator.slug,
          image: creator.avatar,
          title: creator.name,
          episodeCount: creator.stats?.comicIssuesCount ?? 0,
          href: RoutePath.Creator(creator.slug),
        }))
        break
      }
      case pathname.includes(RoutePath.DiscoverComicIssues): {
        fetchResult = await fetchComicIssues()
        searchResult = (fetchResult.data?.pages.at(0) ?? []).map((issue) => ({
          id: issue.slug,
          image: issue.cover,
          title: issue.title,
          episodeCount: issue.number,
          href: RoutePath.ComicIssue(issue.slug),
        }))
        break
      }
      default:
        throw new Error('Invalid pathname')
    }

    return searchResult
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const debouncedSearch = useDebouncedCallback(async (value) => {
    if (!value) {
      setSearchResult([])
      setShowResults(false)
      return
    }
    setIsLoading(true)
    const results = await searchAPI()
    setSearchResult(results)
    setShowResults(true)
    setIsLoading(false)
  }, 300)

  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm, debouncedSearch])

  const clearInput = useCallback(() => {
    setShowResults(false)
    setSearchTerm('')
  }, [])

  return (
    <div className={cn('relative z-10 w-full', className)} ref={searchRef}>
      {searchTerm ? (
        <button className='absolute top-3 left-3' onClick={clearInput}>
          <X className='size-[18px] text-white' />
        </button>
      ) : (
        <Search className='size-[18px] absolute top-3 left-3 text-grey-200' />
      )}
      <Input
        placeholder='Search'
        value={searchTerm}
        className='pl-10 pr-10 w-full max-w-[100%]'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Loader2
        className={cn('size-[18px] animate-spin absolute top-3 right-3 text-grey-200', isLoading ? '' : 'hidden')}
      />
      {showResults && (
        <div className='flex flex-col gap-6 p-4 rounded-xl bg-grey-500 absolute top-14 md:top-16 w-full'>
          {searchResult.length ? (
            <SearchResultsContainer results={searchResult} title='Results' />
          ) : (
            <span className='text-base font-medium text-center'>No results found</span>
          )}
        </div>
      )}
    </div>
  )
}

type SearchResultsContainerProps = {
  results: SearchResultModel[]
  title: string
}

const SearchResultsContainer: React.FC<SearchResultsContainerProps> = ({ results, title }) => (
  <div className='flex flex-col gap-2'>
    <span className='text-xs font-bold text-grey-200 leading-normal'>{title}</span>
    <div className='flex flex-col gap-2'>
      {results.map((result) => (
        <SearchResult key={result.id} result={result} />
      ))}
    </div>
  </div>
)

type SearchResultProps = {
  result: SearchResultModel
}

const SearchResult: React.FC<SearchResultProps> = ({ result }) => (
  <Link href={result.href} className='flex items-center justify-between hover:brightness-125'>
    <div className='flex items-center gap-2'>
      <Image
        width={24}
        height={24}
        className='object-cover rounded-lg bg-grey-700 size-6'
        src={result.image}
        alt='image'
      />
      <span className='text-sm text-white font-bold leading-[19.6px] overflow-ellipsis line-clamp-1'>
        {result.title}
      </span>
    </div>
    {/* <span className="text-grey-100 text-sm font-medium leading-[19.6px]">
      {result.episodeCount} {pluralizeString(result.episodeCount, 'EP')}
    </span> */}
  </Link>
)
