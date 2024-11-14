'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../ui'
import { useDiscoverFilterStore } from '@/providers/DiscoverFilterStoreProvider'
import { useEffect, useState } from 'react'
import { fetchComicIssues } from '@/app/lib/api/comicIssue/queries'
import { ComicIssue } from '@/models/comicIssue'

export const ComicIssuesContent: React.FC = () => {
  const comicIssueParams = useDiscoverFilterStore((state) => state.comicIssueParams)
  const [comicIssues, setComicIssues] = useState<ComicIssue[] | undefined>(undefined)

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const data = await fetchComicIssues(comicIssueParams)
        setComicIssues(data)
      } catch (error) {
        console.error('Error occured while fetching comic issues: ', error)
      }
    }

    fetchParams()
  }, [comicIssueParams])

  return (
    <div className='grid grid-cols-6 gap-6 pt-2'>
      {comicIssues?.map((comicIssue: ComicIssue) => (
        <Link href={comicIssue.slug} className='relative h-[295px] rounded-xl hover:brightness-125' key={comicIssue.id}>
          <Image alt={comicIssue.title + ' Cover'} src={comicIssue.cover} className='object-cover rounded-xl' fill />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-xl'></div>
          <div className='relative z-10 p-4 flex flex-col gap-2 justify-end h-full'>
            <div className='flex flex-col gap-1 items-start justify-end'>
              <Text as='p' styleVariant='body-small' fontWeight='bold'>
                {comicIssue.title}
              </Text>
              <Text as='p' styleVariant='body-xsmall'>
                {comicIssue.creator?.name ? 'by ' + comicIssue.creator?.name : ''}
              </Text>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
