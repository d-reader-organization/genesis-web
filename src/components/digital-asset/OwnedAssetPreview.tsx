'use client'

import { RarityChip } from '@/components/shared/chips/Rarity'
import { Asset } from '@/models/asset'
import Image from 'next/image'
import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/Dialog'
import { OwnedAssetCard } from './OwnedAssetCard'
import { toast } from '../ui/toast'
import { Circle, Copy, ExternalLink } from 'lucide-react'
import { Text } from '../ui/Text'
import { shortenAssetName, shortenSolanaAddress } from '@/utils/helpers'
import { GenreTags } from '../shared/GenresList'
import { ExpandableText } from '../shared/ExpandableText'
import { Divider } from '../shared/Divider'
import { AudienceWidget } from '../shared/AudienceWidget'
import { AudienceType } from '@/enums/audienceType'
import Link from 'next/link'
import { RoutePath } from '@/enums/routePath'
import { StateChip } from '../shared/chips/State'
import { RoyaltyChip } from '../shared/chips/Royalty'
import { useFetchComicIssue } from '@/api/comicIssue/queries/useFetchComicIssue'
import { CreatorInfoLink } from '../creator/InfoLink'

type Props = {
  asset: Asset
}

export const OwnedAssetPreview: React.FC<Props> = ({ asset }) => {
  const { data: comicIssue } = useFetchComicIssue(asset.comicIssueId)
  return (
    <Dialog>
      <DialogTrigger>
        <OwnedAssetCard asset={asset} />
      </DialogTrigger>
      <DialogContent
        className='bg-grey-500 rounded-3xl justify-start max-w-screen-md flex flex-col items-center gap-6 md:flex-row md:justify-center md:items-start md:gap-10 w-full p-4 md:p-10 max-h-full'
        aria-describedby={undefined}
      >
        <DialogTitle className='sr-only'>Owned asset preview dialog</DialogTitle>
        <div className='flex flex-col gap-6 md:gap-8 items-center max-sm:mt-6 h-full'>
          <Image alt={`owned ${asset.name} cover`} width={223} height={322} src={asset.image} />
          <div className='flex gap-4 max-h-12 sm:max-h-[52px] w-full'>
            {/* <Button className='w-full rounded-xl' size='normal' variant='outline'>
              <Text as='p' styleVariant='body-normal' fontWeight='medium'>
                List
              </Text>
            </Button> */}
            <Link
              className='bg-yellow-500 w-full flex justify-center items-center h-10 sm:h-[52px] p-1 sm:p-4 rounded-xl'
              href={RoutePath.ReadComicIssue(asset.comicIssueId)}
            >
              <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-600'>
                Read
              </Text>
            </Link>
          </div>
        </div>
        <div className='flex flex-col gap-4 w-full max-w-fit'>
          <div className='flex items-center gap-4 flex-wrap'>
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
              {asset.comicName}
            </Text>
            <Circle className='size-2 mt-1.5' fill='#D9D9D9' />
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
              {asset.comicIssueName}
            </Text>
            <Circle className='size-2 mt-1.5' fill='#D9D9D9' />
            <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
              {shortenAssetName(asset.name)}
            </Text>
          </div>
          <div className='flex flex-col gap-6'>
            <Text as='h3' styleVariant='primary' className='line-clamp-1 text-ellipsis'>
              {asset.comicIssueName}
            </Text>
            <GenreTags className='bg-grey-400' genres={comicIssue?.genres ?? []} />
            <ExpandableText className='max-w-[440px] lg:max-w-[486px]' text={asset.description} />
            <div className='flex justify-between'>
              <div className='flex gap-4 items-center'>
                <div className='text-base font-medium leading-[22.4px]'>
                  <span>{comicIssue?.stats?.totalPagesCount}&nbsp;</span>
                  <span className='text-grey-100'>pages</span>
                </div>
                <AudienceWidget audience={comicIssue?.comic?.audienceType ?? AudienceType.Everyone} />
              </div>
              {comicIssue?.comicSlug ? (
                <Link
                  className='max-h-9 px-3 py-2 flex gap-2 justify-center items-center rounded-lg bg-grey-500'
                  href={RoutePath.Comic(comicIssue?.comicSlug)}
                  target='_blank'
                >
                  <ExternalLink className='text-grey-100' size={20} />
                  <span className='text-base font-medium leading-[22.4px] text-grey-100'>Explore series</span>
                </Link>
              ) : null}
            </div>
            <div className='flex items-center gap-2 flex-wrap'>
              <RoyaltyChip royalty={asset.royalties} />
              <RarityChip rarity={asset.rarity} />
              {asset.isUsed ? <StateChip state='used' text='USED' /> : <StateChip state='mint' text='MINT' />}
              {asset.isSigned ? <StateChip state='signed' text='SIGNED' /> : null}
            </div>
            <Divider />
            <CreatorInfoLink creator={comicIssue?.creator} />
            <Divider />
            <AddressContainer address={asset.ownerAddress} title='Owner' />
            <AddressContainer address={asset.address} title='Asset Address' />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

type AddressContainerProps = {
  address: string
  title: string
}

const AddressContainer: React.FC<AddressContainerProps> = ({ address, title }) => (
  <div className='flex px-4 py-1 items-center justify-between gap-4 bg-grey-600 rounded-xl max-h-14 h-full'>
    <div className='flex flex-col'>
      <Text as='p' styleVariant='body-large' fontWeight='bold'>
        {title}
      </Text>
      <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-200 line-clamp-1 text-ellipsis'>
        {shortenSolanaAddress({
          address,
          slice: 8,
        })}
      </Text>
    </div>
    <button
      className='flex justify-center items-center p-4 rounded-md bg-grey-300'
      onClick={() => {
        navigator.clipboard.writeText(address)
        toast({ description: 'Copied to clipboard' })
      }}
    >
      <Copy className='size-3 text-grey-100' />
    </button>
  </div>
)
