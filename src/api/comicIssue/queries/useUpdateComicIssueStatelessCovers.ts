import { COMIC_ISSUE_QUERY_KEYS, comicIssueKeys } from '@/api/comicIssue/comicIssueKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { COMIC_ISSUE, UPDATE, STATELESS_COVERS } = COMIC_ISSUE_QUERY_KEYS

// Array of CreateStatelessCoverData
const updateComicIssueStatelessCovers = async (id: string | number, request: FormData): Promise<void> => {
  const response = await http.post<void>(`${COMIC_ISSUE}/${UPDATE}/${id}/${STATELESS_COVERS}`, request)
  return response.data
}

export const useUpdateComicIssueStatelessCovers = (id: string | number) => {
  const toaster = useToaster()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updateData: FormData) => updateComicIssueStatelessCovers(id, updateData),
    onSuccess: () => {
      toaster.add('Covers updated!', 'success')
      queryClient.invalidateQueries(comicIssueKeys.getRaw(id))
    },
    onMutate: toaster.uploadingFiles,
    onError: toaster.onQueryError,
  })
}
