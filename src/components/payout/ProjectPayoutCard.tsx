import React from 'react'
import { ReceiptText } from 'lucide-react'
import { payoutDetails } from '@/constants/tooltips'
import { ProjectFunding, ProjectPayout } from '@/models/project'
import { formatPercentage, formatUSD } from '@/utils/numbers'
import { formatNumberWithCommas } from '@/utils/numbers'

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
        'flex flex-col p-2 gap-4 bg-grey-500 justify-between items-center shadow md:rounded-xl md:p-5 md:sticky md:top-[100px] md:max-w-[485px] md:min-w-[350px] md:h-[550px] md:gap-3 ' +
        className
      }
    >
      <div className='flex flex-col gap-4 w-full'>
        <p className='text-white text-base font-bold leading-snug'>Payout details:</p>
        <div className='h-[8px] rounded-[27px] w-full bg-[#08cc77]'></div>
      </div>

      <div className='flex flex-row w-full py-1 items-center justify-between md:flex-col md:justify-center md:items-start md:gap-[12px] md:py-3'>
        <div className='flex flex-col min-w-[95px] items-start md:w-full md:gap-1'>
          <h2 className='text-[#08cc77] font-semibold text-xl leading-tight tracking-tight md:text-[32px] md:leading-none md:tracking-tight'>
            ${formatNumberWithCommas(raiseGoal)}
          </h2>
          <p className='max-md:hidden text-[#c2c5ce] text-xs font-medium md:text-base md:leading-relaxed'>
            pledged of ${formatNumberWithCommas(raiseGoal)}
          </p>
        </div>
        <PayoutStats text='backers' value={numberOfBackers} />
        <PayoutStats text='Return on Investment' value={formatPercentage(payout.roiPercent)} />
        <PayoutStats text='Days for ROI' value={payout.daysForRoi} />
      </div>

      <div className='flex flex-row w-full h-full justify-center items-center p-[12px] bg-gradient-to-br from-[#4a4e53] to-[#1f222a] rounded-xl gap-[14px] md:max-h-[104px]'>
        {/**   <div
          className='flex max-h-[54px] max-w-[54px] p-[10px] bg-white rounded-xl shadow border border-[#56a05e]'
          style={{ boxShadow: '0 0 15px rgba(86, 160, 94, 0.8)' }}
        > */}
        <ReceiptText color='green' size={20} />

        <p className='text-[#aeaeae] text-center text-[12px] font-medium leading-snug'>
          Licencing Participation Agreement
        </p>
      </div>
      <p className='text-[10px] font-[cursive] md:text-[10px] pt-1 font-base leading-normal md:leading-[22.4px] md:px-2'>
        {payoutDetails}
      </p>
    </div>
  )
}

type BoxProps = {
  text: string
  value: number | string
}

const PayoutStats: React.FC<BoxProps> = ({ text, value }) => {
  return (
    <div className='flex flex-col min-w-[65px] items-center md:w-full md:gap-0 md:items-start'>
      <h2 className='text-white font-semibold text-xl leading-tight tracking-tight md:text-[28px] md:leading-none'>
        {value}
      </h2>
      <p className='text-[#c2c5ce] text-xs font-medium leading-normal md:text-[12px] md:leading-relaxed'>{text}</p>
    </div>
  )
}
