import { accessTokenKey, baseApiUrl, SUCC_RESPONSE_STATUS_CODES } from '@/constants/general'
import { cookies } from 'next/headers'

const defaultHeaders = {
  Accept: 'application/json',
  'Access-Control-Allow-Credentials': 'true',
  'Content-Type': 'application/json',
}

type ParamsType = Record<string, unknown>

const generateQueryParams = (params: ParamsType) =>
  Object.entries(params).reduce((prev, [key, value]) => {
    return { ...prev, [key]: `${value}` }
  }, {})

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
  const url = new URL(`${baseApiUrl}/${path}`)
  const queryParams: Record<string, string> | null = !!params ? generateQueryParams(params) : null
  const search = !!queryParams ? new URLSearchParams(queryParams) : null
  url.search = search?.toString() ?? ''

  const options: RequestInit = {
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
