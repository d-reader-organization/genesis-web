'use client'

import React, { useState } from 'react'
import { Text, TextProps } from './Text'
import { Button } from './Button'

interface Props extends TextProps {
  maxLength?: number
}

export const ViewMoreText: React.FC<Props> = ({ maxLength = 150, children, ...props }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const text = children?.toString() ?? ''

  if (text.length <= maxLength) {
    return (
      <Text {...props}>
        {text}
      </Text>
    )
  }

  const displayText = isExpanded ? text : text.slice(0, maxLength) + '...'

  return (
    <Text {...props}>
      {displayText}
      {!isExpanded && (
        <Button
          variant='ghost'
          onClick={() => setIsExpanded(true)}
          className='ml-2 w-fit text-white underline sm:py-0 sm:px-0 min-w-fit'
        >
          <Text {...props} className='text-white underline'>
            view more
          </Text>
        </Button>
      )}
      {isExpanded && (
        <Button
          variant='ghost'
          onClick={() => setIsExpanded(false)}
          className='ml-2 w-fit text-white underline sm:py-0 sm:px-0 min-w-fit'
        >
          <Text {...props} className='text-white underline'>
            view less
          </Text>
        </Button>
      )}
    </Text>
  )
}
