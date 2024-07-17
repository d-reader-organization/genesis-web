import { useQuery } from 'react-query'
import { TwitterIntentComicMintedParams } from '@/models/twitter/twitterIntentComicMintedParams'
import { twitterKeys } from '@/api/twitter/twitterKeys'
import { fetchTwitterIntentComicMinted } from '@/app/lib/api/twitter/queries'

export const useFetchTwitterIntentComicMinted = (params: TwitterIntentComicMintedParams) => {
  return useQuery({
    queryFn: () => fetchTwitterIntentComicMinted(params),
    queryKey: twitterKeys.get(params),
    enabled: !!params.comicAddress,
  })
}
