import { auctionHouseKeys, AUCTION_HOUSE_QUERY_KEYS } from '@/api/auctionHouse/auctionHouseKeys'
import { useToaster } from '@/providers/ToastProvider'
import { CollectionStats } from '@/models/auctionHouse/collectionStats'
import { useQuery } from 'react-query'
import { isNil } from 'lodash'
import http from '@/api/http'

const { AUCTION_HOUSE, GET, COLLECTION_STATS } = AUCTION_HOUSE_QUERY_KEYS

const fetchCollectionStats = async (comicIssueId: string | number): Promise<CollectionStats> => {
  const response = await http.get<CollectionStats>(`${AUCTION_HOUSE}/${GET}/${COLLECTION_STATS}/${comicIssueId}`)
  return response.data
}

export const useFetchCollectionStats = (comicIssueId: string | number) => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchCollectionStats(comicIssueId),
    queryKey: auctionHouseKeys.getCollectionStats(comicIssueId),
    staleTime: 1000 * 60 * 5, // stale for 5 minutes
    enabled: !isNil(comicIssueId),
    onError: toaster.onQueryError,
  })
}
