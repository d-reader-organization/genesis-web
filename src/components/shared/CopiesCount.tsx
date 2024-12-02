import { pluralizeString } from '@/utils/helpers'
import { Text } from '../ui/Text'
import React from 'react'
import { cn } from '@/lib/utils'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  count?: number
  episodes?: boolean
}

export const CopiesCount: React.FC<Props> = ({ count, episodes = false, className }) => (
  <Text
    as='span'
    styleVariant='body-small'
    fontWeight='bold'
    className={cn('bg-white bg-opacity-20 rounded-2xl backdrop-blur-lg p-1 px-2', className)}
  >
    {count}
    {episodes ? ` ${pluralizeString('EP', count)}` : ''}
  </Text>
)
