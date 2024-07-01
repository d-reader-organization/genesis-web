import clsx from 'clsx'
import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import { Button, Text } from '../ui'
import Link from 'next/link'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string
  actionProps?: { title: string; href: string }
  show?: boolean
}

export const Section: React.FC<Props> = ({ title, className, children, actionProps, show = true, ...props }) => {
  return (
    <section className={clsx('relative mx-4', className)} {...props}>
      {title || actionProps ? (
        <div className='flex justify-between pb-2 overflow-x-hidden'>
          {title && (
            <Text as='h3' className='capitalize font-bold'>
              {title}
            </Text>
          )}
          {actionProps && (
            <Button asChild {...actionProps} variant='link'>
              <Link href={actionProps.href}>{actionProps.title}</Link>
            </Button>
          )}
        </div>
      ) : null}
      {children}

      {/* <div
        position='absolute'
        zIndex={-100}
        top={0}
        left={0}
        right={0}
        bottom={0}
        margin='auto'
        // width='100%'
        height={{
          xs: `calc(100% - ${60}px)`,
          sm: `calc(100% - ${80}px)`,
          md: `calc(100% - ${100}px)`,
          lg: `calc(100% - ${120}px)`,
        }}
        ref={ref}
      /> */}
    </section>
  )
}
