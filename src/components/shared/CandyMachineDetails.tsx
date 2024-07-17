'use client'

import { CandyMachine } from '@/models/candyMachine'
import { CandyMachineGroupWithSource, WhiteListType } from '@/models/candyMachine/candyMachineGroup'
import clsx from 'clsx'
import React from 'react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { ProgressBar } from './ProgressBar'
import { Expandable } from './Expandable'
import LockIcon from 'public/assets/vector-icons/lock.svg'
import { MAX_PROTOCOL_FEE } from '@/constants/fee'
import { MintButton } from './MintButton'
import { ComicIssue } from '@/models/comicIssue'
import { useFetchCandyMachine } from '@/api/candyMachine/queries/useFetchCandyMachine'
import { useWallet } from '@solana/wallet-adapter-react'
import useAuthorizeWallet from '@/hooks/useAuthorizeWallet'

const toSol = (lamports: number) => +(lamports / LAMPORTS_PER_SOL).toFixed(3)
const normalise = (value: number, MAX: number) => (value * 100) / MAX

type Props = { candyMachine: CandyMachine }

const getItemsMinted = (candyMachine: CandyMachine) => {
  const group = candyMachine.groups.at(0)
  if (group?.whiteListType == WhiteListType.Public || group?.whiteListType == WhiteListType.WalletWhiteList) {
    return group.wallet.itemsMinted ?? 0
  } else {
    return group?.user.itemsMinted ?? 0
  }
}

export const CandyMachineDetails: React.FC<{ comicIssue: ComicIssue; isAuthenticated: boolean }> = ({
  comicIssue,
  isAuthenticated,
}) => {
  const { publicKey } = useWallet()
  const { data: candyMachine, refetch } = useFetchCandyMachine({
    candyMachineAddress: comicIssue.activeCandyMachineAddress ?? '',
    walletAddress: publicKey?.toBase58() ?? '',
  })
  useAuthorizeWallet(refetch)

  return candyMachine ? (
    <div className='flex flex-col rounded-lg p-4 sm:p-6 bg-grey-500 border border-grey-200 mb-6'>
      <GroupDetails candyMachine={candyMachine} />
      <UserDetails candyMachine={candyMachine} />
      <ProgressBar className='my-3' value={normalise(candyMachine.itemsMinted, candyMachine.supply)} />
      <ComicVault />
      <BalanceDetails candyMachine={candyMachine} />
      <MintButton candyMachine={candyMachine} comicIssue={comicIssue} isAuthenticated={isAuthenticated} />
    </div>
  ) : null
}

const GroupDetails: React.FC<Props> = ({ candyMachine }) => {
  const { startDate, endDate, mintPrice } = candyMachine.groups.at(0) as CandyMachineGroupWithSource
  const isLive = new Date(startDate) <= new Date() && new Date(endDate) > new Date()
  const isEnded = new Date() > new Date(endDate)
  const countdownString = '' // TODO
  const highlightDiscount = false // isAuthenticated && candyMachine.discount
  return (
    <div className='flex justify-between w-full'>
      <div className='font-bold'>
        {isLive ? (
          <span className='text-important-color'>● Live</span>
        ) : isEnded ? (
          <span className='text-red-500'>Ended</span>
        ) : (
          <span className='text-important-color'>
            Upcoming <div className='countdown'>{countdownString}</div>
          </span>
        )}
      </div>
      <div className='flex items-center'>
        {highlightDiscount ? (
          <div className='text-sm text-grey-600 font-bold rounded-lg p-1 bg-yellow-500 mr-1.5 h-[29px]'>
            <span>-{candyMachine.discount}&#37;</span>
          </div>
        ) : null}
        <span className={clsx('font-bold text-[22px]', highlightDiscount && 'text-yellow-500')}>
          {mintPrice == 0 ? '*Free' : `${toSol(mintPrice)} SOL`}
        </span>
      </div>
    </div>
  )
}

const UserDetails: React.FC<Props> = ({ candyMachine }) => {
  const itemsMintedPerUserOrWallet = getItemsMinted(candyMachine)
  const { mintLimit } = candyMachine.groups.at(0) as CandyMachineGroupWithSource
  return (
    <div className='flex justify-between mt-[10px] text-center text-grey-100 text-base'>
      <div className='flex'>
        <div>You minted</div>
        <div className='ml-[10px]'>
          {itemsMintedPerUserOrWallet}/{mintLimit ?? '∞'}
        </div>
      </div>
      <div>
        {candyMachine.itemsMinted}/{candyMachine.supply}
      </div>
    </div>
  )
}

const ComicVault: React.FC = () => (
  <Expandable
    className='bg-grey-400 border-transparent rounded-lg my-2'
    title='Comic Vault'
    titleComponent={
      <div className='flex gap-2 items-center text-sm sm:text-base font-medium leading-5 text-grey-100'>
        <LockIcon className='' /> Comic Vault
      </div>
    }
    hideArrow
  >
    <p className='text-grey-100 text-sm m-0 leading-5 sm:text-lg'>
      Comic Vault stores portion of the supply of each issue to later use in giveaways & other activities where we
      reward loyal users.
    </p>
  </Expandable>
)

const BalanceDetails: React.FC<Props> = ({ candyMachine }) => {
  const { mintPrice } = candyMachine.groups.at(0) as CandyMachineGroupWithSource
  return (
    <div className='flex text-base font-bold justify-between mt-2 mb-4'>
      <div>Total</div>
      <div>≈ {toSol(mintPrice + MAX_PROTOCOL_FEE)} SOL</div>
    </div>
  )
}
