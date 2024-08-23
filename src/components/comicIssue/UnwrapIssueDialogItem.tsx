'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import useToggle from '@/hooks/useToggle'
import { Asset } from '@/models/asset'
import { ComicIssue } from '@/models/comicIssue'
import React from 'react'
import { useHandleUnwrap } from '@/hooks/useHandleUnwrap'
import { getRarityIcon } from '@/utils/rarity'
import MintIcon from 'public/assets/vector-icons/mint-attribute-icon.svg'
import SignedIcon from 'public/assets/vector-icons/signed-attribute-icon.svg'
import ConnectButton from '../shared/buttons/ConnectButton'
import { Loader } from '../shared/Loader'
import { UnwrapWarningDialog } from '../shared/dialogs/UnwrapWarningDialog'
import { cn } from '@/lib/utils'
import { ComicRarity } from '@/enums/comicRarity'
import { UnwrapButton } from '../shared/buttons/UnwrapButton'

export const UnwrapIssueDialogItem: React.FC<{ asset: Asset; comicIssue: ComicIssue }> = ({ asset, comicIssue }) => {
  const [isUnwrapWarningRead] = useLocalStorage('unwrapWarning', false)
  const [unwrapWarningDialog, toggleUnwrapWarningDialog] = useToggle(false)

  const { handleUnwrap, isUnwrapLoading } = useHandleUnwrap({
    asset,
    comicIssueId: comicIssue.id,
    onSuccess: () => toggleUnwrapWarningDialog(),
  })

  const traitLabelStyle = `bg-transparent rounded-[4px] border border-solid text-xs flex items-center [&>svg]:size-3`
  const unwrapButtonStyle = 'border border-green-500 bg-transparent cursor-pointer w-20 h-12'

  return (
    <div className='flex justify-between w-full border-t stroke-grey-300 items-end mt-5'>
      <div>
        <p className='text-left font-bold'>{asset.name}</p>
        <div className='flex flex-wrap'>
          {asset.rarity && (
            <div
              className={cn(
                traitLabelStyle,
                asset.rarity === ComicRarity.Common && 'border-white',
                asset.rarity === ComicRarity.Uncommon && 'border-yellow-100',
                asset.rarity === ComicRarity.Rare && 'border-blue-500',
                asset.rarity === ComicRarity.Epic && 'border-pink-500',
                asset.rarity === ComicRarity.Legendary && 'border-purple-500'
              )}
            >
              {getRarityIcon(asset.rarity)} {asset.rarity}
            </div>
          )}
          {!asset.isUsed && (
            <div className={cn(traitLabelStyle, 'border-green-500')}>
              <MintIcon /> Mint
            </div>
          )}
          {asset.isSigned && (
            <div className={cn(traitLabelStyle, 'border-orange-500')}>
              <SignedIcon /> Signed
            </div>
          )}
        </div>
      </div>
      {isUnwrapWarningRead ? (
        <ConnectButton className={unwrapButtonStyle} onClick={handleUnwrap}>
          {isUnwrapLoading ? <Loader /> : 'Open'}
        </ConnectButton>
      ) : (
        <UnwrapButton isLoading={isUnwrapLoading} onClick={toggleUnwrapWarningDialog} />
      )}
      <UnwrapWarningDialog
        open={unwrapWarningDialog}
        toggleDialog={toggleUnwrapWarningDialog}
        handleUnwrap={handleUnwrap}
        isLoading={isUnwrapLoading}
      />
    </div>
  )
}
