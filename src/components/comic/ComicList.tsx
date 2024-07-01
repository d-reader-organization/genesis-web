'use client'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ComicItem from './ComicItem'
import Slider from 'react-slick'
import clsx from 'clsx'
import { Comic } from '@/models/comic'
import { useBreakpoints } from '@/hooks/useBreakpoints'
import { useMemo } from 'react'

type Props = {
  className?: string
  priority?: boolean
  fetchPriority?: 'auto' | 'high' | 'low'
  comics: Comic[]
}

const ComicList: React.FC<Props> = ({ className, priority, fetchPriority, comics }) => {
  const { xl, lg, md, sm, xs } = useBreakpoints()
  const take = useMemo(() => {
    if (xl) return { comics: 18, comicsPerPage: 6, comicIssues: 18, comicIssuesPerPage: 6, creators: 8 }
    else if (lg) return { comics: 18, comicsPerPage: 6, comicIssues: 18, comicIssuesPerPage: 6, creators: 4 }
    else if (md) return { comics: 15, comicsPerPage: 5, comicIssues: 15, comicIssuesPerPage: 5, creators: 4 }
    else if (sm) return { comics: 12, comicsPerPage: 4, comicIssues: 12, comicIssuesPerPage: 4, creators: 4 }
    else if (xs) return { comics: 12, comicsPerPage: 2, comicIssues: 12, comicIssuesPerPage: 2, creators: 3 }
    else return undefined
  }, [xl, lg, md, sm, xs])

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

export default ComicList
