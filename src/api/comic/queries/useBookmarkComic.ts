import { COMIC_QUERY_KEYS, comicKeys } from '@/api/comic/comicKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'
import { useFetchMe } from '@/api/user/queries/useFetchMe'

const { COMIC, BOOKMARK } = COMIC_QUERY_KEYS

const bookmarkComic = async (slug: string): Promise<void> => {
  const response = await http.patch<void>(`${COMIC}/${BOOKMARK}/${slug}`)
  return response.data
}

export const useBookmarkComic = (slug: string) => {
  const toaster = useToaster()
  const { data: me } = useFetchMe()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => bookmarkComic(slug),
    onSuccess: () => {
      queryClient.invalidateQueries(comicKeys.get(slug))
      queryClient.invalidateQueries(comicKeys.getByOwner(me?.id || 0))
    },
    onError: toaster.onQueryError,
  })
}
