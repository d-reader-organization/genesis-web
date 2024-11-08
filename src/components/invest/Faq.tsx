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
    answer: `Genesis is a crowdfunding portal which helps indie creators tokenize their Intellectual Property and distribute it to their desired audience. Genesis primarily works with comic creators, animation studios, game developers, and book writers that want to raise money to pursue their projects. 

Decentralized Reader LLC works with many of the same indie creators to distribute their comics once they have been produced. dReader is the platform responsible for distributing series like The Recruits, Tensorians, The Embers etc.`,
  },
  {
    question: 'Can I invest more than once?',
    answer:
      'You may invest as many times as you would like until you reach your investment limit under the crowdfunding regulations.',
  },
  {
    question: 'What are the legal implications?',
    answer:
      'We are currently exploring the legal framework for investing into Intellectual Properties. Currently, the platform DOES NOT OFFER INVESTMENT FEATURES. We only enable consumers to express interest to invest, but no investing or token issuance will take place until the legal framework has been established',
  },
  {
    question: 'Who are the creators on the platform?',
    answer: `On Genesis you can find various indie creators and web3 brands working on crowdfunding their IP. Some creators base their story on existing web3 brands, with or without their endorsement.
    `,
  },
  {
    question: 'What does contributing to the fundraise imply?',
    answer:
      "Currently, there are no implications to contributions since crowdfunding hasn't been enabled yet. The only active features on Genesis currently are discoverability and expressing interest to invest. People who express interest into stories are not committed to contributing.",
  },
  {
    question: 'Stories will be tokenized?',
    answer:
      'Indeed, stories will be tokenized. The goal is to enable creators to raise funds for their story and issue tokens which would act as a revenue share of their IP.',
  },
  {
    question: 'Where can I learn more?',
    answer: 'Best place to learn more about Genesis and dReader is on the links provided on the Footer of the app.',
  },
  {
    question: 'I want to raise funds for my story!',
    answer:
      "Connect with us!! Whether you're an animator, comic artist, or a writer - get in touch with us. Find us on any social media channels or email at support@dreader.io",
  },
]

export const FaqSection: React.FC = () => {
  return (
    <section className='w-full py-4 md:py-12 flex flex-col gap-4 md:gap-10 justify-start'>
      <Text as='h3' styleVariant='primary-heading'>
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
