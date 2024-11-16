import { accessTokenKey, baseApiUrl, SUCC_RESPONSE_STATUS_CODES } from '@/constants/general'
import { isEmpty, isUndefined } from 'lodash'
import { cookies } from 'next/headers'

const defaultHeaders = {
  Accept: 'application/json',
  'Access-Control-Allow-Credentials': 'true',
  'Content-Type': 'application/json',
}

type ParamsType = Record<string, unknown>

const generateQueryParams = (params: ParamsType) =>
  Object.entries(params).reduce((prev, [key, value]) => {
    // console.log(`${key}: ${value} | ${typeof value}`)
    if (isUndefined(value) || isEmpty(value)) return prev
    else return { ...prev, [key]: `${value}` }
  }, {})

/**
 * if params is an array, you should use `generateQueryParamsArray` util
 * and pass it as `params`
 *
 * example: `fetchWrapper<MyType>({ params: generateQueryParamsArray(params, myQueryParamKey) })`
 */
export async function fetchWrapper<T>({
  body,
  formData,
  headers,
  method = 'GET',
  path = '',
  params,
  revalidateCacheInSeconds,
  isTextResponse = false,
}: {
  body?: unknown
  formData?: FormData
  headers?: HeadersInit
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS'
  path?: string
  params?: ParamsType
  revalidateCacheInSeconds?: number
  isTextResponse?: boolean
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
    body: formData ?? JSON.stringify(body),
    method,
    ...(revalidateCacheInSeconds && { next: { revalidate: revalidateCacheInSeconds } }),
    headers: {
      ...(!formData && { ...defaultHeaders }), // qucik fix: file upload - server will figure out proper content type
      ...headers,
      ...(token && { authorization: token }),
    },
  }
  try {
    const response = await fetch(url, options)
    const responseStatus = response.status
    const parsed = isTextResponse ? await response.text() : await response.json().catch(() => null)

    if (!SUCC_RESPONSE_STATUS_CODES.includes(responseStatus)) {
      const error: { message: string } = parsed
      return {
        data: null,
        errorMessage: error.message,
        status: responseStatus,
      }
    }

    return {
      data: parsed,
      status: responseStatus,
    }
  } catch (error) {
    return {
      data: null,
      errorMessage: 'Something went wrong',
      status: 500,
    }
  }
}
