import { CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { useMutation } from '@tanstack/react-query'
import http from '@/api/http'
import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { useRouter } from 'next/navigation'

const { CREATOR, FOLLOW } = CREATOR_QUERY_KEYS

const followCreator = async (slug: string): Promise<void> => {
  const response = await http.patch<void>(`${CREATOR}/${FOLLOW}/${slug}`)
  return response.data
}

export const useFollowCreator = (slug: string) => {
  const { refresh } = useRouter()

  return useMutation({
    mutationFn: () => followCreator(slug),
    onSuccess: () => {
      toast({
        description: 'Creator followed!',
        variant: 'success',
      })
      refresh()
    },
    throwOnError: onQueryError,
  })
}
