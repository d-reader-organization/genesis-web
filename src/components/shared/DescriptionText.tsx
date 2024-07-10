import clsx from 'clsx'
import React from 'react'

type Props = {
  text: string
} & React.HTMLAttributes<HTMLParagraphElement>

export const DescriptionText: React.FC<Props> = ({ className, text }) => (
  <p className={clsx('text-sm text-grey-100 leading-4', className)}>{text}</p>
)
