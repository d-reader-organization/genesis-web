'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useUserAuth } from '@/providers/UserAuthProvider'
import { RoutePath } from '@/utils/enums'

type AuthenticatedRouteHook = (redirectTo?: string) => void

export const useAuthenticatedRoute: AuthenticatedRouteHook = (redirectTo = RoutePath.Welcome) => {
  const { push } = useRouter()
  const { isAuthenticated, isAuthenticating } = useUserAuth()

  useEffect(() => {
    if (!isAuthenticated && !isAuthenticating) {
      push(redirectTo)
    }
  }, [isAuthenticated, isAuthenticating, redirectTo, push])

  return
}
