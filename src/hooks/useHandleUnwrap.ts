'use client'

import React from 'react'
import { useFetchUseComicIssueAssetTransaction } from '@/api/transaction/queries/useFetchUseComicIssueAssetTransaction'
import { Asset } from '@/models/asset'
import { useRouter } from 'next/navigation'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { sleep } from '@/utils/helpers'
import { confirmingTransaction, toast } from '@/components/ui/toast/use-toast'
import { RoutePath } from '@/enums/routePath'

type ReturnType = {
  handleUnwrap: () => Promise<void>
  isUnwrapLoading: boolean
}

export const useHandleUnwrap = ({
  asset,
  comicIssueId,
  onSuccess,
}: {
  asset: Asset
  comicIssueId: string | number
  onSuccess: () => void
}): ReturnType => {
  const [isLoading, setIsLoading] = React.useState(false)

  const { push, refresh } = useRouter()
  const { signTransaction } = useWallet()
  const { connection } = useConnection()

  const { refetch: fetchUseComicIssueAssetTransaction } = useFetchUseComicIssueAssetTransaction(
    {
      ownerAddress: asset.ownerAddress,
      assetAddress: asset.address,
    },
    false
  )

  // TODO test this
  const handleUnwrap = async () => {
    try {
      setIsLoading(true)
      const { data: unwrapTransaction } = await fetchUseComicIssueAssetTransaction()
      if (unwrapTransaction) {
        if (!signTransaction) return
        const latestBlockhash = await connection.getLatestBlockhash()
        const signedTransaction = await signTransaction(unwrapTransaction)
        confirmingTransaction()
        const signature = await connection.sendRawTransaction(signedTransaction.serialize())
        const response = await connection.confirmTransaction({ signature, ...latestBlockhash })
        if (!!response.value.err) {
          console.log('Response error log: ', response.value.err)
          toast({
            description: 'Error while unwrapping the comic',
            variant: 'error',
          })
          throw Error()
        }
        await sleep(1000)
      }
      refresh()
      // TODO: make sure comic pages are also invalidated
      //   queryClient.invalidateQueries(comicIssueKeys.get(comicIssue.id))
      //   queryClient.invalidateQueries(comicIssueKeys.getByOwner(myId))
      //   queryClient.invalidateQueries(assetKeys.getMany({ comicIssueId: comicIssue.id }))
      toast({
        description: 'Comic unwrapped! Lets get to reading 🎉',
        variant: 'success',
      })
      push(RoutePath.ReadComicIssue(comicIssueId), { scroll: false })
    } catch (e) {
      console.error('Error while unwrapping the comic', e)
    } finally {
      setIsLoading(false)
      onSuccess()
      //   onClose()
    }
  }

  return {
    handleUnwrap,
    isUnwrapLoading: isLoading,
  }
}
