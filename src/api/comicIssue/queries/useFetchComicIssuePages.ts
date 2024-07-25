import { comicIssueKeys, COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { useUserAuth } from '@/providers/UserAuthProvider'
import { ComicPage } from '@/models/comic/comicPage'
import { useQuery } from '@tanstack/react-query'
import { isNil } from 'lodash'
import { fetchWrapper } from '@/app/lib/fetchWrapper'
import { onQueryError } from '@/components/ui/toast/use-toast'

const { COMIC_ISSUE, GET, PAGES } = COMIC_ISSUE_QUERY_KEYS

const fetchComicIssuePages = async (id: string | number): Promise<ComicPage[]> => {
  const response = await fetchWrapper<ComicPage[]>({ path: `${COMIC_ISSUE}/${GET}/${id}/${PAGES}` })
  return response.data ?? []
}

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
