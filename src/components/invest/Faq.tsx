'use client'

import { useState, useRef } from 'react'
import { PlusIcon, MinusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Text } from '../ui'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Are dReader and Genesis the same company?',
    answer: `Genesis is a crowdfunding portal which helps indie creators tokenize their Intellectual Property and distribute it to their desired audience. They primarily work with comic creators, game developers, and book writers that want to raise money to pursue their projects. 

Decentralized Reader LLC works with many of the same indie creators to distribute their comics once they have been produced. dReader is the platform responsible for distributing shows like The Recruits, Tensorians, The Embers etc.`,
  },
  {
    question: 'Can I invest more than once?',
    answer:
      'You may invest as many times as you would like until you reach your investment limit under the crowdfunding regulations.',
  },
  {
    question: "Can I invest if I'm not a U.S. citizen?",
    answer: 'TODO. Currently drafting up this answer with our lawyer office',
  },
  {
    question: 'Is the content on this website real?',
    answer: `No, this is just a dummy demo app. Nothing shown on this web does not imply partnership with entities used as a mock reference.
    
    Legal framework off the app will be resolved in the coming weeks & months. Final approach to adding "IP investment" features is yet to be determined.`,
  },
  {
    question: 'What does contributing to the fundraise campaign imply?',
    answer: 'TODO. Currently drafting up this answer with our lawyer office',
  },
  {
    question: 'Where can I learn more?',
    answer: 'TODO. Add a linktree',
  },
]

export const FaqSection: React.FC = () => {
  return (
    <section className='w-full py-4 md:py-12 flex flex-col gap-4 md:gap-10 justify-start'>
      <Text as='h3' styleVariant='primary'>
        Frequently Asked Questions
      </Text>
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
        <div className='text-sm md:text-base font-medium leading-[140%] pb-4' style={{ whiteSpace: 'pre-wrap' }}>
          {item.answer}
        </div>
      </div>
    </div>
  )
}
