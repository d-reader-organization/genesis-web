import { useLoginGoogleUser } from '@/api/auth'
import { RoutePath } from '@/enums/routePath'
import { useUserAuth } from '@/providers/UserAuthProvider'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const appendSsoQueryIfNeeded = (query: string) => (query.includes('sso=google') ? query : `${query}&sso=google`)

export const useGoogleSessionCheck = () => {
  const { push } = useRouter()
  const { data: session } = useSession()
  const { mutateAsync: loginWithGoogle } = useLoginGoogleUser()
  const { isAuthenticated } = useUserAuth()
  const searchParams = useSearchParams()
  const queryParams = searchParams.size ? decodeURIComponent(searchParams.toString()) : ''
  const redirectTo = searchParams.get('redirectTo') ?? `${RoutePath.Home}?${queryParams}`

  useEffect(() => {
    if (session?.accessToken && !isAuthenticated) {
      loginWithGoogle().then((value) => {
        const shouldRegister = typeof value === 'boolean'
        push(shouldRegister ? `${RoutePath.Register}?${appendSsoQueryIfNeeded(queryParams)}` : redirectTo)
      })
    }
  }, [session?.accessToken, push, isAuthenticated])
}
