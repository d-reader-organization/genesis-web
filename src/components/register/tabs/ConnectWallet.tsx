'use client'

import React from 'react'
import { Text } from '../../ui/Text'
import { WhyDoINeedAWalletDialog } from '../../shared/dialogs/WhyDoINeedAWalletDialog'
import { Button } from '../../ui/Button'
import { useSearchParams } from 'next/navigation'
import { RoutePath } from '@/enums/routePath'
import dynamic from 'next/dynamic'
import { REDIRECT_TO_KEY } from '@/constants/general'
import { ButtonLink } from '@/components/ui/ButtonLink'

type Props = {
  isGoogleSignUp?: boolean
  onSkip: () => void
}

const BaseWalletMultiButtonDynamic = dynamic(
  async () => (await import('@/components/shared/buttons/SolanaBaseWalletButton')).SolanaBaseWalletButton
)

const ConnectWalletContent: React.FC<Props> = ({ isGoogleSignUp, onSkip }) => {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get(REDIRECT_TO_KEY)

  return (
    <main className='container mb-4 md:mb-8 sm:p-0 flex flex-col max-w-sm gap-4'>
      <Text as='h1' styleVariant='primary-heading' fontWeight='semibold' className='text-center pt-8 mb-4 sm:mb-8'>
        Connect wallet
      </Text>
      <Text as='p' styleVariant='body-large' className='text-center text-base md:text-lg leading-normal'>
        Connect with your favorite Solana wallet to store digital comics & other collectibles.
      </Text>
      <div className='flex justify-center gap-4 mt-2'>
        {isGoogleSignUp ? (
          <ButtonLink className='h-[48px]' variant='outline' href={redirectTo ?? RoutePath.Home}>
            Skip
          </ButtonLink>
        ) : (
          <Button className='w-[unset] min-w-40 h-[48px]' onClick={onSkip} variant='outline'>
            Skip
          </Button>
        )}
        <BaseWalletMultiButtonDynamic />
      </div>
      <WhyDoINeedAWalletDialog />
    </main>
  )
}

export { ConnectWalletContent }
