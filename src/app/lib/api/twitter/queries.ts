'use server'

import { TwitterIntentComicMintedParams } from '@/models/twitter/twitterIntentComicMintedParams'
import { TWITTER_QUERY_KEYS } from '@/api/twitter/twitterKeys'
import { fetchWrapper } from '../../fetchWrapper'

const { TWITTER, INTENT, COMIC_MINTED } = TWITTER_QUERY_KEYS

export const fetchTwitterIntentComicMinted = async (params: TwitterIntentComicMintedParams): Promise<string> => {
  const response = await fetchWrapper<string>({ path: `${TWITTER}/${INTENT}/${COMIC_MINTED}`, params })
  return response.data ?? ''
}
