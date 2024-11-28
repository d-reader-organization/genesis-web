import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import { StarIcon } from '../icons/StarIcon'
import { Button, toast } from '@/components/ui'
import { useRouter } from 'next/navigation'
import { rateComic } from '@/app/lib/api/comic/mutations'
import { rateComicIssue } from '@/app/lib/api/comicIssue/mutations'
import { CommonDialogProps } from '@/models/common'

type Props = {
  comicIssueId?: number
  comicSlug?: string
} & CommonDialogProps

export const StarRatingDialog: React.FC<Props> = ({ comicIssueId, comicSlug, toggleDialog, open }) => {
  const [rating, setRating] = React.useState<number | null>(null)
  const { refresh } = useRouter()
  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating)
  }

  const handleClose = () => {
    setRating(null)
    toggleDialog()
  }

  const handleSubmit = async () => {
    if (!rating) {
      return
    }
    if (comicSlug) {
      await rateComic({
        slug: comicSlug,
        request: { rating },
      })
    } else if (comicIssueId) {
      await rateComicIssue({
        id: comicIssueId,
        request: { rating },
      })
    }
    handleClose()
    toast({
      description: comicSlug ? 'Comic rated' : 'Comic issue rated!',
      variant: 'success',
    })
    refresh()
  }

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent className='sm:max-w-xs p-0 overflow-hidden' aria-describedby={undefined}>
        <DialogTitle className='sr-only'>Star rating dialog</DialogTitle>
        <div className='flex flex-col items-center justify-center text-center py-8 px-4 text-base md:text-lg'>
          <strong>Rate the episode</strong>
          Tap a star to give a rating!
          <div className='mt-4 flex gap-3 [&>*]:text-yellow-500'>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                style={{ cursor: 'pointer' }}
                size='xl'
                key={star}
                onClick={() => handleStarClick(star)}
                solid={!!(rating && rating >= star)}
              />
            ))}
          </div>
        </div>
        <div className='flex border-t-2 border-t-grey-600 [&>*]:p-4'>
          <Button
            className='border-r-2 border-r-grey-600 rounded-r-none hover:bg-grey-300'
            onClick={handleClose}
            variant='ghost'
          >
            Cancel
          </Button>
          <Button className='hover:bg-grey-300' onClick={handleSubmit} variant='ghost'>
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
