import { accessTokenKey, baseApiUrl, refreshTokenKey } from '@/constants/general'
import { cookies } from 'next/headers'

export const SUCC_RESPONSE_STATUS_CODES = [200, 201]

const defaultHeaders = {
  Accept: 'application/json',
  'Access-Control-Allow-Credentials': 'true',
  'Content-Type': 'application/json',
}

const generateQueryParams = (params: Record<string, unknown>) =>
  Object.entries(params).reduce((prev, [key, value]) => {
    const current = `${key}=${value}`
    return prev.length ? `${prev}&${current}` : current
  }, '')

export async function fetchWrapper<T>({
  body,
  headers,
  method = 'GET',
  path = '',
  params,
}: {
  body?: unknown
  headers?: HeadersInit
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS'
  path?: string
  params?: Record<string, unknown>
}): Promise<{
  data: T | null
  errorMessage?: string
  status: number
}> {
  const token = cookies().get(accessTokenKey)?.value ?? ''
  const url = `${baseApiUrl}/${path}${params ? `?${generateQueryParams(params)}` : ''}`
  const options = {
    body: JSON.stringify(body),
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
      authorization: token,
    },
  }
  try {
    const response = await fetch(url, options)
    const parsed = await response.json()

    if (!SUCC_RESPONSE_STATUS_CODES.includes(response.status)) {
      const refreshToken = cookies().get(refreshTokenKey)?.value ?? ''
      if (response.status === 401 && refreshToken) {
        // refresh token
      }

      const error: { message: string } = parsed
      return {
        data: null,
        errorMessage: error.message,
        status: response.status,
      }
    }

    return {
      data: parsed,
      status: response.status,
    }
  } catch (error) {
    return {
      data: null,
      errorMessage: 'Something went wrong',
      status: 500,
    }
  }
}
