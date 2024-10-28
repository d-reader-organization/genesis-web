import { comicIssueKeys } from '@/api/comicIssue/comicIssueKeys'
import { fetchComicIssue } from '@/app/lib/api/comicIssue/queries'
import { onQueryError } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'

export const useFetchComicIssue = (id: string | number) => {
  return useQuery({
    queryFn: () => fetchComicIssue(id),
    queryKey: comicIssueKeys.get(id),
    staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
    enabled: !isNil(id),
    throwOnError: onQueryError,
  })
}
