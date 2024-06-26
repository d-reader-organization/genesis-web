import { COMIC_ISSUE_QUERY_KEYS, comicIssueKeys } from '@/api/comicIssue/comicIssueKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { COMIC_ISSUE, READ } = COMIC_ISSUE_QUERY_KEYS

const readComicIssue = async (id: string | number): Promise<void> => {
	const response = await http.patch<void>(`${COMIC_ISSUE}/${READ}/${id}`)
	return response.data
}

export const useReadComicIssue = (id: string | number) => {
	const toaster = useToaster()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => readComicIssue(id),
		onSuccess: () => {
			queryClient.invalidateQueries(comicIssueKeys.get(id))
		},
		onError: toaster.onQueryError,
	})
}
