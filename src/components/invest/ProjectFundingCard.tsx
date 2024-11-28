'use client'

import React from 'react'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import { ProjectFunding } from '@/models/project'
import { formatNumberWithCommas, formatUSD } from '@/utils/numbers'
import { differenceInDays } from 'date-fns'
import { Text } from '../ui'
import { cn, withRedirect } from '@/lib/utils'
import { useUserAuth } from '@/providers/UserAuthProvider'
import { RoutePath } from '@/enums/routePath'

type ProjectFundingCardProps = {
  funding: ProjectFunding
  slug: string
  className: string
}

export const ProjectFundingCard: React.FC<ProjectFundingCardProps> = ({ funding, slug, className }) => {
  const currentDate = new Date()
  const startedAt = funding.startDate ? new Date(funding.startDate) : undefined
  const hasFundingStarted = startedAt ? startedAt <= currentDate : false
  const hasFundingEnded = funding.pledgedAmount >= funding.raiseGoal
  const daysLeft = funding.endDate ? differenceInDays(new Date(funding.endDate), currentDate) : undefined

  return (
    <div
      className={
        'flex flex-col p-2 gap-4 bg-grey-500 justify-between items-start shadow md:rounded-xl md:p-6 md:sticky md:top-[100px] md:max-w-[485px] md:min-w-[300px] md:max-h-[550px] md:gap-6 ' +
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
            className='h-[8px] bg-green-genesis rounded-[27px] absolute top-0 left-0'
            style={{ width: `${(funding.pledgedAmount / funding.raiseGoal) * 100}%` }}
          />
        </div>
      </div>

      <div className='flex w-full max-md:justify-between md:flex-col items-start md:gap-[29px]'>
        <FundingStats
          text={'pledged of ' + formatUSD(funding.raiseGoal)}
          value={formatUSD(funding.pledgedAmount)}
          valueColor='text-green-genesis '
          valueSizeMd='md:text-[32px] '
          className='max-md:hidden'
        />
        <FundingStats
          text={'of ' + formatUSD(funding.raiseGoal)}
          value={formatUSD(funding.pledgedAmount)}
          valueColor='text-green-genesis '
          className='md:hidden items-center'
        />
        {hasFundingStarted ? (
          <FundingStats
            text='backers'
            value={formatNumberWithCommas(funding.numberOfBackers)}
            className='max-md:items-center'
          />
        ) : (
          <FundingStats
            text='expressed interest'
            value={formatNumberWithCommas(funding.numberOfInterestedInvestors) + ' investors'}
            className='max-md:items-center'
          />
        )}
        {daysLeft !== undefined && (
          <FundingStats text='days left' value={formatNumberWithCommas(daysLeft)} className='max-md:items-center' />
        )}
      </div>

      <div className='flex flex-col w-full gap-2 md:gap-4'>
        {hasFundingStarted ? (
          hasFundingEnded ? (
            <FundingEndedButton />
          ) : (
            <InvestButton slug={slug} />
          )
        ) : (
          <ExpressInterestButton slug={slug} isUserInterested={funding.isUserInterested} />
        )}

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
            className='text-grey-100 leading-tight max-md:text-sm'
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
        styleVariant='primary-heading'
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
        className='text-grey-100 leading-none max-md:text-xs md:leading-snug'
      >
        {text}
      </Text>
    </div>
  )
}

const FundingEndedButton: React.FC = () => {
  return (
    <Link
      href='#'
      className='flex flex-col w-full h-full max-h-[52px] p-[14px] justify-center items-center self-stretch text-grey-600 rounded-xl bg-green-genesis hover:brightness-100 md:p-4'
    >
      <Text as='p' styleVariant='body-normal' fontWeight='bold' className='text-grey-600 leading-snug max-md:text-base'>
        Fully backed
      </Text>
    </Link>
  )
}

type InvestButtonProps = {
  slug: string
}

const InvestButton: React.FC<InvestButtonProps> = ({ slug }) => {
  const { isAuthenticated } = useUserAuth()
  const href = isAuthenticated ? RoutePath.InvestCheckout(slug) : withRedirect(RoutePath.InvestCheckout(slug))

  return (
    <Link
      href={href}
      className='flex flex-col w-full h-full max-h-[52px] p-[14px] justify-center items-center self-stretch text-grey-600 rounded-xl bg-green-genesis hover:brightness-100 md:p-4'
    >
      <Text as='p' styleVariant='body-normal' fontWeight='bold' className='text-grey-600 leading-snug max-md:text-base'>
        Back this project
      </Text>
    </Link>
  )
}

type ExpressInterestButtonProps = {
  slug: string
  isUserInterested?: boolean
}

const ExpressInterestButton: React.FC<ExpressInterestButtonProps> = ({ slug, isUserInterested }) => {
  const { isAuthenticated } = useUserAuth()
  const href = isAuthenticated
    ? RoutePath.ExpressInterest(slug)
    : withRedirect(RoutePath.Login, RoutePath.ExpressInterest(slug))

  return (
    <Link
      href={href}
      className={`flex flex-col w-full h-full max-h-[52px] p-[14px] justify-center items-center self-stretch rounded-xl md:p-4 ${isUserInterested ? 'bg-grey-500 border-2 border-white pointer-events-none' : 'bg-green-genesis hover:brightness-100'}`}
    >
      <Text
        as='p'
        styleVariant='body-normal'
        fontWeight='bold'
        className={`${isUserInterested ? 'text-white' : 'text-grey-600'} leading-snug max-md:text-base`}
      >
        {isUserInterested ? 'Interested!' : 'Express interest'}
      </Text>
    </Link>
  )
}
