import { baseApiUrl } from '@/constants/general'
import { cookies } from 'next/headers'

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

export const fetchWrapper = ({
  body,
  headers,
  method = 'GET',
  path = '',
  params,
}: {
  body?: unknown
  headers?: HeadersInit
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'OPTIONS'
  path?: string
  params?: Record<string, unknown>
}) => {
  return fetch(`${baseApiUrl}/${path}${params ? `?${generateQueryParams(params)}` : ''}`, {
    body: JSON.stringify(body),
    method,
    headers: { ...defaultHeaders, ...headers, Cookie: cookies().toString() },
  })
}
