import { comicIssueKeys, COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { useToaster } from '@/providers/ToastProvider'
import { ComicIssue } from '@/models/comicIssue'
import { useQuery } from 'react-query'
import http from '@/api/http'

const { COMIC_ISSUE, GET_PUBLIC } = COMIC_ISSUE_QUERY_KEYS

const fetchPublicComicIssue = async (id: string | number): Promise<ComicIssue> => {
  const response = await http.get<ComicIssue>(`${COMIC_ISSUE}/${GET_PUBLIC}/${id}`)
  return response.data
}

export const useFetchPublicComicIssue = (id: string | number) => {
  const toaster = useToaster()
  return useQuery({
    queryFn: () => fetchPublicComicIssue(id),
    queryKey: comicIssueKeys.getPublic(id),
    staleTime: 1000 * 60 * 5, // stale for 5 minutes
    enabled: !!id,
    onError: toaster.onQueryError,
  })
}
