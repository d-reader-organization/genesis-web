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
import { Loader } from '../shared/Loader'
import { UnwrapWarningDialog } from '../shared/dialogs/UnwrapWarningDialog'
import { cn } from '@/lib/utils'
import { ComicRarity } from '@/enums/comicRarity'
import { UnwrapButtonListItem } from '../shared/buttons/UnwrapButtonListItem'
import dynamic from 'next/dynamic'

const BaseWalletMultiButtonDynamic = dynamic(
  async () => (await import('@/components/shared/buttons/SolanaBaseWalletButton')).SolanaBaseWalletButton
)

export const UnwrapIssueDialogItem: React.FC<{ asset: Asset; comicIssue: ComicIssue }> = ({ asset, comicIssue }) => {
  const [isUnwrapWarningRead] = useLocalStorage('unwrapWarning', false)
  const [unwrapWarningDialog, toggleUnwrapWarningDialog] = useToggle(false)

  const { handleUnwrap, isUnwrapLoading } = useHandleUnwrap({
    asset,
    comicIssueId: comicIssue.id,
    onSuccess: () => toggleUnwrapWarningDialog(),
  })

  const traitLabelStyle = `bg-transparent rounded-[4px] border border-solid text-xs flex items-center gap-0.5 [&>svg]:size-3 p-1`
  const unwrapButtonStyle =
    'border border-green-500 bg-transparent cursor-pointer w-20 h-12 text-green-500 rounded-[4px]'

  return (
    <div className='flex justify-between w-full border-t stroke-grey-300 items-end pt-5'>
      <div>
        <p className='text-left font-bold text-lg'>{asset.name}</p>
        <div className='flex flex-wrap h-5 gap-2 mt-2'>
          {asset.rarity && (
            <div
              className={cn(
                traitLabelStyle,
                asset.rarity === ComicRarity.Common && 'border-white',
                asset.rarity === ComicRarity.Uncommon && 'border-yellow-50',
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
        <BaseWalletMultiButtonDynamic className={unwrapButtonStyle} onClick={handleUnwrap}>
          {isUnwrapLoading ? <Loader /> : 'Open'}
        </BaseWalletMultiButtonDynamic>
      ) : (
        <UnwrapButtonListItem isLoading={isUnwrapLoading} onClick={toggleUnwrapWarningDialog} />
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
