import { USER_QUERY_KEYS } from '@/api/user/userKeys'
import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { useMutation } from '@tanstack/react-query'
import { User } from '@/models/user'
import http from '@/api/http'

const { USER, VERIFY_EMAIL } = USER_QUERY_KEYS

const verifyUserEmail = async (verificationToken: string): Promise<User> => {
  const response = await http.patch<User>(`${USER}/${VERIFY_EMAIL}/${verificationToken}`)
  return response.data
}

export const useVerifyUserEmail = () => {
  return useMutation({
    mutationFn: (verificationToken: string) => verifyUserEmail(verificationToken),
    onSuccess: () => {
      toast({
        description: 'Email address verified!',
        variant: 'success',
      })
    },
    throwOnError: onQueryError,
  })
}
