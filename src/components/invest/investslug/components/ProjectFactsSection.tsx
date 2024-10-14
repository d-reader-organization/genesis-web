'use client'

import { useState, useRef, useEffect } from 'react'
import { PlusIcon, MinusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type FactItemProps = {
  section: string
  answer: string
  image?: string
}

type ProjectFactsSectionProps = {
  facts: FactItemProps[]
}

export const ProjectFactsSection: React.FC<ProjectFactsSectionProps> = ({ facts }) => {
  return (
    <section className='w-full flex flex-col justify-center align-center '>
      <div className='flex flex-col'>
        {facts.map((fact, index) => (
          <FactItem key={index} item={fact} isLast={index === facts.length - 1} />
        ))}
      </div>
    </section>
  )
}

const FactItem: React.FC<{ item: FactItemProps; isLast?: boolean }> = ({ item, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState('0px')
  const [isCollapsing, setIsCollapsing] = useState(false)

  useEffect(() => {
    if (isExpanded) {
      setMaxHeight(contentRef.current?.scrollHeight + 'px')
    } else {
      setIsCollapsing(true)
      setMaxHeight(contentRef.current?.scrollHeight + 'px')
      setTimeout(() => {
        setMaxHeight('0px')
      }, 10)
    }
  }, [isExpanded])

  const handleTransitionEnd = () => {
    if (!isExpanded) {
      setIsCollapsing(false)
      setMaxHeight('0px')
    }
  }

  return (
    <div className={cn('border-t border-grey-300', isLast && 'border-b', isExpanded && 'border-b-0')}>
      <button
        className={cn(
          'flex justify-between items-center py-4 md:flex-row w-full text-left md:py-8 focus:outline-none',
          isExpanded ? 'flex-col' : ''
        )}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <h2
          className={cn(
            'flex items-start min-w-[90px] self-start text-white text-xl font-semibold leading-tight tracking-tight',
            isExpanded ? 'pb-2' : ''
          )}
        >
          {item.section}
        </h2>

        <div className='flex flex-col md:min-w-[300px] md:max-w-[600px] justify-center align-center w-full'>
          <div
            ref={contentRef}
            className='transition-all duration-200 ease-in-out text-sm md:text-base font-medium leading-[140%]'
            style={{
              maxHeight: maxHeight,
              overflow: 'hidden',
              opacity: isExpanded || isCollapsing ? 1 : 0,
              transition: 'max-height 0.6s ease, opacity 0.3s ease',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            <div className='flex flex-col justify-center items-center gap-4 relative w-full'>
              <p> {item.answer} </p>
              {item.image && (
                <Image
                  src={item.image}
                  alt={`${item.section} image`}
                  width={600}
                  height={400}
                  layout='responsive'
                  objectFit='cover'
                  className='w-full h-auto'
                />
              )}
            </div>
          </div>
        </div>
        <div className='flex h-auto min-w-[40px] md:min-w-[50px] self-start justify-end'>
          {isExpanded ? (
            <div className='flex flex-col max-md:hidden'>
              <MinusIcon className='size-6 text-gray-200 transition-transform duration-200 self-end' />
            </div>
          ) : (
            <PlusIcon className='size-6 text-gray-200 transition-transform duration-200 self-end' />
          )}
        </div>
      </button>
    </div>
  )
}