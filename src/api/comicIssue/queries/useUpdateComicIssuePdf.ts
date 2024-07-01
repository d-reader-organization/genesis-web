import { COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { useToaster } from '@/providers/ToastProvider'
import { BasicComicIssue } from '@/models/comicIssue'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { COMIC_ISSUE, UPDATE, PDF } = COMIC_ISSUE_QUERY_KEYS

const updateComicIssuePdf = async (id: string | number, request: FormData): Promise<BasicComicIssue> => {
  const response = await http.patch<BasicComicIssue>(`${COMIC_ISSUE}/${UPDATE}/${id}/${PDF}`, request)
  return response.data
}

export const useUpdateComicIssuePdf = (id: string | number) => {
  const toaster = useToaster()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updateData: FormData) => updateComicIssuePdf(id, updateData),
    onSuccess: () => {
      toaster.add('PDF updated!', 'success')
      queryClient.invalidateQueries([COMIC_ISSUE_QUERY_KEYS.COMIC_ISSUE, COMIC_ISSUE_QUERY_KEYS.GET_RAW])
    },
    onMutate: toaster.uploadingFiles,
    onError: toaster.onQueryError,
  })
}
