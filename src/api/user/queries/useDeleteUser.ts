import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { useMutation } from '@tanstack/react-query'
import http from '@/api/http'
import { useRouter } from 'next/navigation'

const { USER, DELETE } = USER_QUERY_KEYS

const deleteUser = async (slug: string): Promise<void> => {
  const response = await http.patch<void>(`${USER}/${DELETE}/${slug}`)
  return response.data
}

export const useDeleteUser = (slug: string) => {
  const { refresh } = useRouter()

  return useMutation({
    mutationFn: () => deleteUser(slug),
    onSuccess: () => {
      toast({
        description: 'Account deleted!',
        variant: 'success',
      })
      refresh()
    },
    throwOnError: onQueryError,
  })
}
