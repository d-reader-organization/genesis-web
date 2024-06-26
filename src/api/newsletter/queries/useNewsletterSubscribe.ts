import { NEWSLETTER_QUERY_KEYS } from '@/api/newsletter/newsletterKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation } from 'react-query'
import http from '@/api/http'

const { NEWSLETTER, SUBSCRIBE } = NEWSLETTER_QUERY_KEYS

const newsletterSubscribe = async (email: string): Promise<void> => {
	const response = await http.post<void>(`${NEWSLETTER}/${SUBSCRIBE}/${email}`)
	return response.data
}

export const useNewsletterSubscribe = () => {
	const toaster = useToaster()

	return useMutation({
		mutationFn: (email: string) => newsletterSubscribe(email),
		onError: toaster.onQueryError,
	})
}
