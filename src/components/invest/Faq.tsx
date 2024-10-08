'use client'

import { useState, useRef } from 'react'
import { PlusIcon, MinusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy for all unused items in their original packaging. Please contact our customer service team to initiate a return.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Shipping times vary depending on your location. Typically, domestic orders are delivered within 3-5 business days, while international orders may take 7-14 business days.',
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Yes, we ship to most countries worldwide. Shipping costs and delivery times may vary depending on the destination.',
  },
  {
    question: 'How can I track my order?',
    answer:
      "Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this number to track your package on our website or the carrier's site.",
  },
]

export const FaqSection: React.FC = () => {
  return (
    <section className='w-full py-4 md:py-12 flex flex-col gap-4 md:gap-10 justify-start'>
      <h1 className='text-xl md:text-[32px] font-semibold leading-[20px] md:leading-[32px] tracking-[0.04px] md:tracking-[0.064px]'>
        Frequently Asked Questions
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-10'>
        {faqs.map((faq, index) => (
          <FAQItem key={index} item={faq} />
        ))}
      </div>
    </section>
  )
}

const FAQItem: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className={cn('border-t border-grey-300', isExpanded && 'border-b-0')}>
      <button
        className='flex justify-between items-center w-full text-left py-8 focus:outline-none'
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <p className='text-base md:text-2xl font-bold'>{item.question}</p>
        {isExpanded ? (
          <MinusIcon className='size-6 text-gray-200 transition-transform duration-200' />
        ) : (
          <PlusIcon className='size-6 text-gray-200 transition-transform duration-200' />
        )}
      </button>
      <div
        ref={contentRef}
        className='overflow-hidden transition-all duration-200 ease-in-out'
        style={{
          maxHeight: isExpanded ? contentRef.current?.scrollHeight + 'px' : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className='text-sm md:text-base font-medium leading-[140%] pb-4'>{item.answer}</div>
      </div>
    </div>
  )
}
