'use client'

import { endpoint } from '@/constants/solanaEnv'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { usePathname } from 'next/navigation'
// import { RoutePath } from '@/enums/routePath'
import { useWalletAdapter } from '@/hooks/useWalletAdapter'
import { AuthorizeWalletProvider } from './AuthorizeWalletContextProvider'
import { createContext, useContext } from 'react'
import { CircleSdkProvider } from './CircleSdkProvider'

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
  // const pathname = usePathname()
  // only autoconnect on /comic-issue, /mint and /claim screens
  // const isComicIssueScreen = pathname.toLowerCase().startsWith(RoutePath.ComicIssue(''))
  // const isMintScreen = pathname.toLowerCase().startsWith(RoutePath.Mint(''))
  // const isClaimScreen = pathname.toLowerCase().startsWith(RoutePath.Claim(''))
  // const autoConnect = isComicIssueScreen || isMintScreen || isClaimScreen
  const wallets = useWalletAdapter()

  return (
    <CircleSdkProvider>
      <QueryClientProvider client={queryClient}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets}>
            <AuthorizeWalletProvider>
              <WalletModalProvider className='wallet-dialog'>{children}</WalletModalProvider>
            </AuthorizeWalletProvider>
          </WalletProvider>
        </ConnectionProvider>
      </QueryClientProvider>
    </CircleSdkProvider>
  )
}

export default ClientContextProvider

export const useClientContext = (): null => useContext(ClientContext)
