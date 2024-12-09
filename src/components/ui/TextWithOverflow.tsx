'use client'

import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  text: string
}
export const TextWithOverflow: React.FC<Props> = ({ text, className }) => {
  const textRef = useRef<HTMLSpanElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  const handleMouseEnter = () => {
    if (textRef.current) {
      const isTextOverflowing = textRef.current.offsetWidth < textRef.current.scrollWidth
      setIsOverflowing(isTextOverflowing)
    }
  }

  // TODO: use this component on ComicIssue, Comic, and Creator cards (comic.title etc.)

  return (
    <div className='relative inline-block'>
      <span
        ref={textRef}
        className={cn('line-clamp-1 overflow-ellipsis whitespace-nowrap block', className)}
        onMouseEnter={handleMouseEnter}
        title={isOverflowing ? text : ''}
      >
        {text}
      </span>
    </div>
  )
}
