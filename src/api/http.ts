import axios from 'axios'

export const http = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
	// withCredentials: true,
})

export const addAuthHeaders = (token: string | null): void => {
	if (!token) return
	if (token.startsWith('Bearer')) http.defaults.headers.common.Authorization = token
	else http.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const removeAuthHeaders = (): void => {
	http.defaults.headers.common.Authorization = ''
}

export default http
