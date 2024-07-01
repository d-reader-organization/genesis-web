import { COMIC_QUERY_KEYS } from '@/api/comic/comicKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { COMIC, DELETE } = COMIC_QUERY_KEYS

const deleteComic = async (slug: string): Promise<void> => {
  const response = await http.delete<void>(`${COMIC}/${DELETE}/${slug}`)
  return response.data
}

export const useDeleteComic = (slug: string) => {
  const toaster = useToaster()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteComic(slug),
    onSuccess: () => {
      toaster.add('Comic deleted!', 'success')
      queryClient.invalidateQueries([COMIC_QUERY_KEYS.COMIC, COMIC_QUERY_KEYS.GET_RAW])
    },
    onError: toaster.onQueryError,
  })
}
