'use client'

import React, { useMemo, createContext, useContext, useState, useCallback, useEffect } from 'react'
import { Authorization, JwtPayload, UserPayload, emptyUserPayload } from '@/models/auth'
import {
  defaultAuthorization,
  lsGetUser,
  lsGetActiveUserId,
  lsRemoveUserAuth,
  lsSetUser,
  lsRemoveActiveUser,
} from '@/utils/localStorage'
import { parseJwtPayload } from '@/utils/objects'
import { isNil } from 'lodash'
import { signOut } from 'next-auth/react'
import { refreshTokenCall } from '@/app/lib/api/auth/queries'

interface UserAuthContextState {
  isAuthenticated: boolean
  isAuthenticating: boolean
  addAuthorization: (auth: Authorization) => JwtPayload<UserPayload>
  removeAuthorization: (refreshToken: string) => void
  logout: VoidFunction
}

const initialContextValue: UserAuthContextState = {
  isAuthenticated: false,
  isAuthenticating: true,
  addAuthorization: () => emptyUserPayload,
  removeAuthorization: () => {},
  logout: () => {},
}

export const UserAuthContext = createContext<UserAuthContextState>(initialContextValue)

interface Props {
  children: React.ReactNode
}

export const UserAuthProvider: React.FC<Props> = ({ children }) => {
  const [authorization, setAuthorization] = useState(defaultAuthorization)
  const [isAuthenticating, setIsAuthenticating] = useState(initialContextValue.isAuthenticating)

  const isAuthenticated = useMemo(
    () => !!authorization.accessToken && !!authorization.refreshToken,
    [authorization.accessToken, authorization.refreshToken]
  )

  const addAuthorization = useCallback((auth: Authorization): JwtPayload<UserPayload> => {
    // addAuthHeaders(auth.accessToken)
    setAuthorization(auth)

    const payload = parseJwtPayload<UserPayload>(auth.accessToken)
    lsSetUser(payload.email, auth)
    return payload
  }, [])

  const removeAuthorization = useCallback((refreshToken: string) => {
    // removeAuthHeaders()
    setAuthorization(defaultAuthorization)

    const payload = parseJwtPayload<UserPayload>(refreshToken)
    lsRemoveUserAuth(payload.email)
  }, [])

  const refreshAuthorization = useCallback(
    async (refreshToken: string) => {
      try {
        const accessToken = await refreshTokenCall(refreshToken)
        addAuthorization({ accessToken, refreshToken })
        return accessToken
      } catch {
        signOut()
        removeAuthorization(refreshToken)
      }
    },
    [addAuthorization, removeAuthorization]
  )

  const logout = useCallback(() => {
    signOut()
    removeAuthorization(authorization.refreshToken)
    lsRemoveActiveUser()
  }, [authorization.refreshToken, removeAuthorization])

  useEffect(() => {
    setIsAuthenticating(true)

    try {
      const lsUserId = lsGetActiveUserId()
      if (isNil(lsUserId)) return

      const lsUser = lsGetUser(lsUserId)
      if (isNil(lsUser)) return

      const { accessToken, refreshToken } = lsUser

      if (accessToken) {
        const accessPayload = parseJwtPayload<UserPayload>(accessToken)
        const isAccessTokenValid = accessPayload.exp * 1000 > Date.now()

        if (isAccessTokenValid) {
          setAuthorization({ accessToken, refreshToken })
          // addAuthHeaders(accessToken)
        } else {
          lsSetUser(lsUserId, { accessToken: '' })
        }
      }

      if (refreshToken) {
        const refreshPayload = parseJwtPayload(refreshToken)
        const isRefreshTokenValid = refreshPayload.exp * 1000 > Date.now()

        if (isRefreshTokenValid) {
          refreshAuthorization(refreshToken)
        } else {
          removeAuthorization(refreshToken)
        }
      }
    } finally {
      setIsAuthenticating(false)
    }
  }, [refreshAuthorization, removeAuthorization])

  const value = useMemo(
    () => ({ isAuthenticated, isAuthenticating, addAuthorization, removeAuthorization, logout }),
    [isAuthenticated, isAuthenticating, addAuthorization, removeAuthorization, logout]
  )

  return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>
}

export const useUserAuth = () => useContext(UserAuthContext)
export const useUserAuthContext = useUserAuth

export default UserAuthProvider
