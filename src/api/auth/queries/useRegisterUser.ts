import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useUserAuth } from '@/providers/UserAuthProvider'
import { Authorization } from '@/models/auth'
import { RegisterData } from '@/models/auth/register'
import { useMutation } from 'react-query'
import http from '@/api/http'

const { AUTH, USER, REGISTER } = AUTH_QUERY_KEYS

const register = async (request: RegisterData): Promise<Authorization> => {
  const response = await http.post<Authorization>(`${AUTH}/${USER}/${REGISTER}`, request)
  return response.data
}

export const useRegisterUser = () => {
  const { addAuthorization } = useUserAuth()
  const toaster = useToaster()

  return useMutation({
    mutationFn: (request: RegisterData) => register(request),
    onSuccess: (data) => {
      const user = addAuthorization(data)
      toaster.add(`Welcome ${user.name}! 🎉`, 'success')
    },
    onError: toaster.onQueryError,
  })
}
