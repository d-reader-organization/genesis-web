import { COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { useToaster } from '@/providers/ToastProvider'
import { BasicComicIssue, UpdateComicIssueData } from '@/models/comicIssue'
import { useMutation } from 'react-query'
import http from '@/api/http'

const { COMIC_ISSUE, UPDATE } = COMIC_ISSUE_QUERY_KEYS

const updateComicIssue = async (id: string | number, request: UpdateComicIssueData): Promise<BasicComicIssue> => {
  const response = await http.patch<BasicComicIssue>(`${COMIC_ISSUE}/${UPDATE}/${id}`, request)
  return response.data
}

export const useUpdateComicIssue = (id: string | number) => {
  const toaster = useToaster()

  return useMutation({
    mutationFn: (request: UpdateComicIssueData) => updateComicIssue(id, request),
    onSuccess: () => {
      toaster.add('Comic Issue updated!', 'success')
    },
    onError: toaster.onQueryError,
  })
}
