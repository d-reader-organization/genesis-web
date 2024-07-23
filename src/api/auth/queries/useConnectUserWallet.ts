import { useMutation } from 'react-query'
import { connectUserWallet } from '@/app/lib/api/auth/mutations'
import { toast } from '@/components/ui'
import { useRouter } from 'next/navigation'

type ConnectRequest = { address: string; encoding: string }

export const useConnectUserWallet = () => {
  const { refresh } = useRouter()
  return useMutation({
    mutationFn: ({ address, encoding }: ConnectRequest) => connectUserWallet({ address, encoding }),
    onSuccess: () => {
      toast({
        description: 'Wallet connected!',
        variant: 'success',
      })
      refresh()
    },
  })
}
