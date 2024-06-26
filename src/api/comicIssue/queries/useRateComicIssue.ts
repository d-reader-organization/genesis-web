import { COMIC_ISSUE_QUERY_KEYS, comicIssueKeys } from '@/api/comicIssue/comicIssueKeys'
import { useToaster } from '@/providers/ToastProvider'
import { RateComicIssue } from '@/models/comicIssue/rateComicIssue'
import { useMutation, useQueryClient } from 'react-query'
import { useFetchMe } from '@/api/user/queries/useFetchMe'
import http from '@/api/http'

const { COMIC_ISSUE, RATE } = COMIC_ISSUE_QUERY_KEYS

const rateComicIssue = async (id: string | number, request: RateComicIssue): Promise<void> => {
	const response = await http.patch<void>(`${COMIC_ISSUE}/${RATE}/${id}`, request)
	return response.data
}

export const useRateComicIssue = (id: string | number) => {
	const toaster = useToaster()
	const { data: me } = useFetchMe()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (request: RateComicIssue) => rateComicIssue(id, request),
		onSuccess: () => {
			toaster.add('Comic issue rated!', 'success')
			queryClient.invalidateQueries(comicIssueKeys.get(id))
			queryClient.invalidateQueries(comicIssueKeys.getByOwner(me?.id || 0))
		},
		onError: toaster.onQueryError,
	})
}
