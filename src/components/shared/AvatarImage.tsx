import React from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge'

export interface AvatarImageProps extends Omit<ImageProps, 'alt'> {
  size?: AvatarSize
  alt?: ImageProps['alt']
  className?: string
}

const sizeVariants: Record<AvatarSize, string> = {
  small: 'w-10 h-10',
  medium: 'w-12 h-12',
  large: 'w-14 h-14',
  xlarge: 'w-[123px] h-[123px]'
}

export const AvatarImage: React.FC<AvatarImageProps> = ({ size = 'medium', alt = '', className, ...props }) => {
  return (
    <Image
      alt={alt}
      width={123}
      height={123}
      className={cn('border-2 border-grey-500 bg-grey-600 rounded-full', sizeVariants[size], className)}
      {...props}
    />
  )
}
