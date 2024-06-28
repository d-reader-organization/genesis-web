import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useCreatorAuth } from '@/providers/CreatorAuthProvider'
import { Authorization } from '@/models/auth'
import { LoginData } from '@/models/auth/login'
import { useMutation } from 'react-query'
import http from '@/api/http'

const { AUTH, CREATOR, LOGIN } = AUTH_QUERY_KEYS

const login = async (request: LoginData): Promise<Authorization> => {
  const response = await http.patch<Authorization>(`${AUTH}/${CREATOR}/${LOGIN}`, request)
  return response.data
}

export const useLoginCreator = () => {
  const { addAuthorization } = useCreatorAuth()
  const toaster = useToaster()

  return useMutation({
    mutationFn: (request: LoginData) => login(request),
    onSuccess: (data) => {
      const creator = addAuthorization(data)
      toaster.add(`Welcome back ${creator.name}! 🎉`, 'success')
    },
    onError: toaster.onQueryError,
  })
}
