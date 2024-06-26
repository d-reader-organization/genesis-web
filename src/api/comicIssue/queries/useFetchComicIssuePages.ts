import { comicIssueKeys, COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { useUserAuth } from '@/providers/UserAuthProvider'
import { useToaster } from '@/providers/ToastProvider'
import { ComicPage } from '@/models/comic/comicPage'
import { useQuery } from 'react-query'
import { isNil } from 'lodash'
import http from '@/api/http'

const { COMIC_ISSUE, GET, PAGES } = COMIC_ISSUE_QUERY_KEYS

const fetchComicIssuePages = async (id: string | number): Promise<ComicPage[]> => {
	const response = await http.get<ComicPage[]>(`${COMIC_ISSUE}/${GET}/${id}/${PAGES}`)
	return response.data
}

export const useFetchComicIssuePages = (id: string | number) => {
	const { isAuthenticated } = useUserAuth()
	const toaster = useToaster()

	return useQuery({
		queryFn: () => fetchComicIssuePages(id),
		queryKey: comicIssueKeys.getPages(id),
		staleTime: 1000 * 60 * 60 * 1, // stale for 1 hour
		enabled: isAuthenticated && !isNil(id),
		onError: toaster.onQueryError,
	})
}
