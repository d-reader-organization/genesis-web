'use client'

import React, { PropsWithChildren } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useHomeArgs } from '@/hooks/useHomeArgs'
import { SliderType } from '@/utils/enums'

type Props = {
  slider: SliderType
} & PropsWithChildren

export const CustomSlider: React.FC<Props> = ({ children, slider }) => {
  const take = useHomeArgs()
  if (!take) return null

  const slidesToTake = slider === SliderType.comicList ? take.comicsPerPage : take.comicIssuesPerPage
  return (
    <Slider key={slider} slidesToScroll={slidesToTake} slidesToShow={slidesToTake} lazyLoad='anticipated'>
      {children}
    </Slider>
  )
}
