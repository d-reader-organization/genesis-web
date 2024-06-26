import { NEWSLETTER_QUERY_KEYS } from '@/api/newsletter/newsletterKeys'
import { useToaster } from '@/providers/ToastProvider'
import { useMutation } from 'react-query'
import http from '@/api/http'

const { NEWSLETTER, UNSUBSCRIBE } = NEWSLETTER_QUERY_KEYS

const newsletterUnsubscribe = async (verificationToken: string): Promise<void> => {
	const response = await http.delete<void>(`${NEWSLETTER}/${UNSUBSCRIBE}/${verificationToken}`)
	return response.data
}

export const useNewsletterUnsubscribe = () => {
	const toaster = useToaster()

	return useMutation({
		mutationFn: (verificationToken: string) => newsletterUnsubscribe(verificationToken),
		onError: toaster.onQueryError,
	})
}
