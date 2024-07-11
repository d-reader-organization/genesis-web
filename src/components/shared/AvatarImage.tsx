import { ImageProps } from 'next/image'
import Image from 'next/image'
import clsx from 'clsx'

interface Props extends Omit<ImageProps, 'alt'> {
  size: number
  alt?: ImageProps['alt']
}

export const AvatarImage: React.FC<Props> = ({ size = 40, className, alt = '', ...props }) => {
  return (
    <Image
      alt={alt}
      width={size}
      height={size}
      className={clsx('border-2 border-grey-500 bg-grey-600 rounded-full', className)}
      {...props}
    />
  )
}
