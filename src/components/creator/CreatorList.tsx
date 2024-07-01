'use client'

import { CreatorItem } from './CreatorItem'
import { Creator } from '@/models/creator'
import { AnimatedGridItem } from '../ui/AnimatedGrid'
import { useHomeArgs } from '@/hooks/useHomeArgs'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  animate: boolean
  creators: Creator[]
}

export const CreatorList: React.FC<Props> = ({ animate, className, creators, ...props }) => {
  const take = useHomeArgs()
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 p-4 gap-4'>
      {creators.slice(0, take?.creators).map((creator, i) => (
        <AnimatedGridItem className='flex' key={creator.slug} animate={animate} itemOrder={i}>
          <CreatorItem creator={creator} />
        </AnimatedGridItem>
      ))}
    </div>
  )
}
