'use client'

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { TrendingUp } from 'lucide-react'

function formatNumberWithCommas(num: number): string {
  return num.toLocaleString()
}

type ProjectFundingProps = {
  info: FundingDetails
  className: string
}

type FundingDetails = {
  pledgedAmount: number
  raiseGoal: number
  numberOfBackers: number
  daysLeft: number
}

export const ProjectFunding: React.FC<ProjectFundingProps> = ({ info, className }) => {
  return (
    <div
      className={
        'flex flex-col p-2 gap-4 bg-grey-500 justify-between items-start shadow md:rounded-xl md:p-6 md:sticky md:top-[100px] md:max-w-[485px] md:min-w-[300px] md:h-[550px] ' +
        className
      }
    >
      <div className='flex flex-col gap-4 w-full md:pb-2'>
        <p className='text-white text-base font-bold leading-snug'>Overall project fund goal:</p>
        <div className='relative h-[8px] rounded-[27px] w-full bg-[#44464d]'>
          <div
            className='h-[8px] bg-[#fceb54] rounded-[27px] absolute top-0 left-0'
            style={{ width: `${(info.pledgedAmount / info.raiseGoal) * 100}%` }}
          />
        </div>
      </div>

      <div className='flex flex-row w-full py-1 items-center justify-between md:flex-col md:justify-center md:items-start md:gap-[1.6rem] md:py-3'>
        <div className='flex flex-col min-w-[95px] items-start md:w-full md:gap-1'>
          <h2 className='text-[#fceb54] font-semibold text-xl leading-tight tracking-tight md:text-[32px] md:leading-none md:tracking-tight'>
            ${formatNumberWithCommas(info.pledgedAmount)}
          </h2>
          <p className='max-md:hidden text-[#c2c5ce] text-xs font-medium md:text-base md:leading-relaxed'>
            pledged of ${formatNumberWithCommas(info.raiseGoal)}
          </p>
          <p className='md:hidden text-[#c2c5ce] text-xs font-medium md:text-base md:leading-relaxed'>
            of ${formatNumberWithCommas(info.raiseGoal)}
          </p>
        </div>

        <div className='flex flex-col min-w-[65px] items-center md:w-full md:gap-1 md:items-start'>
          <h2 className='text-white font-semibold text-xl leading-tight tracking-tight md:text-[32px] md:leading-none md:tracking-tight'>
            {formatNumberWithCommas(info.numberOfBackers)}
          </h2>
          <p className='text-[#c2c5ce] text-xs font-medium leading-normal tracking-normal md:text-base md:leading-relaxed'>
            backers
          </p>
        </div>

        <div className='flex flex-col min-w-[95px] items-start px-6 md:w-full md:gap-1 md:px-0'>
          <h2 className='text-white font-semibold text-xl leading-tight tracking-tight md:text-[32px] md:leading-none md:tracking-tight'>
            {info.daysLeft}
          </h2>
          <p className='text-[#c2c5ce] text-xs font-medium leading-normal tracking-normal md:text-base md:leading-relaxed'>
            days left
          </p>
        </div>
      </div>

      <Link
        href={'placeholder'}
        className='flex flex-col w-full h-full max-h-[52px] p-4 justify-center items-center self-stretch text-[#15171c] rounded-xl bg-[#fceb54] hover:brightness-100'
      >
        <p className='text-[#15171c] text-base font-bold leading-snug'>Back this project</p>
      </Link>

      <div className='flex flex-row w-full h-full justify-center items-center p-[12px] bg-gradient-to-br from-[#4a4e53] to-[#1f222a] rounded-xl gap-[14px] md:max-h-[104px]'>
        <div
          className='flex max-h-[54px] max-w-[54px] p-[10px] bg-white rounded-xl shadow border border-[#56a05e]'
          style={{ boxShadow: '0 0 15px rgba(86, 160, 94, 0.8)' }}
        >
          <TrendingUp color='green' size={20} />
        </div>
        <p className='text-[#aeaeae] text-base font-medium leading-snug'>
          Rewards will be distributed as creator completes milestones
        </p>
      </div>
    </div>
  )
}
