'use client'

import { cn } from '@/lib/utils'
import { Genre } from '@/models/genre-new'
import { ChevronDown } from 'lucide-react'
import React from 'react'
import { Text } from '@/components/ui'

type FilterTypeProps = {
  filter: Genre[] | undefined
  filterLabel: string
  selectedTags: string[] | undefined
  updateSelectedTags: (genreSlugs: string[]) => void
}

export const FilterType: React.FC<FilterTypeProps> = ({ filter, filterLabel, selectedTags, updateSelectedTags }) => {
  const [isExpanded, setIsExpanded] = React.useState(true)
  const contentRef = React.useRef<HTMLDivElement>(null)
  
  const handleTagClick = (tag: string) => {
    switch (true) {
      case !selectedTags:
        selectedTags = [tag]
        break
      case selectedTags?.includes(tag):
        selectedTags = selectedTags.filter((t) => t !== tag)
        break
      default:
        selectedTags = [...selectedTags, tag]
    }
    updateSelectedTags(selectedTags)
  }

  return (
    <div className={cn('border-t border-grey-300', isExpanded && 'border-b-0 pb-4')}>
      <button
        className='flex justify-between items-center w-full text-left py-4 focus:outline-none'
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <Text as='p' styleVariant='body-large'>
          {filterLabel}
        </Text>
        <ChevronDown size={19} />
      </button>
      <div
        ref={contentRef}
        className={cn('overflow-hidden transition-all duration-200 ease-in-out')}
        style={{
          maxHeight: isExpanded ? contentRef.current?.scrollHeight + 'px' : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className='flex flex-wrap gap-2'>
          {filter?.map((tag, index) => (
            <div
              className={cn(
                'flex justify-center items-center max-h-8 p-2 rounded-lg cursor-pointer',
                selectedTags?.includes(tag.slug) ? 'bg-white text-black' : 'bg-grey-500 text-grey-100'
              )}
              key={`${tag.slug}-${index}`}
              onClick={() => handleTagClick(tag.slug)}
            >
              <Text as='p' styleVariant='body-xsmall'>
                {tag.name}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
