'use client'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ComicItem from './ComicItem'
import Slider from 'react-slick'
import clsx from 'clsx'
import { Comic } from '@/models/comic'
import { useHomeArgs } from '@/hooks/useHomeArgs'

type Props = {
  className?: string
  priority?: boolean
  fetchPriority?: 'auto' | 'high' | 'low'
  comics: Comic[]
}

export const ComicList: React.FC<Props> = ({ className, priority, fetchPriority, comics }) => {
  const take = useHomeArgs()
  if (!take) return null

  return (
    <Slider
      className={clsx('flex p-4', className)}
      slidesToShow={take.comicsPerPage}
      slidesToScroll={take.comicsPerPage}
      lazyLoad='anticipated'
      arrows
    >
      {comics.map((comic) => (
        <ComicItem key={comic.slug} comic={comic} priority={priority} fetchPriority={fetchPriority} />
      ))}
    </Slider>
  )
}
