import { ComicIssue } from '@/models/comicIssue'
import { Text } from '@/components/ui'
import React from 'react'

type Props = {
  comicIssue: ComicIssue
}

export const MintComicInfo: React.FC<Props> = ({ comicIssue }) => (
  <div className='flex flex-col gap-4'>
    <div className='flex gap-12'>
      <Text as='p' className='font-medium text-grey-100'>
        {comicIssue.comic?.title}
      </Text>
      <Text as='p' className='font-medium text-grey-100'>
        EP {comicIssue.number}
      </Text>
    </div>
  </div>
)
