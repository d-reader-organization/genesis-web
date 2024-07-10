import { Authorization } from '@/models/auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name } = await req.json()
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/user/register-with-google`, {
    method: 'POST',
    headers: {
      // authorization: `Google ${req.}`, add proper token
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  })

  const data: Authorization = await response.json()
  return NextResponse.json(data)
}
