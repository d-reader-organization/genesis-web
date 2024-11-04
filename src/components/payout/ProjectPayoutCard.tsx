import React from 'react'
import { ReceiptText } from 'lucide-react'
import { payoutDetails } from '@/constants/general'
import { formatNumberWithCommas } from '@/utils/general'
import { formatPercentage, formatUSD } from '@/utils/general'
import { ProjectFunding, ProjectPayout } from '@/models/project'

type Props = {
  payout: ProjectPayout
  raiseGoal: ProjectFunding['raiseGoal']
  numberOfBackers: ProjectFunding['numberOfBackers']
  className: string
}

export const ProjectPayoutCard: React.FC<Props> = ({ payout, raiseGoal, numberOfBackers, className }) => {
  return (
    <div
      className={
        'flex flex-col p-2 gap-3 bg-grey-500 justify-between items-center shadow md:rounded-xl md:p-5 md:sticky md:top-[100px] md:max-w-[485px] md:min-w-[350px] md:h-[550px] md:gap-1 md:pb-4 ' +
        className
      }
    >
      <div className='flex flex-col gap-[14px] w-full'>
        <p className='text-white text-base font-bold leading-snug'>Payout details*</p>
      </div>

      <div className='flex w-full md:flex-col items-start md:gap-5'>
        <PayoutStats
          text='total raised'
          value={formatUSD(raiseGoal)}
          valueColor='text-[#fceb54] '
          valueSizeMd='md:text-3xl '
          textSizeMd='md:text-xl '
        />
        <PayoutStats text='backers' value={formatNumberWithCommas(numberOfBackers)} />
        <PayoutStats
          text='return on investment'
          value={formatPercentage(payout.roiPercent)}
          className='max-md:hidden'
        />
        <PayoutStats text='ROI' value={formatPercentage(payout.roiPercent)} className='md:hidden' />
        <PayoutStats text='days for ROI' value={payout.daysForRoi} />
      </div>

      <div>
        <div className='flex flex-row w-full justify-center items-center p-[10px] bg-gradient-to-br from-[#4a4e53] to-[#1f222a] rounded-xl gap-[14px] md:max-h-[104px] md:p-[12px]'>
          <div
            className='flex max-h-[36px] max-w-[36px] md:max-h-[54px] md:max-w-[54px] p-[8px] bg-white rounded-xl shadow border border-[#56a05e]'
            style={{ boxShadow: '0 0 15px rgba(86, 160, 94, 0.8)' }}
          >
            <ReceiptText color='green' size={20} className='max-md:hidden' />
            <ReceiptText color='green' size={16} className='md:hidden' />
          </div>
          <p className='text-[#aeaeae] text-[14px] font-medium leading-snug'>Licencing Participation Agreement</p>
        </div>
        <p className='text-[10px] italic pt-1 leading-normal max-md:pl-1 md:px-2'>{payoutDetails}</p>
      </div>
    </div>
  )
}

type PayoutStatsProps = {
  text: string
  value: number | string
  valueColor?: string
  valueSizeMd?: string
  textSizeMd?: string
  className?: string
}

const PayoutStats: React.FC<PayoutStatsProps> = ({
  text,
  value,
  valueSizeMd = 'md:text-3xl ',
  textSizeMd = 'md:text-lg ',
  valueColor = 'text-white ',
  className = '',
}) => {
  return (
    <div className={'flex w-1/4 flex-col items-center md:w-full md:items-start ' + className}>
      <h2 className={'font-semibold text-xl leading-tight tracking-tight md:leading-none ' + valueSizeMd + valueColor}>
        {value}
      </h2>
      <p className={'text-[#c2c5ce] text-xs font-medium leading-normal md:leading-relaxed ' + textSizeMd}>{text}</p>
    </div>
  )
}
