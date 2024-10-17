'use client'

import { WalletName } from '@solana/wallet-adapter-base'
import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui'
import { Wallet } from '@solana/wallet-adapter-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, ButtonProps } from '../../ui/Button'
import { WalletListItem } from '../WalletListItem'
require('@solana/wallet-adapter-react-ui/styles.css')

type Props = {
  text?: string
  onClick?: () => Promise<void>
} & ButtonProps

/**
 * Making custom wallet buttons sucks af on Solana...
 * Why can't we have wallet sessions like on Mobile Wallet Adapter?
 * https://github.com/solana-labs/wallet-adapter/tree/master/packages/core/react */
export const ConnectButton: React.FC<Props> = ({ onClick, text, children, ...props }) => {
  const [actionTriggered, setActionTriggered] = useState(false)

  const [walletModalConfig, setWalletModalConfig] = useState<Readonly<{
    onSelectWallet(walletName: WalletName): void
    wallets: Wallet[]
  }> | null>(null)

  const { buttonState, onConnect, onSelectWallet, onDisconnect } = useWalletMultiButton({
    onSelectWallet: setWalletModalConfig,
  })

  const label = useMemo(() => {
    if (text) return text
    else {
      switch (buttonState) {
        case 'connected':
          return 'Disconnect'
        case 'connecting':
          return 'Connecting'
        case 'disconnecting':
          return 'Disconnecting'
        case 'has-wallet':
          return 'Connect'
        case 'no-wallet':
          return 'Select Wallet'
      }
    }
  }, [buttonState, text])

  const handleClick = useCallback(async () => {
    switch (buttonState) {
      case 'connected':
        if (onClick) {
          await onClick()
        } else if (onDisconnect) {
          onDisconnect()
        }
        break
      case 'has-wallet':
        if (onConnect) onConnect()
        setActionTriggered(true)
        break
      case 'no-wallet': {
        if (onSelectWallet) onSelectWallet()
        setActionTriggered(true)
        break
      }
    }
  }, [buttonState, onClick, onConnect, onSelectWallet])

  const handleAsyncAction = useCallback(async () => {
    try {
      if (onClick) await onClick()
    } finally {
      setActionTriggered(false)
    }
  }, [onClick])

  useEffect(() => {
    if (buttonState === 'connected' && actionTriggered) {
      handleAsyncAction()
    }
  }, [actionTriggered, buttonState, handleAsyncAction])

  return (
    <>
      <Button className='py-5' variant='outline' size='normal' onClick={handleClick} {...props}>
        {children || <span className='leading-[22.4px]'>{label}</span>}
      </Button>
      {/* This dialog will break af if the user clicks the "close" icon on the wallet selection menu
			This is due to the fact that wallet-adapter has a few poorly exported states/components and we can't do anything about it */}
      {/* {walletModalConfig ? <WalletModal /> : null} */}

      {walletModalConfig ? (
        <div className='wallet-adapter-modal wallet-adapter-modal-fade-in wallet-dialog'>
          <div
            className='wallet-adapter-modal-container'
            onClick={(e) => e.currentTarget === e.target && setWalletModalConfig(null)}
          >
            <div className='wallet-adapter-modal-wrapper'>
              <button
                onClick={() => {
                  setWalletModalConfig(null)
                }}
                className='wallet-adapter-modal-button-close'
              >
                <svg width='14' height='14'>
                  <path d='M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z' />
                </svg>
              </button>
              <h1 className='wallet-adapter-modal-title'>Connect a wallet</h1>
              <ul className='wallet-adapter-modal-list'>
                {walletModalConfig.wallets.map((wallet) => (
                  <WalletListItem
                    key={wallet.adapter.name}
                    handleClick={() => {
                      walletModalConfig.onSelectWallet(wallet.adapter.name)
                      setWalletModalConfig(null)
                    }}
                    wallet={wallet}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export const ConnectButtonV2: React.FC<Props> = ({ onClick }) => {
  return (
    <Button className='py-5' variant='outline' size='normal' onClick={onClick}>
      <span className='leading-[22.4px]'>Connect Wallet</span>
    </Button>
  )
}
