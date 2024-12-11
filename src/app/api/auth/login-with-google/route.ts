import { RoutePath } from '@/enums/routePath'
import { Authorization } from '@/models/auth'
import { NextRequest, NextResponse } from 'next/server'

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
  searchParams.set('sso', 'google')
  return NextResponse.json(`${RoutePath.Register}?${searchParams.toString()}`)
}
