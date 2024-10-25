import { RarityChip } from '@/components/shared/chips/Rarity'
import { Asset } from '@/models/asset'
import Image from 'next/image'
import React from 'react'
import { MintChip } from '../shared/chips/Mint'
import { UsedChip } from '../shared/chips/Used'
import { SignedChip } from '../shared/chips/Signed'

type Props = {
  asset: Asset
}

export const OwnedAssetCard: React.FC<Props> = ({ asset }) => (
  <div className='flex flex-col items-center hover:scale-105'>
    <Image
      alt={`owned ${asset.name} cover`}
      width={223}
      height={322}
      src={asset.image}
      className='max-w-[223px] max-h-[322px] h-full'
    />
    <div className='flex items-center -mt-3.5'>
      <RarityChip rarity={asset.rarity} />
      {asset.isUsed ? <UsedChip /> : <MintChip />}
      {asset.isSigned ? <SignedChip /> : null}
    </div>
  </div>
)
