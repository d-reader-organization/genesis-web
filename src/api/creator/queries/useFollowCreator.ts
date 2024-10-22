import { CREATOR_QUERY_KEYS } from '@/api/creator/creatorKeys'
import { useMutation } from '@tanstack/react-query'
import { fetchWrapper } from '@/app/lib/fetchWrapper'
import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { useRouter } from 'next/navigation'

const { CREATOR, FOLLOW } = CREATOR_QUERY_KEYS

const followCreator = async (slug: string): Promise<void> => {
  await fetchWrapper<void>({ path: `${CREATOR}/${FOLLOW}/${slug}`, method: 'PATCH', isTextResponse: true })
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
