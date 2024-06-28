import { JwtPayload } from '@/models/auth'

export const getKeys = Object.keys as <T extends object>(object: T) => Array<keyof T>

/**
 * Returns a JS object representation of a Javascript Web Token from its common encoded
 * string form.
 *
 * @template T the expected shape of the parsed token
 * @param {string} token a Javascript Web Token in base64 encoded, `.` separated form
 * @returns {(T | undefined)} an object-representation of the token
 * or undefined if parsing failed
 */
export function parseJwtPayload<T extends object = { [k: string]: string | number }>(token: string): JwtPayload<T> {
  try {
    const base64Payload = token.split('.')[1]
    const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = JSON.parse(
      decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )
    )

    return jsonPayload
  } catch {
    throw new Error('Invalid session token')
  }
}
