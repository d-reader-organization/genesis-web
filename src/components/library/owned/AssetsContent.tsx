'use client'

import { OwnedAssetPreview } from '@/components/digital-asset/OwnedAssetPreview'
import { Button, Text } from '@/components/ui'
import { RoutePath } from '@/enums/routePath'
import { Asset } from '@/models/asset'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  ownedAssets: Asset[]
}

export const OwnedAssetsContent: React.FC<Props> = ({ ownedAssets }) => {
  const { back } = useRouter()
  const uniqueNames = ownedAssets.reduce<string[]>((prev, curr) => {
    return [...new Set([...prev, curr.comicIssueName])]
  }, [])

  return (
    <div className='flex flex-col items-start'>
      <Button className='flex items-center gap-3 w-fit px-0 py-10' variant='ghost' onClick={back}>
        <ArrowLeft className='size-8' />
        <Text as='h3' styleVariant='secondary'>
          {ownedAssets.at(0)?.comicName}
        </Text>
      </Button>

      {uniqueNames.map((name) => {
        return (
          <div
            key={name}
            className='flex w-full justify-between gap-8 md:gap-16 py-10 border-t border-t-grey-300 border-b border-b-grey-300'
          >
            <div className='flex flex-col gap-2 max-w-[180px] w-full'>
              <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
                {name}
              </Text>
              <Link
                className='h-full max-h-[42px] w-full max-w-[110px] py-3 px-6 flex justify-center items-center rounded-xl bg-grey-400'
                href={RoutePath.ReadComicIssue(
                  ownedAssets.find((asset) => asset.comicIssueName === name)?.comicIssueId ?? 0
                )}
              >
                <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
                  Read
                </Text>
              </Link>
            </div>
            <div className='flex flex-wrap gap-6 md:gap-10 w-full'>
              {ownedAssets
                .filter((asset) => asset.comicIssueName === name)
                .map((asset) => (
                  <OwnedAssetPreview key={asset.address} asset={asset} />
                ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
