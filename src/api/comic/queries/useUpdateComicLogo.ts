import { COMIC_QUERY_KEYS } from '@/api/comic/comicKeys'
import { useToaster } from '@/providers/ToastProvider'
import { BasicComic } from '@/models/comic'
import { useMutation, useQueryClient } from 'react-query'
import http from '@/api/http'

const { COMIC, UPDATE, LOGO } = COMIC_QUERY_KEYS

const updateComicLogo = async (slug: string, request: FormData): Promise<BasicComic> => {
  const response = await http.patch<BasicComic>(`${COMIC}/${UPDATE}/${slug}/${LOGO}`, request)
  return response.data
}

export const useUpdateComicLogo = (slug: string) => {
  const toaster = useToaster()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updateData: FormData) => updateComicLogo(slug, updateData),
    onSuccess: () => {
      toaster.add('Logo updated!', 'success')
      queryClient.invalidateQueries([COMIC_QUERY_KEYS.COMIC, COMIC_QUERY_KEYS.GET_RAW])
    },
    onMutate: toaster.uploadingFiles,
    onError: toaster.onQueryError,
  })
}
