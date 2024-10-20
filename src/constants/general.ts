import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export const baseApiUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`
export const accessTokenKey = 'access_token'
export const refreshTokenKey = 'refresh_token'
export const googleAccessTokenKey = 'google_access_token'
export const SUCC_RESPONSE_STATUS_CODES = [200, 201]
export const redirectToKey = 'redirectTo'

export const jwtCookieProps: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: true,
  maxAge: 100 * 24 * 60 * 60,
}

export const passwordDescriptionText = '8 characters minimum. At least 1 lowercase, 1 uppercase and 1 number'

export const blurDataUrl =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUV9LaBAAB8gEfSTtbmAAAAABJRU5ErkJggg=='
