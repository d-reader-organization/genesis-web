'use client'

import { WalletName } from '@solana/wallet-adapter-base'
import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui'
import { Wallet } from '@solana/wallet-adapter-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { usePreviousValue } from '@/hooks/usePreviousValue'
import { Button, ButtonProps } from '../../ui/Button'
import { WalletListItem } from '../WalletListItem'

interface Props extends ButtonProps {
  text?: string
  onClick: () => Promise<void>
}

/**
 * Making custom wallet buttons sucks af on Solana...
 * Why can't we have wallet sessions like on Mobile Wallet Adapter?
 * https://github.com/solana-labs/wallet-adapter/tree/master/packages/core/react */
const ConnectButton: React.FC<Props> = ({ onClick, text, children, ...props }) => {
  const [buttonClicked, setButtonClicked] = useState(false)
  const [actionTriggered, setActionTriggered] = useState(false)

  const [walletModalConfig, setWalletModalConfig] = useState<Readonly<{
    onSelectWallet(walletName: WalletName): void
    wallets: Wallet[]
  }> | null>(null)

  const { buttonState, onConnect, onSelectWallet } = useWalletMultiButton({
    onSelectWallet: setWalletModalConfig,
  })
  const prevButtonState = usePreviousValue(buttonState)

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
    setButtonClicked(true)
    switch (buttonState) {
      case 'connected':
        try {
          await onClick()
        } finally {
          setButtonClicked(false)
        }
        break
      case 'connecting':
      case 'disconnecting':
        try {
          setButtonClicked(false)
        } finally {
          setButtonClicked(false)
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
      await onClick()
    } finally {
      setActionTriggered(false)
      setButtonClicked(false)
    }
  }, [onClick])

  useEffect(() => {
    if (buttonState === 'connected' && actionTriggered) {
      handleAsyncAction()
    }
  }, [actionTriggered, buttonState, handleAsyncAction])

  useEffect(() => {
    if (prevButtonState === 'connecting' && buttonState === 'no-wallet') {
      setButtonClicked(false)
    }
  }, [buttonState, prevButtonState])

  return (
    <>
      <Button
        disabled={buttonClicked || buttonState === 'connecting' || buttonState === 'disconnecting'}
        onClick={handleClick}
        {...props}
      >
        {children || label}
      </Button>
      {/* This dialog will break af if the user clicks the "close" icon on the wallet selection menu
			This is due to the fact that wallet-adapter has a few poorly exported states/components and we can't do anything about it */}
      {/* {walletModalConfig ? <WalletModal /> : null} */}

      {walletModalConfig ? (
        <div className='wallet-adapter-modal wallet-adapter-modal-fade-in wallet-dialog'>
          <div className='wallet-adapter-modal-container'>
            <div className='wallet-adapter-modal-wrapper'>
              <button
                onClick={() => {
                  setWalletModalConfig(null)
                  setButtonClicked(false)
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

export default ConnectButton
