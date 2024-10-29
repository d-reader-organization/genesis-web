import { useMutation } from '@tanstack/react-query'
import { connectUserWallet } from '@/app/lib/api/auth/mutations'
import { toast } from '@/components/ui'
import { useRouter } from 'next/navigation'
import { ConnectWalletData } from '@/models/wallet/connectWallet'

export const useConnectUserWallet = () => {
  const { refresh } = useRouter()
  return useMutation({
    mutationFn: (data: ConnectWalletData) => connectUserWallet(data),
    onSuccess: () => {
      toast({
        description: 'Wallet connected!',
        variant: 'success',
      })
      refresh()
    },
  })
}
