import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { User, UpdateUserData } from '@/models/user'
import { useMutation } from '@tanstack/react-query'
import http from '@/api/http'
import { useRouter } from 'next/navigation'

const { USER, UPDATE } = USER_QUERY_KEYS

const updateUser = async (id: string | number, request: UpdateUserData): Promise<User> => {
  const response = await http.patch<User>(`${USER}/${UPDATE}/${id}`, request)
  return response.data
}

export const useUpdateUser = (id: string | number) => {
  const { refresh } = useRouter()

  return useMutation({
    mutationFn: (updateData: UpdateUserData) => updateUser(id, updateData),
    onSuccess: () => {
      toast({
        description: 'Account updated!',
        variant: 'success',
      })
      refresh()
    },
    throwOnError: onQueryError,
  })
}
