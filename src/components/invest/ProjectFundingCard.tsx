'use client'

import React from 'react'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import { ProjectFunding } from '@/models/project'
import { formatNumberWithCommas, formatUSD } from '@/utils/numbers'
import { Text } from '../ui'
import { cn } from '@/lib/utils'

type ProjectFundingCardProps = {
  funding: ProjectFunding
  className: string
}

export const ProjectFundingCard: React.FC<ProjectFundingCardProps> = ({ funding, className }) => {
  return (
    <div
      className={
        'flex flex-col p-2 gap-4 bg-grey-500 justify-between items-start shadow md:rounded-xl md:p-6 md:sticky md:top-[100px] md:max-w-[485px] md:min-w-[300px] md:h-[550px] md:gap-0 ' +
        className
      }
    >
      <div className='flex flex-col gap-4 w-full'>
        <Text
          as='p'
          styleVariant='body-normal'
          fontWeight='bold'
          className='text-white leading-snug max-md:text-sm max-md:font-medium max-md:leading-tight'
        >
          Overall project fund goal:
        </Text>
        <div className='relative h-[8px] rounded-[27px] w-full bg-[#44464d]'>
          <div
            className='h-[8px] bg-yellow-500 rounded-[27px] absolute top-0 left-0'
            style={{ width: `${(funding.pledgedAmount / funding.raiseGoal) * 100}%` }}
          />
        </div>
      </div>

      <div className='flex w-full max-md:justify-between md:flex-col items-start md:gap-[29px]'>
        <FundingStats
          text={'pledged of ' + formatUSD(funding.raiseGoal)}
          value={formatUSD(funding.pledgedAmount)}
          valueColor='text-yellow-500 '
          valueSizeMd='md:text-[32px] '
          className='max-md:hidden'
        />
        <FundingStats
          text={'of ' + formatUSD(funding.raiseGoal)}
          value={formatUSD(funding.pledgedAmount)}
          valueColor='text-yellow-500 '
          className='md:hidden items-center'
        />
        <FundingStats
          text='backers'
          value={formatNumberWithCommas(funding.numberOfBackers)}
          className='max-md:items-center'
        />
        <FundingStats
          text='days left'
          value={formatNumberWithCommas(funding.daysLeft)}
          className='max-md:items-center'
        />
      </div>

      <div className='flex flex-col w-full gap-2 md:gap-4'>
        <Link
          href={'placeholder'}
          className='flex flex-col w-full h-full max-h-[52px] p-[14px] justify-center items-center self-stretch text-grey-600 rounded-xl bg-yellow-500 hover:brightness-100 md:p-4'
        >
          <Text
            as='p'
            styleVariant='body-normal'
            fontWeight='bold'
            className='text-grey-600 leading-snug max-md:text-base'
          >
            Back this project
          </Text>
        </Link>

        <div className='flex flex-row w-full h-full justify-center items-center p-[12px] gap-[12px] bg-gradient-to-br from-[#4a4e53] to-grey-500 rounded-xl md:gap-4 md:h-[89px] md:p-4'>
          <div
            className='flex max-h-[54px] max-w-[54px] p-[10px] bg-white rounded-xl shadow border border-[#56a05e]'
            style={{ boxShadow: '0 0 15px rgba(86, 160, 94, 0.8)' }}
          >
            <TrendingUp color='green' size={20} />
          </div>
          <Text
            as='p'
            styleVariant='body-normal'
            fontWeight='medium'
            className='text-[#aeaeae] leading-tight max-md:text-sm'
          >
            Rewards will be distributed as creator completes milestones
          </Text>
        </div>
      </div>
    </div>
  )
}

type FundingStatsProps = {
  text: string
  value: number | string
  valueColor?: string
  valueSizeMd?: string
  textSizeMd?: string
} & React.HTMLAttributes<HTMLDivElement>

const FundingStats: React.FC<FundingStatsProps> = ({ text, value, valueColor = 'text-white', className }) => {
  return (
    <div className={cn('flex flex-col w-1/3 max-md:pt-[2px] md:w-full md:gap-1', className)}>
      <Text
        as='h3'
        styleVariant='primary'
        className={cn(
          'sm:text-20 max-md:text-20 max-md:leading-tight max-md:tracking-normal md:text-32 md:leading-8',
          valueColor
        )}
      >
        {value}
      </Text>
      <Text
        as='p'
        styleVariant='body-normal'
        fontWeight='medium'
        className={'text-grey-100 leading-none max-md:text-xs md:leading-snug'}
      >
        {text}
      </Text>
    </div>
  )
}
