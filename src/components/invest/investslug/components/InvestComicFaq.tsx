'use client'

import { useState, useRef } from 'react'
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
        {isExpanded ? (
          <>
            <div className='flex justfiy-center align-center w-[600px] transition-all duration-200 ease-in-out'>
              <div className='text-sm md:text-base font-medium leading-[140%]'>
                {item.answer}
                {item.image && (
                  <div className='mt-4'>
                    <img src={item.image} alt={`${item.section} image`} className='w-full h-auto' />
                  </div>
                )}
              </div>
            </div>
            <MinusIcon className='size-6 text-gray-200 transition-transform duration-200 self-start' />
          </>
        ) : (
          <PlusIcon className='size-6 text-gray-200 transition-transform duration-200 self-start' />
        )}
      </button>
      <div
        ref={contentRef}
        className='overflow-hidden transition-all duration-200 ease-in-out flex flex-col w-[60%] h-[450px] justify-center align-center'
        style={{
          maxHeight: isExpanded ? contentRef.current?.scrollHeight + 'px' : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
      ></div>
    </div>
  )
}
