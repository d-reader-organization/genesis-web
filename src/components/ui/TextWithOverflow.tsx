'use client'

import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type EllipsisTextProps = React.HTMLAttributes<HTMLDivElement> & {
  text: string // The text content
}

export const TextWithOverflow: React.FC<EllipsisTextProps> = ({ text, className }) => {
  const textRef = useRef<HTMLSpanElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  const handleMouseEnter = () => {
    if (textRef.current) {
      const isTextOverflowing = textRef.current.offsetWidth < textRef.current.scrollWidth
      setIsOverflowing(isTextOverflowing)
    }
    //setIsHovering(true)
  }

  const handleMouseLeave = () => {
    //setIsHovering(false)
  }

  return (
    <div className='relative inline-block'>
      <span
        ref={textRef}
        className={cn('line-clamp-1 overflow-ellipsis whitespace-nowrap block', className)}
        onMouseEnter={handleMouseEnter}
        //onMouseLeave={handleMouseLeave}
        title={isOverflowing ? text : ''}
      >
        {text}
      </span>
    </div>
  )
}

// 'use client'

// import React, { useRef, useState } from 'react'
// import { cn } from '@/lib/utils'
// import { Text, TextProps } from './Text'

// type EllipsisTextProps =  {
//   text: string // The text content
//   className?: string // Additional className for styling the text
//   tooltipClassName?: string // Additional className for the tooltip
// }

// // Shows tooltip above overflown text on hover
// export const TextWithOverflow: React.FC<EllipsisTextProps> = ({ text, className, tooltipClassName }) => {
//   const textRef = useRef<HTMLSpanElement>(null)
//   const [isHovering, setIsHovering] = useState(false)
//   const [isOverflowing, setIsOverflowing] = useState(false)

//   const handleMouseEnter = () => {
//     if (textRef.current) {
//       const isTextOverflowing = textRef.current.offsetWidth < textRef.current.scrollWidth
//       setIsOverflowing(isTextOverflowing)
//     }
//     setIsHovering(true)
//   }

//   const handleMouseLeave = () => {
//     setIsHovering(false)
//   }

//   return (
//     // <div className='relative inline-block'>
//       <Text as='span' styleVariant=''
//         ref={textRef}
//         className={cn('line-clamp-1 overflow-ellipsis whitespace-nowrap block', className)}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         title={isOverflowing ? text : ''}
//       >
//         {text}
//       </Text>

//     // </div>
//   )
// }
