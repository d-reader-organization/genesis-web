'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useCreatorAuth } from '@/providers/CreatorAuthProvider'
import { RoutePath } from '@/enums/routePath'

type AuthenticatedRouteHook = (redirectTo?: string) => void

export const useAuthenticatedRoute: AuthenticatedRouteHook = (redirectTo = RoutePath.Home) => {
	const { push } = useRouter()
	const { isAuthenticated, isAuthenticating } = useCreatorAuth()

	useEffect(() => {
		if (!isAuthenticated && !isAuthenticating) {
			push(redirectTo)
		}
	}, [isAuthenticated, isAuthenticating, redirectTo, push])

	return
}

export default useAuthenticatedRoute
