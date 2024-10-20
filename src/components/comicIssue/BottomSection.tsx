'use client'

import { ComicIssue } from '@/models/comicIssue'
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/Button'
import { RoutePath } from '@/enums/routePath'
import { InfoListActions } from '../shared/InfoListActions'
import { useToggle } from '@/hooks'
import { useRouter } from 'next/navigation'
import { toast } from '../ui'
import { Loader } from '../shared/Loader'

type Props = {
  comicIssue: ComicIssue
}

export const ComicIssueBottomSection: React.FC<Props> = ({ comicIssue }) => {
  const [showLoader,toggleLoader] = useToggle();
  const router = useRouter();

  const handleRead = ()=>{
    try{
      toggleLoader();
      router.push(RoutePath.ReadComicIssue(comicIssue.id))
    }catch(e){
      toast({description:"Unable to read comic", variant:'error'})
      toggleLoader()
    }
  }

  return (
  <div className='block md:flex gap-6'>
    <InfoListActions
      className='hidden md:flex w-fit my-4 [&>*]:min-w-20'
      averageRating={comicIssue.stats?.averageRating}
      comicIssueId={comicIssue.id}
      favouritesCount={comicIssue.stats?.favouritesCount}
      isFavourite={comicIssue.myStats?.isFavourite}
      orientation='vertical'
      rating={comicIssue.myStats?.rating}
    />
    <div className='flex flex-col gap-4'>
      <Image
        className='aspect-comic-issue-cover-aspect-ratio w-full max-h-[480px] rounded-lg h-auto hidden md:block'
        src={comicIssue.cover}
        alt=''
        priority
        width={600}
        height={800}
      />
      <Button
        className='text-grey-100 py-2 px-4 min-w-[92px] max-w-[680px] mb-4 bg-transparent border border-grey-100'
        onClick={()=>handleRead()}
      >
       { showLoader ? <Loader /> : "Read"}
      </Button>
    </div>
  </div>
)
}
  
