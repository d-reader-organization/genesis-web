import React from 'react'
import Image from 'next/image'
import { InfoIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip'

function formatNumberWithCommas(num: number): string {
  return num.toLocaleString()
}

type ProjectFundingProps = {
  title: string
  payoutInfo: PayoutDetails
  logo: string
  raiseGoal: number
  numberOfBackers: number
  className: string
}

type PayoutDetails = {
  roiPercentage: number
  daysForRoi: number
  description: string
}

const payoutDetails: string =
  '*Previous payouts are not indicative of future results, and no representation is made that any investment will or is likely to achieve profits or losses similar to those discussed on this website. All investments involve risks, and the value of investments may fluctuate over time.'

export const ProjectPayoutCard: React.FC<ProjectFundingProps> = ({
  title,
  payoutInfo,
  logo,
  raiseGoal,
  numberOfBackers,
  className,
}) => {
  const tooltipText: string = 'text'

  return (
    <div
      className={
        'flex flex-col p-2 gap-4 bg-grey-500 justify-between items-center shadow md:rounded-xl md:p-5 md:sticky md:top-[100px] md:max-w-[485px] md:min-w-[350px] md:h-[550px] md:gap-3 ' +
        className
      }
    >
      <div className='flex flex-col w-full items-start md:items-center gap-4'>
        <h2 className='flex justify-center text-2xl md:text-3xl font-semibold max-md:pl-1'>
          Payout Details
          <span className='text-sm font-semibold align-top ml-1'>*</span>
        </h2>
        <div className='flex max-md:hidden items-center max-h-[101.05px] h-full md:pt-2'>
          <Image
            alt={title + ' Logo'}
            src={logo}
            className='max-w-[210px] max-h-[101.05px] object-cover'
            width={215}
            height={101.05}
          />
        </div>
      </div>

      <div className='flex flex-col gap-5 w-full'>
        <RoiWidget roi={payoutInfo.roiPercentage} tooltipText={tooltipText} />
        <div className='flex w-full justify-center items-center'>
          <InvestmentStatsBox title='RAISED' value={raiseGoal} currency={true}/>
          <InvestmentStatsBox title='DAYS FOR ROI' value={payoutInfo.daysForRoi} currency={false}/>
          <InvestmentStatsBox title='BACKERS' value={numberOfBackers} currency={false}/>
        </div>
      </div>
      <div className='flex flex-col pt-1'>
        <div className='flex w-full flex-col justify-center items-center text-[#AFB3BC] rounded-xl bg-grey-400 py-3 max-h-[36px] md:max-h-[42px]'>
          <p className='text-xs md:text-base font-medium leading-normal md:leading-[22.4px]'>
            Licencing Participation Agreement
          </p>
        </div>
        <p className='text-xs md:text-[14px] pt-1 font-base leading-normal md:leading-[22.4px] md:pt-2 md:px-2'>
          {payoutDetails}
        </p>
      </div>
    </div>
  )
}

const RoiWidget: React.FC<{ roi: number; tooltipText: string }> = ({ roi, tooltipText }) => (
  <div className='flex w-full md:justify-around items-center py-3 bg-grey-600 rounded-xl max-h-[60px] md:max-h-[56px]'>
    <p className='flex w-1/3 items-center justify-center text-base md:text-[28px] font-bold leading:[22.4px] md:leading-8'>
      {roi}%
    </p>
    <p className='flex w-1/3 text-center items-center justify-center text-[10px] md:text-[12px] font-bold leading-normal text-grey-100'>
      RETURN ON INVESTMENT
    </p>
    <div className='flex w-1/3 items-center justify-center'>
      <InfoTooltip text={tooltipText} />
    </div>
  </div>
)

const InfoTooltip: React.FC<{ text: string }> = ({ text }) => (
  <TooltipProvider>
    <Tooltip delayDuration={10}>
      <TooltipTrigger>
        <InfoIcon className='text-green-genesis size-[12px] md:size-[18px]' />
      </TooltipTrigger>
      <TooltipContent align='start' className='max-w-80' side='right'>
        {text}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

type InvestmentStatsBoxProps = {
  title: string
  value: number
  currency: boolean
}

const InvestmentStatsBox: React.FC<InvestmentStatsBoxProps> = ({ title, value, currency }) => (
  <div className='flex w-1/3 flex-col justify-center items-center gap-2'>
    <p className='text-sm font-bold text-grey-100'>{title}</p>
    <p className='text-2xl font-bold leading-[22.4px]'>
      {currency ? '$' + formatNumberWithCommas(value) : formatNumberWithCommas(value)}
    </p>
  </div>
)
