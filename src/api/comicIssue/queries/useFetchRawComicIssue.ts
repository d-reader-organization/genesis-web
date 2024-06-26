import { comicIssueKeys, COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { useCreatorAuth } from '@/providers/CreatorAuthProvider'
import { useToaster } from '@/providers/ToastProvider'
import { RawComicIssue } from '@/models/comicIssue/rawComicIssue'
import { useQuery } from 'react-query'
import { isNil } from 'lodash'
import http from '@/api/http'

const { COMIC_ISSUE, GET_RAW } = COMIC_ISSUE_QUERY_KEYS

const fetchRawComicIssue = async (id: string | number): Promise<RawComicIssue> => {
	const response = await http.get<RawComicIssue>(`${COMIC_ISSUE}/${GET_RAW}/${id}`)
	return response.data
}

export const useFetchRawComicIssue = (id: string | number) => {
	const { isAuthenticated } = useCreatorAuth()
	const toaster = useToaster()

	return useQuery({
		queryFn: () => fetchRawComicIssue(id),
		queryKey: comicIssueKeys.getRaw(id),
		staleTime: 1000 * 60 * 30, // stale for 30 minutes
		enabled: isAuthenticated && !isNil(id),
		onError: toaster.onQueryError,
	})
}
