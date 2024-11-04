import { Role } from '@/utils/enums'

export interface User {
  id: number
  name: string
  email: string
  avatar: string
  isEmailVerified: boolean
  hasBetaAccess: boolean
  referralsRemaining: number
  role: Role
}

export interface UpdateUserData extends Partial<Pick<User, 'email' | 'name'>> {
  referrer?: string
}

export type UpdateUserAvatarData = Partial<{ avatar: File }>

export type UpdateUserPassword = {
  oldPassword: string
  newPassword: string
}
