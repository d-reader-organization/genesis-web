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
        className='flex justify-between items-center w-full text-left py-8 focus:outline-none'
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="w-[85px] text-white text-xl font-semibold font-['Obviously Narrow'] leading-tight tracking-tight self-start">
          {item.section}
        </div>

        <div className='flex justify-center align-center w-[600px]'>
          <div
            ref={contentRef}
            className='gap-4 transition-all duration-600 ease-in-out text-sm md:text-base font-medium leading-[140%]'
            style={{
              maxHeight: maxHeight,
              overflow: 'hidden',
              opacity: isExpanded || isCollapsing ? 1 : 0,
              transition: 'max-height 0.6s ease, opacity 0.3s ease',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            <p> {item.answer} </p>
            {item.image && (
              <Image
                src={item.image}
                alt={`${item.section} image`}
                width={500}
                height={300}
                layout='responsive'
                objectFit='cover'
                className='w-full h-auto'
              />
            )}
          </div>
        </div>
        {isExpanded ? (
          <MinusIcon className='size-6 text-gray-200 transition-transform duration-200 self-start' />
        ) : (
          <PlusIcon className='size-6 text-gray-200 transition-transform duration-200 self-start' />
        )}
      </button>
    </div>
  )
}
