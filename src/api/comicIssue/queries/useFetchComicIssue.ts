import { comicIssueKeys, COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { useUserAuth } from '@/providers/UserAuthProvider'
import { useToaster } from '@/providers/ToastProvider'
import { ComicIssue } from '@/models/comicIssue'
import { useQuery } from 'react-query'
import { isNil } from 'lodash'
import http from '@/api/http'

const { COMIC_ISSUE, GET } = COMIC_ISSUE_QUERY_KEYS

const fetchComicIssue = async (id: string | number): Promise<ComicIssue> => {
  const response = await http.get<ComicIssue>(`${COMIC_ISSUE}/${GET}/${id}`)
  return response.data
}

export const useFetchComicIssue = (id: string | number) => {
  const { isAuthenticated } = useUserAuth()
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchComicIssue(id),
    queryKey: comicIssueKeys.get(id),
    staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
    enabled: isAuthenticated && !isNil(id),
    onError: toaster.onQueryError,
  })
}
