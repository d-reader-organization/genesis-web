'use client'

import { Button, toast } from '@/components/ui'
import { Share2 } from 'lucide-react'
import React from 'react'

interface Props {
  title?: string
  text?: string
}

export const ShareButton: React.FC<Props> = ({ title = '', text = '' }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: window.location.toString(),
        })
      } catch (err) {
        console.error('Error sharing content: ', err)
      }
    } else {
      toast({ description: 'Sharing is not supported on this browser.', variant: 'error' })
    }
  }

  return (
    <Button onClick={handleShare} className='flex bg-grey-300 bg-opacity-30 rounded-lg p-3 max-h-10 text-grey-100'>
      <Share2 className='w-4' />
    </Button>
  )
}
