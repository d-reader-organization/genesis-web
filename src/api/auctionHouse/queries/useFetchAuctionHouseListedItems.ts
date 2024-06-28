import { auctionHouseKeys, AUCTION_HOUSE_QUERY_KEYS } from '@/api/auctionHouse/auctionHouseKeys'
import { useToaster } from '@/providers/ToastProvider'
import { ListedItemsParams } from '@/models/auctionHouse/listedItemParams'
import { ListedAssetItem } from '@/models/auctionHouse/listedItem'
import { useQuery } from 'react-query'
import { isNil } from 'lodash'
import http from '@/api/http'

const { AUCTION_HOUSE, GET, LISTED_ITEMS } = AUCTION_HOUSE_QUERY_KEYS

const fetchAuctionHouseListedItems = async (params: ListedItemsParams): Promise<ListedAssetItem[]> => {
  const response = await http.get<ListedAssetItem[]>(`${AUCTION_HOUSE}/${GET}/${LISTED_ITEMS}`, { params })
  return response.data
}

export const useFetchAuctionHouseListedItems = (params: ListedItemsParams) => {
  const toaster = useToaster()

  return useQuery({
    queryFn: () => fetchAuctionHouseListedItems(params),
    queryKey: auctionHouseKeys.getListedItems(params),
    staleTime: 1000 * 60 * 5, // stale for 5 minutes
    enabled: !isNil(params.comicIssueId),
    onError: toaster.onQueryError,
  })
}
