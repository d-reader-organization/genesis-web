import { isNil } from 'lodash'
import { Authorization } from '@/models/auth'

// refactor to a hook: https://usehooks-ts.com/react-hook/use-local-storage
// use SWR instead of local storage so we can fetch these objects server side

export const defaultAuthorization: Authorization = Object.freeze({
  accessToken: '',
  refreshToken: '',
})

/**
 * This can be expanded to support additional user configuration.
 * Such as dark/light mode, disable push notifications, disable sounds etc.
 */
type LocalStorageUser = Authorization

const defaultUser: LocalStorageUser = defaultAuthorization

const createNewUser = (): LocalStorageUser => Object.assign(defaultUser)

export const lsGetUser = (id: string | number): LocalStorageUser | undefined => {
  const lsUser = localStorage.getItem(`${id}`)
  if (lsUser) return JSON.parse(lsUser)
  else return undefined
}

export const lsRemoveUser = (id: string | number) => {
  localStorage.removeItem(`${id}`)
}

export const lsSetUser = (id: string | number, updatedValues: Partial<LocalStorageUser>) => {
  const user = lsGetUser(id) || createNewUser()
  const newUser = { ...user, ...updatedValues }
  localStorage.setItem(`${id}`, JSON.stringify(newUser))
  localStorage.setItem('active-user', `${id}`)
  return newUser
}

export const lsGetActiveUserId = () => {
  return localStorage.getItem('active-user')
}

export const lsGetActiveUser = () => {
  const lsUserId = lsGetActiveUserId()
  if (!isNil(lsUserId)) return lsGetUser(lsUserId)
}

export const lsRemoveActiveUser = () => {
  localStorage.removeItem('active-user')
}

export const lsRemoveUserAuth = (id: string | number) => {
  lsSetUser(id, Object.assign(defaultAuthorization))
}
