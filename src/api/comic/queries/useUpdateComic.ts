import { COMIC_QUERY_KEYS } from '@/api/comic/comicKeys'
import { useToaster } from '@/providers/ToastProvider'
import { BasicComic, UpdateComicData } from '@/models/comic'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { COMIC, UPDATE } = COMIC_QUERY_KEYS

const updateComic = async (slug: string, request: UpdateComicData): Promise<BasicComic> => {
  const response = await http.patch<BasicComic>(`${COMIC}/${UPDATE}/${slug}`, request)
  return response.data
}

export const useUpdateComic = (slug: string) => {
  const toaster = useToaster()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: UpdateComicData) => updateComic(slug, request),
    onSuccess: () => {
      toaster.add('Comic updated!', 'success')
      queryClient.invalidateQueries([COMIC_QUERY_KEYS.COMIC, COMIC_QUERY_KEYS.GET_RAW])
    },
    onError: toaster.onQueryError,
  })
}
