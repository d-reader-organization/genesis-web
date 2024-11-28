import { RarityChip } from '@/components/shared/chips/Rarity'
import { Asset } from '@/models/asset'
import Image from 'next/image'
import React from 'react'
import { StateChip } from '../shared/chips/State'
import { CardBorderWrapper } from '../shared/CardBorderWrapper'

type Props = {
  asset: Asset
}

export const OwnedAssetCard: React.FC<Props> = ({ asset }) => (
  <CardBorderWrapper className='rounded-xl'>
    <div className='flex flex-col items-center hover:brightness-105'>
      <Image
        alt={`owned ${asset.name} cover`}
        width={223}
        height={322}
        src={asset.image}
        className='w-auto max-h-[322px] h-full'
      />
      <div className='flex items-center -mt-3.5'>
        <RarityChip rarity={asset.rarity} />
        {asset.isUsed ? <StateChip state='used' /> : <StateChip state='mint' />}
        {asset.isSigned ? <StateChip state='signed' /> : null}
      </div>
    </div>
  </CardBorderWrapper>
)
