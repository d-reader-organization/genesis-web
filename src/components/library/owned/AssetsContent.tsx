'use client'

import { OwnedAssetPreview } from '@/components/digital-asset/OwnedAssetPreview'
import { Button, Text } from '@/components/ui'
import { RoutePath } from '@/enums/routePath'
import { OwnedComicIssue } from '@/models/comicIssue'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  ownedIssues: OwnedComicIssue[]
}

export const OwnedIssuesContent: React.FC<Props> = ({ ownedIssues }) => {
  const { back } = useRouter()

  return (
    <div className='flex flex-col items-start'>
      <Button className='flex items-center gap-3 w-fit px-0 py-10' variant='ghost' onClick={back}>
        <ArrowLeft className='size-8' />
        <Text as='h3' styleVariant='secondary'>
          {ownedIssues.at(0)?.collectibles.at(0)?.comicName}
        </Text>
      </Button>

      {ownedIssues.map((ownedIssue) => {
        return (
          <div
            key={ownedIssue.title}
            className='flex w-full justify-between gap-8 md:gap-16 py-10 border-t border-t-grey-300 border-b border-b-grey-300'
          >
            <div className='flex flex-col gap-2 max-w-[180px] w-full'>
              <Text as='h5' styleVariant='secondary'>
                EP {ownedIssue.number}
              </Text>
              <Text
                as='p'
                styleVariant='body-normal'
                fontWeight='medium'
                className='text-grey-100 line-clamp-1 text-ellipsis'
              >
                {ownedIssue.title}
              </Text>
              <Link
                className='h-full max-h-[42px] w-full max-w-28 py-3 px-4 flex justify-center items-center rounded-xl bg-grey-400'
                href={RoutePath.ReadComicIssue(ownedIssue.id)}
              >
                <Text as='p' styleVariant='body-normal' fontWeight='medium' className='text-grey-100'>
                  Read EP {ownedIssue.number}
                </Text>
              </Link>
            </div>
            <div className='flex flex-wrap gap-6 md:gap-10 w-full'>
              {ownedIssue.collectibles.map((asset) => (
                <OwnedAssetPreview key={asset.address} asset={asset} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
