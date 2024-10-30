'use client'

import React from 'react'
import { ComicIssue } from '@/models/comicIssue'
import { CandyMachineStoreProvider } from '@/providers/CandyMachineStoreProvider'
import { CandyMachineDetails } from '../shared/CandyMachineDetails'
import { useLocalStorage, useToggle } from '@/hooks'
import { LOCAL_STORAGE } from '@/constants/general'

type Props = {
  comicIssue: ComicIssue
  isAuthenticated: boolean
}

export const CandyMachineClaimDetails: React.FC<Props> = ({ comicIssue, isAuthenticated }) => {
  const [isClaimWalkthroughCompelete, setClaimWalkthroughCompelete] = useLocalStorage(
    LOCAL_STORAGE.IS_CLAIM_WALKTHROUGH_COMPELETE,
    false
  )
  const [showBouncingPurchaseButton, , closeBouncingPurchaseButton] = useToggle(!isClaimWalkthroughCompelete)

  const onMint = () => {
    closeBouncingPurchaseButton()
    setClaimWalkthroughCompelete(true)
  }

  return (
    <CandyMachineStoreProvider comicIssue={comicIssue} isAuthenticated={isAuthenticated}>
      <CandyMachineDetails
        comicIssue={comicIssue}
        isAuthenticated={isAuthenticated}
        bounce={showBouncingPurchaseButton}
        onMint={onMint}
      />
    </CandyMachineStoreProvider>
  )
}
