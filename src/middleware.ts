import { NextRequest, NextResponse } from 'next/server'
import { isAuthorized } from './data/auth'
import { RoutePath } from './enums/routePath'

const allowedOrigins = ['https://dial.to']

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function middleware(request: NextRequest) {
  const requestUrlPath = request.nextUrl.pathname

  if (authRoutesRegex.test(requestUrlPath)) {
    if (!isAuthorized()) {
      return NextResponse.redirect(new URL(RoutePath.Login, request.url))
    }
  }

  if (requestUrlPath.includes(RoutePath.Login)) {
    if (isAuthorized()) {
      const redirectTo = request.nextUrl.searchParams.get('redirectTo')
      return NextResponse.redirect(new URL(redirectTo ?? RoutePath.Home, request.url))
    }
  }

  // Check the origin from the request
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // Handle preflighted requests
  const isPreflight = request.method === 'OPTIONS'

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  // Handle simple requests
  const response = NextResponse.next()

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: ['/:path*', '/api/:path*'],
}

const authRoutesRegex = /^\/(comic|comic-issue|discover|profile)(\/.*)?$/
