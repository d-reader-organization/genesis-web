'use client'

import { ComicIssueItem } from './ComicIssueItem'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import clsx from 'clsx'
import { ComicIssue } from '@/models/comicIssue'
import { useHomeArgs } from '@/hooks/useHomeArgs'

interface Props {
  className?: string
  comicIssues: ComicIssue[]
}

export const ComicIssueList: React.FC<Props> = ({ className, comicIssues }) => {
  const take = useHomeArgs()
  if (!take) return null

  return (
    <Slider
      className={clsx('flex p-4', className)}
      slidesToShow={take.comicIssuesPerPage}
      slidesToScroll={take.comicIssuesPerPage}
      lazyLoad='anticipated'
    >
      {comicIssues.map((issue) => (
        <ComicIssueItem key={issue.id} comicIssue={issue} />
      ))}
    </Slider>
  )
}
