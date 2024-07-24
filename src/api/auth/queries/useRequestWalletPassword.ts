import { useMutation } from '@tanstack/react-query'
import { requestWalletPassword } from '@/app/lib/api/auth/mutations'

export const useRequestWalletPassword = () =>
  useMutation({
    mutationFn: (address: string) => requestWalletPassword(address),
  })
