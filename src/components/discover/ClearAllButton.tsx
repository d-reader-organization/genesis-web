import React from 'react'
import { Button, Text } from '@/components/ui'
import { useDiscoverQueryStore } from '@/providers/DiscoverQueryStoreProvider'
import { cn } from '@/lib/utils'

interface ClearAllButtonProps {
  className?: string
}

export const ClearAllButton: React.FC<ClearAllButtonProps> = ({ className }) => {
  const clearAll = useDiscoverQueryStore((state) => state.resetToDefaultInitState)

  return (
    <Button onClick={clearAll} variant='secondary' size='md' className={cn('min-w-[100px]', className)}>
      <Text as='span' styleVariant='body-small'>
        Clear all
      </Text>
    </Button>
  )
}
