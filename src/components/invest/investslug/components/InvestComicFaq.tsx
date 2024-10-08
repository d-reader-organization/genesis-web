'use client'

import { useState, useRef, useEffect } from 'react'
import { PlusIcon, MinusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItemProps {
  section: string
  answer: string
  image?: string
}

interface FAQSectionProps {
  faqs: FAQItemProps[]
}

export const FaqSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  return (
    <section className='w-full flex flex-col justify-center align-center '>
      <div className='flex flex-col'>
        {faqs.map((faq, index) => (
          <FAQItem key={index} item={faq} isLast={index === faqs.length - 1} />
        ))}
      </div>
    </section>
  )
}

const FAQItem: React.FC<{ item: FAQItemProps; isLast?: boolean }> = ({ item, isLast }) => {
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
            className='transition-all duration-600 ease-in-out text-sm md:text-base font-medium leading-[140%]'
            style={{
              maxHeight: maxHeight,
              overflow: 'hidden',
              opacity: isExpanded || isCollapsing ? 1 : 0,
              transition: 'max-height 0.6s ease, opacity 0.3s ease',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {item.answer}
            {item.image && (
              <div className='mt-4'>
                <img src={item.image} alt={`${item.section} image`} className='w-full h-auto' />
              </div>
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
