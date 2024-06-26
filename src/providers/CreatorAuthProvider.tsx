'use client'

import React, { useMemo, createContext, useContext, useState, useCallback, useEffect } from 'react'
import { Authorization, CreatorPayload, JwtPayload, emptyCreatorPayload } from '@/models/auth'
import { refreshCreatorToken } from '@/api/auth/queries/useRefreshCreatorToken'
import http, { addAuthHeaders, removeAuthHeaders } from '@/api/http'
import {
	defaultAuthorization,
	lsGetUser,
	lsGetActiveUserId,
	lsRemoveUserAuth,
	lsSetUser,
	lsGetActiveUser,
	lsRemoveActiveUser,
} from '@/utils/localStorage'
import { parseJwtPayload } from '@/utils/objects'
import { isNil } from 'lodash'
import axios from 'axios'
import { signOut } from 'next-auth/react'

interface CreatorAuthContextState {
	isAuthenticated: boolean
	isAuthenticating: boolean
	addAuthorization: (auth: Authorization) => JwtPayload<CreatorPayload>
	removeAuthorization: (refreshToken: string) => void
	logout: VoidFunction
}

const initialContextValue: CreatorAuthContextState = {
	isAuthenticated: false,
	isAuthenticating: true,
	addAuthorization: () => emptyCreatorPayload,
	removeAuthorization: () => {},
	logout: () => {},
}

export const CreatorAuthContext = createContext<CreatorAuthContextState>(initialContextValue)

interface Props {
	children: React.ReactNode
}

export const CreatorAuthProvider: React.FC<Props> = ({ children }) => {
	const [authorization, setAuthorization] = useState(defaultAuthorization)
	const [isAuthenticating, setIsAuthenticating] = useState(initialContextValue.isAuthenticating)

	const isAuthenticated = useMemo(
		() => !!authorization.accessToken && !!authorization.refreshToken,
		[authorization.accessToken, authorization.refreshToken]
	)

	const addAuthorization = useCallback((auth: Authorization): JwtPayload<CreatorPayload> => {
		addAuthHeaders(auth.accessToken)
		setAuthorization(auth)

		const payload = parseJwtPayload<CreatorPayload>(auth.accessToken)
		lsSetUser(payload.email, auth)
		return payload
	}, [])

	const removeAuthorization = useCallback((refreshToken: string) => {
		removeAuthHeaders()
		setAuthorization(defaultAuthorization)

		const payload = parseJwtPayload<CreatorPayload>(refreshToken)
		lsRemoveUserAuth(payload.email)
	}, [])

	const refreshAuthorization = useCallback(
		async (refreshToken: string) => {
			try {
				const accessToken = await refreshCreatorToken(refreshToken)
				addAuthorization({ accessToken, refreshToken })
				return accessToken
			} catch {
				removeAuthorization(refreshToken)
			}
		},
		[addAuthorization, removeAuthorization]
	)

	const logout = useCallback(async () => {
		removeAuthorization(authorization.refreshToken)
		lsRemoveActiveUser()
		signOut()
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
				const accessPayload = parseJwtPayload<CreatorPayload>(accessToken)
				const isAccessTokenValid = accessPayload.exp * 1000 > Date.now()

				if (isAccessTokenValid) {
					setAuthorization({ accessToken, refreshToken })
					addAuthHeaders(accessToken)
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

	// I hate this code below from the bottom of my soul
	// I'm insecure about it's functionality so take it with a grain of salt
	useEffect(() => {
		const httpInterceptor = http.interceptors.response.use(
			(response) => response,
			async (error) => {
				if (axios.isAxiosError(error)) {
					const message = (error.response?.data?.message || '') as string
					const status = error.response?.status
					const refreshToken = authorization.refreshToken || lsGetActiveUser()?.refreshToken

					const originalRequest = error.config
					if (originalRequest && refreshToken) {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						if (message.includes('Authorization invalid or expired') && !originalRequest?._retry && status == 401) {
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							originalRequest._retry = true
							try {
								const accessToken = await refreshAuthorization(refreshToken)
								originalRequest.headers.Authorization = accessToken
								return http(originalRequest)
							} catch {
								// ignore and proceed with the standard flow
							}
						}
					}
				}

				if (error.response?.data) return Promise.reject(error.response.data)
				else return Promise.reject(error)
			}
		)

		return () => {
			axios.interceptors.response.eject(httpInterceptor)
		}
	}, [authorization.refreshToken, refreshAuthorization])

	const value = useMemo(
		() => ({ isAuthenticated, isAuthenticating, addAuthorization, removeAuthorization, logout }),
		[isAuthenticated, isAuthenticating, addAuthorization, removeAuthorization, logout]
	)

	return <CreatorAuthContext.Provider value={value}>{children}</CreatorAuthContext.Provider>
}

export const useCreatorAuth = () => useContext(CreatorAuthContext)
export const useCreatorAuthContext = useCreatorAuth

export default CreatorAuthProvider
