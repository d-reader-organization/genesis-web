import { accessTokenKey, baseApiUrl, SUCC_RESPONSE_STATUS_CODES } from '@/constants/general'
import { cookies } from 'next/headers'

const defaultHeaders = {
  Accept: 'application/json',
  'Access-Control-Allow-Credentials': 'true',
  'Content-Type': 'application/json',
}

type ParamsType = Record<string, unknown> | Array<Record<string, unknown>>

const generateQueryParams = (params: ParamsType) =>
  Array.isArray(params)
    ? '' // TODO HANDLE ARRAY PARAMS
    : Object.entries(params).reduce((prev, [key, value]) => {
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
  params?: ParamsType
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
