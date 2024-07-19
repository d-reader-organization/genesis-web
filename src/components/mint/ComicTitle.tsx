import React from 'react'
import { Text } from '@/components/ui'

type Props = {
  title: string
}

export const MintComicTitle: React.FC<Props> = ({ title }) => <Text as='h1'>{title}</Text>
