import { COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { useToaster } from '@/providers/ToastProvider'
import { BasicComicIssue, CreateComicIssueData } from '@/models/comicIssue'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { COMIC_ISSUE, CREATE } = COMIC_ISSUE_QUERY_KEYS

const createComicIssue = async (request: CreateComicIssueData): Promise<BasicComicIssue> => {
	const response = await http.post<BasicComicIssue>(`${COMIC_ISSUE}/${CREATE}`, request)
	return response.data
}

export const useCreateComicIssue = () => {
	const toaster = useToaster()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (request: CreateComicIssueData) => createComicIssue(request),
		onSuccess: () => {
			toaster.add('Comic Issue created! 🎉', 'success')
			queryClient.invalidateQueries([COMIC_ISSUE_QUERY_KEYS.COMIC_ISSUE, COMIC_ISSUE_QUERY_KEYS.GET_RAW])
		},
		onError: toaster.onQueryError,
	})
}
