// import { useMemo } from 'react'
// import { useInfiniteQuery } from '@tanstack/react-query'
// import { onQueryError } from '@/components/ui/toast/use-toast'
// import { GenreParams } from '@/models/genre-new/genreParams'
// import { genreKeys } from '@/api/genre/genreKeys'
// import { fetchGenres } from '@/app/lib/api/genre/queries'

// type Input = {
//   enabled?: boolean
//   params: GenreParams
// }

// export const useFetchGenres = ({ enabled = true, params }: Input) => {
//   const infiniteQuery = useInfiniteQuery({
//     initialPageParam: 0,
//     queryKey: genreKeys.get(params),
//     queryFn: ({ pageParam = 0 }) => fetchGenres({ ...params, skip: pageParam * params.take }),
//     getNextPageParam: (lastPage, allPages) => {
//       if (lastPage.length >= params.take) return allPages.length
//     },
//     staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
//     enabled: enabled && !!params.take,
//     throwOnError: onQueryError,
//   })

//   const { data } = infiniteQuery
//   const flatData = useMemo(() => {
//     if (!data) return []
//     return data.pages.flatMap((page) => page)
//   }, [data])

//   return { ...infiniteQuery, flatData }
// }
