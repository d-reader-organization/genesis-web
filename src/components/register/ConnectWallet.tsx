'use client'

import React from 'react'
import { Text } from '../ui/Text'
import { WhyDoINeedAWalletDialog } from '../shared/dialogs/WhyDoINeedAWalletDialog'
import { ButtonLink } from '../ui'
import { useSearchParams } from 'next/navigation'
import { RoutePath } from '@/enums/routePath'
import dynamic from 'next/dynamic'
import { WALLET_LABELS } from '@/constants/wallets'
import Link from 'next/link'

type Props = {
  isGoogleSignUp?: boolean
}

const BaseWalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).BaseWalletMultiButton,
  { ssr: false }
)

const ConnectWalletContent: React.FC<Props> = ({ isGoogleSignUp }) => {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')
  const queryParams = searchParams.size ? `?${searchParams.toString()}` : ''
  const nextPage = isGoogleSignUp
    ? redirectTo ?? RoutePath.Home
    : `${RoutePath.RegisterEmailVerification}${queryParams}`

  return (
    <main className='container mb-4 md:mb-8 sm:p-0 flex flex-col max-w-sm gap-4'>
      <Text as='h1' className='text-center pt-8 mb-4 sm:mb-8 font-semibold'>
        Connect wallet
      </Text>
      <Text as='p' className='text-center text-base md:text-lg leading-normal'>
        Connect with your favorite Solana wallet to store digital comics & other collectibles.
      </Text>
      <div className='flex justify-center gap-4 mt-2'>
        <Link
          href={nextPage}
          className='flex justify-center items-center min-w-40 p-2 text-base text-grey-100 rounded-lg bg-transparent border border-grey-100'
        >
          Skip
        </Link>

        <BaseWalletMultiButtonDynamic labels={WALLET_LABELS} />
      </div>
      <WhyDoINeedAWalletDialog />
    </main>
  )
}

export { ConnectWalletContent }
