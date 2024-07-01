import { getServerSession } from 'next-auth'
import { Authorization } from '@/models/auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/utils/auth'

export async function PATCH() {
  const session = await getServerSession(authOptions)
  if (!session || !session.accessToken) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    })
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/user/login-with-google`, {
    method: 'PATCH',
    headers: {
      authorization: `Google ${session.accessToken}`,
    },
  })

  const data: Authorization | boolean = await response.json()
  return NextResponse.json(data)
}
