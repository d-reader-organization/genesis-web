import { useMutation } from 'react-query'
import { disconnectUserWallet } from '@/app/lib/api/auth/mutations'
import { toast } from '@/components/ui'
import { useRouter } from 'next/navigation'

export const useDisconnectUserWallet = () => {
  const { refresh } = useRouter()
  return useMutation({
    mutationFn: (address: string) => disconnectUserWallet(address),
    onSuccess: () => {
      toast({
        description: 'Wallet disconnected!',
        variant: 'success',
      })
      refresh()
    },
  })
}
