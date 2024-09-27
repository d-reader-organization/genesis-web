'use client'

import { cn } from '@/lib/utils'
import { getRarityColor, getRarityTextColor } from '@/utils/rarity'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import React, { LegacyRef, useCallback, useEffect, useState } from 'react'
import RarityIcon from 'public/assets/vector-icons/rarity-icon.svg'
import { StatelessCover } from '@/models/comicIssue/statelessCover'
import useToggle from '@/hooks/useToggle'
import { CoverPreviewDialog } from './CoverPreview'
import { RarityChip } from '../shared/RarityChip'

type Props = { covers: StatelessCover[] }

export const CoverSlider: React.FC<Props> = ({ covers }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ stopOnMouseEnter: true })])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [isCoverPreviewOpen, toggleCoverPreview] = useToggle()

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    onSelect()
    emblaApi?.on('select', onSelect)
    return () => {
      emblaApi?.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className='flex flex-col gap-14 md:gap-16'>
      <Slider covers={covers} emblaRef={emblaRef} onSlideClick={() => toggleCoverPreview()} />
      <SliderDots emblaApi={emblaApi} slides={covers} selectedIndex={selectedIndex} />
      <CoverPreviewDialog
        cover={covers[selectedIndex]}
        hideArrows={covers.length < 2}
        open={isCoverPreviewOpen}
        onPrevClick={() => {
          emblaApi?.scrollPrev()
        }}
        onNextClick={() => {
          emblaApi?.scrollNext()
        }}
        onOpenChange={() => toggleCoverPreview()}
      />
    </div>
  )
}

type SliderProps = {
  covers: StatelessCover[]
  emblaRef: LegacyRef<HTMLDivElement>
  onSlideClick: () => void
}

const Slider: React.FC<SliderProps> = ({ covers, emblaRef, onSlideClick }) => (
  <div className='max-w-64 md:max-w-[354px] relative'>
    <div className='overflow-hidden' ref={emblaRef}>
      <div className='flex'>
        {covers.map((cover, index) => (
          <Slide cover={cover} key={`${cover.rarity}-${index}`} onClick={onSlideClick} />
        ))}
      </div>
    </div>
  </div>
)

type SlideProps = {
  cover: StatelessCover
  onClick: () => void
}

const Slide: React.FC<SlideProps> = ({ cover, onClick }) => (
  <div className='flex-[0_0_100%] h-[400px] md:h-[520px]'>
    <button className='relative flex justify-center hover:brightness-110' onClick={onClick}>
      <Image
        alt={`${cover.rarity} - cover`}
        src={cover.image}
        width={350}
        height={514}
        className='rounded-2xl min-h-96'
      />
      <RarityChip className='absolute -bottom-[14px]' rarity={cover.rarity} />
    </button>
  </div>
)

type DotsProps = {
  emblaApi?: { scrollTo: (index: number) => void }
  slides: StatelessCover[]
  selectedIndex: number
}

const SliderDots: React.FC<DotsProps> = ({ emblaApi, slides, selectedIndex }) => {
  const currentRarity = slides[selectedIndex].rarity
  return (
    <div className='flex justify-center items-center gap-4 relative bottom-8 px-4 md:px-6 max-h-4'>
      {slides.map((_, dotIndex) => (
        <button
          key={dotIndex}
          className={cn('transition-all duration-300 rounded-2xl w-full py-4 flex flex-col items-center gap-4')}
          onClick={() => emblaApi && emblaApi.scrollTo(dotIndex)}
        >
          <RarityIcon
            className={cn(
              'w-4 h-3.5',
              selectedIndex === dotIndex ? 'block' : 'invisible',
              getRarityTextColor(currentRarity)
            )}
          />
          <span
            className={cn(
              'flex w-full',
              dotIndex === selectedIndex ? cn('h-[3px]', getRarityColor(currentRarity)) : 'bg-grey-200 h-[1px]'
            )}
          ></span>
        </button>
      ))}
    </div>
  )
}
