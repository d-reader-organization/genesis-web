import { COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { useToaster } from '@/providers/ToastProvider'
import { BasicComicIssue } from '@/models/comicIssue'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { COMIC_ISSUE, UPDATE, SIGNATURE } = COMIC_ISSUE_QUERY_KEYS

const updateComicIssueSignature = async (id: string | number, request: FormData): Promise<BasicComicIssue> => {
	const response = await http.patch<BasicComicIssue>(`${COMIC_ISSUE}/${UPDATE}/${id}/${SIGNATURE}`, request)
	return response.data
}

export const useUpdateComicIssueSignature = (id: string | number) => {
	const toaster = useToaster()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (updateData: FormData) => updateComicIssueSignature(id, updateData),
		onSuccess: () => {
			toaster.add('Signature updated!', 'success')
			queryClient.invalidateQueries([COMIC_ISSUE_QUERY_KEYS.COMIC_ISSUE, COMIC_ISSUE_QUERY_KEYS.GET_RAW])
		},
		onError: toaster.onQueryError,
	})
}
