import { comicIssueKeys } from '@/api/comicIssue/comicIssueKeys'
import { useUserAuth } from '@/providers/UserAuthProvider'
import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { onQueryError } from '@/components/ui/toast/use-toast'
import { fetchComicIssuePages } from '@/app/lib/api/comicIssue/queries'

export const useFetchComicIssuePages = (id: string | number) => {
  const { isAuthenticated } = useUserAuth()

  return useQuery({
    queryFn: () => fetchComicIssuePages(id),
    queryKey: comicIssueKeys.getPages(id),
    staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
    enabled: isAuthenticated && !isNil(id),
    throwOnError: onQueryError,
  })
}
