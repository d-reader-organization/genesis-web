'use client'

import React, { DetailedHTMLProps, HTMLAttributes, useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'

import ArrowDownIcon from 'public/assets/vector-icons/arrow-down-2.svg'
import useEventListener from '@/hooks/useEventListener'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string
  titleComponent?: React.ReactNode
  children?: React.ReactNode
  open?: boolean
  hideArrow?: boolean
}

export const Expandable: React.FC<Props> = ({
  title,
  titleComponent,
  open = false,
  children,
  hideArrow = false,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(open)
  const [contentHeight, setContentHeight] = useState(0)
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null)

  const handleContentHeightChange = useCallback(() => {
    if (!contentRef) return 0

    setContentHeight(
      contentRef.clientHeight +
        +contentRef.style.getPropertyValue('padding-top').split('px')[0] +
        +contentRef.style.getPropertyValue('padding-bottom').split('px')[0]
    )
  }, [contentRef])

  useEffect(() => {
    handleContentHeightChange()
  }, [handleContentHeightChange])
  useEventListener('resize', handleContentHeightChange)

  return (
    <div
      className='w-full max-w-[912px] bg-grey-600 border-t border-t-grey-300 border-b border-b-grey-300 sm:border-l sm:border-l-grey-300 sm:border-r sm:border-r-grey-300 sm:rounded-lg sm:mb-3'
      {...props}
    >
      <div
        className='flex justify-between items-center w-full p-3 font-bold text-base leading-5 cursor-pointer'
        onClick={() => setIsExpanded((currentIsExpanded) => !currentIsExpanded)}
      >
        {titleComponent ?? title}
        {hideArrow ? null : (
          <ArrowDownIcon
            className={clsx('transition transform duration-150 ease-in-out', {
              'transform -rotate-180': isExpanded,
            })}
          />
        )}
      </div>
      <div
        className={clsx('w-full h-0 transition-height ease-in-out overflow-hidden', {
          'h-[var(--content-height)]': isExpanded,
        })}
        style={{ '--content-height': `${contentHeight}px` } as React.CSSProperties}
      >
        <div ref={(contentRef) => setContentRef(contentRef)} className='border-t border-t-grey-400 p-3'>
          {children}
        </div>
      </div>
    </div>
  )
}
