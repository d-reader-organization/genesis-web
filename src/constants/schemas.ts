import { generateMinLengthErrorMessage } from '@/utils/error'
import { z } from 'zod'

const loginSchema = z.object({
  nameOrEmail: z.string(),
  password: z.string(),
})

const registerSchema = z.object({
  name: z.string().min(3, generateMinLengthErrorMessage('name', 3)),
  email: z.string().email(),
  password: z.string(),
})

const registerWithGoogleSchema = z.object({
  name: z.string().min(3, generateMinLengthErrorMessage('name', 3)),
})

const forgotPasswordSchema = z.object({
  nameOrEmail: z.string().email('Must be an email address'),
})

const resetPasswordSchema = z.object({
  newPassword: z.string(),
  verificationToken: z.string(),
})

export { loginSchema, registerSchema, registerWithGoogleSchema, forgotPasswordSchema, resetPasswordSchema }
