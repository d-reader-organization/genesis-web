'use client'

import { endpoint } from '@/constants/environment'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { createContext, useContext } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { RoutePath } from '@/enums/routePath'
import { useWalletAdapter } from '@/hooks/useWalletAdapter'

export const ClientContext = createContext(null)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 10 * 1000, // stale for 10 seconds
    },
  },
})

const ClientContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  // only autoconnect on /comic-issue and /mint screens
  const autoConnect =
    pathname.toLowerCase().startsWith(RoutePath.ComicIssue('')) || pathname.toLowerCase().startsWith(RoutePath.Mint(''))
  const wallets = useWalletAdapter()

  return (
    <QueryClientProvider client={queryClient}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect={autoConnect}>
          <WalletModalProvider className='wallet-dialog'>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </QueryClientProvider>
  )
}

export default ClientContextProvider

export const useClientContext = (): null => useContext(ClientContext)
