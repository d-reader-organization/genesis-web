'use client'

import { CandyMachineDetails } from '@/components/shared/CandyMachineDetails'
import { Text } from '@/components/ui'
import { ComicIssue } from '@/models/comicIssue'
import clsx from 'clsx'
import React, { useState } from 'react'
import { AboutTab } from './About'

type Props = {
  comicIssue: ComicIssue
  isAuthenticated: boolean
}

export const MintTabs: React.FC<Props> = ({ comicIssue, isAuthenticated }) => {
  const [isMintTabActive, setMintActiveTab] = useState(true)
  return (
    <div className='flex flex-col gap-10 my-6'>
      {comicIssue.activeCandyMachineAddress ? (
        <>
          <div className='flex gap-6  border-b border-grey-200 [&>p]:cursor-pointer'>
            <Tab isActive={isMintTabActive} onClick={() => setMintActiveTab(true)} text='Mint' />
            <Tab isActive={!isMintTabActive} onClick={() => setMintActiveTab(false)} text='About' />
          </div>
          {isMintTabActive ? (
            <CandyMachineDetails comicIssue={comicIssue} isAuthenticated={isAuthenticated} />
          ) : (
            <AboutTab comicIssue={comicIssue} />
          )}
        </>
      ) : (
        <AboutTab comicIssue={comicIssue} />
      )}
    </div>
  )
}

type TabProps = {
  isActive: boolean
  onClick: () => void
  text: string
}

const Tab: React.FC<TabProps> = ({ isActive, onClick, text }) => (
  <button onClick={onClick}>
    <Text
      as='p'
      className={clsx('pb-5 text-lg font-medium', isActive && 'border-b-2 border-yellow-500 text-yellow-500')}
    >
      {text}
    </Text>
  </button>
)
