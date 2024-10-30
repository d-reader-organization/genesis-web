import { useMutation } from '@tanstack/react-query'
import { disconnectUserWallet } from '@/app/lib/api/auth/mutations'
import { toast } from '@/components/ui'
import { useRouter } from 'next/navigation'

export const useDisconnectUserWallet = () => {
  const { refresh } = useRouter()
  return useMutation({
    mutationFn: (address: string) => disconnectUserWallet(address),
    onSuccess: (data) => {
      if (data.errorMessage) {
        toast({ description: `Failed to disconnect wallet: ${data.errorMessage}`, variant: 'error' })
      } else {
        toast({
          description: 'Wallet disconnected!',
          variant: 'success',
        })
        refresh()
      }
    },
  })
}
