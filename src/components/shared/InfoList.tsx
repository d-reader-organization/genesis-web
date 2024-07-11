import clsx from 'clsx'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  orientation: 'horizontal' | 'vertical'
}

export const InfoList: React.FC<Props> = ({ orientation = 'vertical', className, children, ...props }) => {
  return (
    <div
      className={clsx(
        'rounded-lg border border-grey-100 h-min p-0',
        orientation === 'vertical'
          ? 'flex flex-col [&>*]:p-4 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-grey-100'
          : '[&>*]:p-2 [&>*:not(:last-child)]:border-r [&>*:not(:last-child)]:border-grey-100',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
