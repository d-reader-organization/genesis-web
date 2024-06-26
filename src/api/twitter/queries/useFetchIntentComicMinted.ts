import { useQuery } from 'react-query'
import http from '@/api/http'
import { TwitterIntentComicMintedParams } from '@/models/twitter/twitterIntentComicMintedParams'
import { TWITTER_QUERY_KEYS, twitterKeys } from '@/api/twitter/twitterKeys'

const { TWITTER, INTENT, COMIC_MINTED } = TWITTER_QUERY_KEYS

const fetchTwitterIntentComicMinted = async (params: TwitterIntentComicMintedParams): Promise<string> => {
	const response = await http.get<string>(`${TWITTER}/${INTENT}/${COMIC_MINTED}`, { params })
	return response.data
}

export const useFetchTwitterIntentComicMinted = (params: TwitterIntentComicMintedParams) => {
	return useQuery({
		queryFn: () => fetchTwitterIntentComicMinted(params),
		queryKey: twitterKeys.get(params),
		enabled: !!params.comicAddress,
	})
}
