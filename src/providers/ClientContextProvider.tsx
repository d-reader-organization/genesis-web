'use client'

import { endpoint } from '@/constants/environment'
import { RoutePath } from '@/enums/routePath'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { createContext, useContext } from 'react'
// import { useLocalStorage } from '@/hooks/useLocalStorage'
// import { IMPORTANT_NOTICE } from '@/constants/staticText'
// import CloseIcon from 'public/assets/vector-icons/close.svg'
// import Dialog from '@mui/material/Dialog'
import { CircleSdkProvider } from '@/providers/CircleSdkProvider'
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
  // const [isFirstTimeVisitor, setIsFirstTimeVisitor] = useLocalStorage('firstTimeVisitor', true)
  const wallets = useWalletAdapter()

  return (
    <CircleSdkProvider>
      <QueryClientProvider client={queryClient}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect={autoConnect}>
            <WalletModalProvider className='wallet-dialog'>
              {children}
              {/* <Dialog
								style={{ backdropFilter: 'blur(4px)' }}
								PaperProps={{ className: 'text-dialog' }}
								onClose={() => setIsFirstTimeVisitor(false)}
								open={isFirstTimeVisitor}
							>
								<div className='close-icon-wrapper'>
									<CloseIcon className='close-icon' onClick={() => setIsFirstTimeVisitor(false)} />
								</div>
								<strong>🚧 IMPORTANT NOTICE! 🚧</strong>
								<p>{IMPORTANT_NOTICE}</p>
							</Dialog> */}
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </QueryClientProvider>
    </CircleSdkProvider>
  )
}

export default ClientContextProvider

export const useClientContext = (): null => useContext(ClientContext)
