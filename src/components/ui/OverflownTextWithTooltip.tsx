'use client'

import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type EllipsisTextProps = {
  text: string // The text content
  className?: string // Additional className for styling the text
  tooltipClassName?: string // Additional className for the tooltip
}

// Shows tooltip above overflown text on hover
export const OverflownTextWithTooltip: React.FC<EllipsisTextProps> = ({ text, className, tooltipClassName }) => {
  const textRef = useRef<HTMLSpanElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)

  const handleMouseEnter = () => {
    if (textRef.current) {
      const isTextOverflowing = textRef.current.offsetWidth < textRef.current.scrollWidth
      setIsOverflowing(isTextOverflowing)
    }
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <div className='relative inline-block'>
      <span
        ref={textRef}
        className={cn('line-clamp-1 overflow-ellipsis whitespace-nowrap block', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title={!isOverflowing ? text : ''}
      >
        {text}
      </span>
      {isHovering && isOverflowing && (
        <div
          className={cn(
            'absolute bottom-full mb-1 -left-5 translate-x-10 bg-white text-black text-sm p-2 border border-gray-400 rounded-xl shadow-md z-10',
            tooltipClassName
          )}
        >
          {text}
        </div>
      )}
    </div>
  )
}