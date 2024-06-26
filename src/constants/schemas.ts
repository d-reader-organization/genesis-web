import { generateMaxLengthErrorMessage, generateMinLengthErrorMessage, yupRequiredMessage } from '@/utils/error'
import * as yup from 'yup'

export const updateUserValidationSchema = yup.object().shape({
	email: yup.string().email(),
	name: yup
		.string()
		.min(2, generateMinLengthErrorMessage('name', 2))
		.max(20, generateMaxLengthErrorMessage('name', 20)),
})

export const updateUserPasswordValidationSchema = yup.object().shape({
	oldPassword: yup.string().required(yupRequiredMessage('Old password')),
	newPassword: yup.string().required(yupRequiredMessage('New password')),
})

export const loginValidationSchema = yup.object().shape({
	nameOrEmail: yup.string().required(yupRequiredMessage('Email')),
	password: yup.string().required(yupRequiredMessage('Password')),
})

export const resetPasswordValidationSchema = yup.object().shape({
	verificationToken: yup.string().required(yupRequiredMessage('Verification token')),
	newPassword: yup.string().required(yupRequiredMessage('New password')),
})

export const registerValidationSchema = yup.object().shape({
	name: yup
		.string()
		.required(yupRequiredMessage('Name'))
		.min(3, generateMinLengthErrorMessage('name', 3))
		.max(20, generateMaxLengthErrorMessage('name', 20)),
	email: yup.string().email().required(yupRequiredMessage('Email')),
	password: yup.string().required(yupRequiredMessage('Password')),
})
export const googleRegisterValidationSchema = yup.object().shape({
	name: yup
		.string()
		.required(yupRequiredMessage('Name'))
		.min(3, generateMinLengthErrorMessage('name', 3))
		.max(20, generateMaxLengthErrorMessage('name', 20)),
	email: yup.string().email().optional().default(''),
	password: yup.string().optional().default(''),
})

export const updateUserAvatarValidationSchema = yup.object().shape({
	avatar: yup.mixed(),
})
