import { COMIC_QUERY_KEYS } from '@/api/comic/comicKeys'
import { useToaster } from '@/providers/ToastProvider'
import { BasicComic } from '@/models/comic'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { COMIC, UPDATE, BANNER } = COMIC_QUERY_KEYS

const updateComicBanner = async (slug: string, request: FormData): Promise<BasicComic> => {
  const response = await http.patch<BasicComic>(`${COMIC}/${UPDATE}/${slug}/${BANNER}`, request)
  return response.data
}

export const useUpdateComicBanner = (slug: string) => {
  const toaster = useToaster()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updateData: FormData) => updateComicBanner(slug, updateData),
    onSuccess: () => {
      toaster.add('Banner updated!', 'success')
      queryClient.invalidateQueries([COMIC_QUERY_KEYS.COMIC, COMIC_QUERY_KEYS.GET_RAW])
    },
    onMutate: toaster.uploadingFiles,
    onError: toaster.onQueryError,
  })
}
