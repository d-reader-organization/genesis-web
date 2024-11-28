import { REDIRECT_TO_KEY } from '@/constants/general'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Reconstruct the URL path string with an additional redirectTo parameter */
export function withRedirect(pathname: string, redirectUrl?: string) {
  // const url = new URL(pathname)
  // url.searchParams.set(REDIRECT_TO_KEY, redirectUrl || pathname)
  // return url.toString()
  const [path, query] = pathname.split('?')
  const redirectParam = `${REDIRECT_TO_KEY}=${redirectUrl || pathname}`

  if (!query) return path + `?${redirectParam}`
  return path + `?${query}&${redirectParam}`
}
