'use client'

import React from 'react'
import { Info, TicketIcon } from 'lucide-react'
import { getCouponDiscount } from '@/utils/mint'
import { CouponCardButton } from './CouponCardButton'
import { Skeleton } from '../ui'
import { useCandyMachineStore } from '@/providers/CandyMachineStoreProvider'
import { CouponDescriptionDialog } from '../shared/dialogs/CouponDescriptionDialog'
import { useToggle } from '@/hooks'
import { ComicIssue } from '@/models/comicIssue'

export const CouponsSection: React.FC<{ comicIssue: ComicIssue }> = ({ comicIssue }) => {
  const { coupons, selectedCoupon, updateSelectedCoupon, candyMachine } = useCandyMachineStore((state) => state)
  const [showCouponDescriptionDialog, toggleCouponDescriptionDialog] = useToggle(false)
  return (
    <>
      <div className='flex flex-col gap-6'>
        <div className='flex gap-3 items-center xs:gap-3'>
          <TicketIcon size={24} />
          <h5 className='text-xl font-semibold leading-[20px] tracking-[0.04px] mt-1'>Discount coupons</h5>
          <Info className='h-[18px] w-[18px] hover:cursor-pointer' color='#c2c5ce' onClick={toggleCouponDescriptionDialog}>Check Eligibility</Info>
        </div>
        <div className='flex items-center gap-3 flex-wrap'>
          {coupons.map((coupon) => (
            <CouponCardButton
              coupon={coupon}
              discount={getCouponDiscount(candyMachine?.coupons || [], coupon)}
              key={`${coupon.name}-${coupon.id}`}
              isSelected={selectedCoupon ? selectedCoupon.id === coupon.id : false}
              onClick={() => updateSelectedCoupon(coupon)}
            />
          ))}
        </div>
      </div>
      <CouponDescriptionDialog open={showCouponDescriptionDialog} toggleDialog={toggleCouponDescriptionDialog} comicIssue={comicIssue} />
    </>
  )
}

export const CouponsSectionLoading: React.FC = () => (
  <>
    <Skeleton className='h-[49px] md:hidden w-full' />
    <div className='flex flex-col gap-6 max-md:hidden'>
      <Skeleton className='h-6 w-44' />
      <div className='flex items-center gap-3'>
        <Skeleton className='max-w-[212px] w-full h-[137px]' />
        <Skeleton className='max-w-[212px] w-full h-[137px]' />
        <Skeleton className='max-w-[212px] w-full h-[137px]' />
      </div>
    </div>
  </>
)
