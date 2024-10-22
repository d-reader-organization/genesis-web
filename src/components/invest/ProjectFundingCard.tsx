'use client'

import React from 'react'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import { ProjectFunding } from '@/models/project'
import { formatNumberWithCommas, formatUSD } from '@/utils/numbers'

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
      <div className='flex flex-col gap-4 w-full md:pb-2'>
        <p className='text-white text-base font-bold leading-snug'>Overall project fund goal:</p>
        <div className='relative h-[8px] rounded-[27px] w-full bg-[#44464d]'>
          <div
            className='h-[8px] bg-[#fceb54] rounded-[27px] absolute top-0 left-0'
            style={{ width: `${(funding.pledgedAmount / funding.raiseGoal) * 100}%` }}
          />
        </div>
      </div>

      <div className='flex w-full max-md:justify-between md:flex-col items-start md:gap-6 md:pb-2'>
        <FundingStats
          text={'pledged of ' + formatUSD(funding.raiseGoal)}
          value={formatUSD(funding.pledgedAmount)}
          valueColor='text-[#fceb54] '
          valueSizeMd='md:text-[32px] '
          className='max-md:hidden'
        />
        <FundingStats
          text={'of ' + formatUSD(funding.raiseGoal)}
          value={formatUSD(funding.pledgedAmount)}
          valueColor='text-[#fceb54] '
          className='md:hidden items-center'
        />
        <FundingStats text='backers' value={formatNumberWithCommas(funding.numberOfBackers)} className='max-md:items-center'/>
        <FundingStats text='days left' value={formatNumberWithCommas(funding.daysLeft)} className='max-md:items-center'/>
      </div>

      <div className='flex flex-col w-full gap-2 md:gap-4'>
        <Link
          href={'placeholder'}
          className='flex flex-col w-full h-full max-h-[52px] p-[14px] justify-center items-center self-stretch text-[#15171c] rounded-xl bg-[#fceb54] hover:brightness-100 md:p-4'
        >
          <p className='text-[#15171c] text-base font-bold leading-snug'>Back this project</p>
        </Link>

        <div className='flex flex-row w-full h-full justify-center items-center p-[12px] gap-[12px] bg-gradient-to-br from-[#4a4e53] to-[#1f222a] rounded-xl md:gap-4 md:h-[74px] md:p-4'>
          <div
            className='flex max-h-[54px] max-w-[54px] p-[10px] bg-white rounded-xl shadow border border-[#56a05e]'
            style={{ boxShadow: '0 0 15px rgba(86, 160, 94, 0.8)' }}
          >
            <TrendingUp color='green' size={20} />
          </div>
          <p className='text-[#aeaeae] text-base font-medium leading-tight'>
            Rewards will be distributed as creator completes milestones
          </p>
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
  className?: string
}

const FundingStats: React.FC<FundingStatsProps> = ({ text, value, valueColor = 'text-white ', className = '' }) => {
  return (
    <div className={'flex flex-col w-1/3 md:w-full md:gap-1 ' + className}>
      <h2
        className={
          'font-semibold text-xl leading-tight tracking-tight md:text-[32px] md:leading-none md:tracking-tighter ' +
          valueColor
        }
      >
        {value}
      </h2>
      <p
        className={
          'text-[#c2c5ce] text-xs font-medium leading-normal tracking-normal md:text-base md:leading-relaxed md:tracking-wide'
        }
      >
        {text}
      </p>
    </div>
  )
}
