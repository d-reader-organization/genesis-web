import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { useMutation } from '@tanstack/react-query'
import http from '@/api/http'
import { useRouter } from 'next/navigation'

const { USER, RECOVER } = USER_QUERY_KEYS

const recoverUser = async (slug: string): Promise<void> => {
  const response = await http.patch<void>(`${USER}/${RECOVER}/${slug}`)
  return response.data
}

export const useRecoverUser = (slug: string) => {
  const { refresh } = useRouter()

  return useMutation({
    mutationFn: () => recoverUser(slug),
    onSuccess: () => {
      toast({ description: 'Account recovered!', variant: 'success' })
      refresh()
    },
    throwOnError: onQueryError,
  })
}
