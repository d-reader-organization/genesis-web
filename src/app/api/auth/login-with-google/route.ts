import { RoutePath } from '@/enums/routePath'
import { Authorization } from '@/models/auth'
import { NextRequest, NextResponse } from 'next/server'

const appendSsoQueryIfNeeded = (query: string) => (query.includes('sso=google') ? query : `${query}&sso=google`)

export async function PATCH(request: NextRequest) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/user/login-with-google`, {
    method: 'PATCH',
    headers: {
      authorization: request.headers.get('authorization') ?? '',
    },
  })

  const data: Authorization | boolean = await response.json()
  const isNewUser = typeof data === 'boolean'

  if (!isNewUser) {
    return NextResponse.json(data)
  }

  const searchParams = request.nextUrl.searchParams
  const queryParams = searchParams.size ? decodeURIComponent(searchParams.toString()) : ''
  return NextResponse.json(`${RoutePath.Register}?${appendSsoQueryIfNeeded(queryParams)}`)
}
