'use client'

import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/Dialog'
import { StatelessCover } from '@/models/comicIssue/statelessCover'
import Image from 'next/image'
import { hardcodedData, RarityChip } from '../shared/RarityChip'
import { Arrow } from '../shared/Arrow'

type Props = {
  cover: StatelessCover
  hideArrows: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
  onPrevClick: () => void
  onNextClick: () => void
}

export const CoverPreviewDialog: React.FC<Props> = ({
  cover,
  hideArrows,
  open,
  onOpenChange,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='bg-transparent shadow-none p-4 flex gap-8 items-center sm:max-w-[520px]'
        overlayClassName='bg-grey-600 bg-opacity-60 backdrop-blur-[20px]'
        showCloseIcon={false}
        aria-describedby={undefined}
      >
        <DialogTitle className='sr-only'>Cover Preview</DialogTitle>
        {hideArrows ? null : <Arrow arrowOrientation='LEFT' className='bg-transparent' onClick={onPrevClick} />}
        <div className='flex flex-col gap-[42px] rounded-2xl'>
          <Image
            src={cover.image}
            alt='Cover image'
            className='shadow-[6px_6px_0px_0px_#000] rounded-2xl w-full'
            height={520}
            width={520}
          />
          <div className='flex justify-between'>
            <div className='flex gap-[42px]'>
              <InfoStats title='Supply' value={hardcodedData[cover.rarity]} />
              <InfoStats title='Cover author' value={cover.artist} />
            </div>
            <RarityChip rarity={cover.rarity} />
          </div>
        </div>
        {hideArrows ? null : <Arrow arrowOrientation='RIGHT' className='bg-transparent' onClick={onNextClick} />}
      </DialogContent>
    </Dialog>
  )
}

type InfoProps = {
  title: string
  value: string | number
}

const InfoStats: React.FC<InfoProps> = ({ title, value }) => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <span className='text-base font-medium leading-[22.4px] text-grey-100'>{title}</span>
      <h6 className='text-lg font-semibold leading-[18px] tracking-[0.036px]'>{value}</h6>
    </div>
  )
}
