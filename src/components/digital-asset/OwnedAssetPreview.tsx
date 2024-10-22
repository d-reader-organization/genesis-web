'use client'

import { RarityChip } from '@/components/shared/chips/Rarity'
import { Asset } from '@/models/asset'
import Image from 'next/image'
import React from 'react'
import { MintChip } from '../shared/chips/Mint'
import { UsedChip } from '../shared/chips/Used'
import { SignedChip } from '../shared/chips/Signed'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/Dialog'
import { OwnedAssetCard } from './OwnedDigitalAssetCard'

type Props = {
  asset: Asset
}

export const OwnedAssetPreview: React.FC<Props> = ({ asset }) => (
  <Dialog>
    <DialogTrigger>
      <OwnedAssetCard asset={asset} />
    </DialogTrigger>
    <DialogContent
      className='bg-transparent flex items-center justify-center max-w-screen-sm'
      aria-describedby={undefined}
    >
      <DialogTitle className='sr-only'>Owned asset preview dialog</DialogTitle>
      <div className='flex flex-col items-center w-fit'>
        <Image alt={`owned ${asset.name} cover`} width={310} height={450} src={asset.image} />
        <div className='flex items-center -mt-3.5'>
          <RarityChip rarity={asset.rarity} className='max-h-12' />
          {asset.isUsed ? <UsedChip /> : <MintChip />}
          {asset.isSigned ? <SignedChip /> : null}
        </div>
      </div>
    </DialogContent>
  </Dialog>
)
