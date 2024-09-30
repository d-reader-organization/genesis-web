'use client'

import React from 'react'
import { TicketIcon } from 'lucide-react'
import { Expandable } from '../shared/Expandable'
import { getCouponDiscount } from '@/utils/mint'
import { useCandyMachine } from '@/providers/CandyMachineProvider'
import { CouponCardButton } from './CouponCardButton'
import { Skeleton } from '../ui'

export const CouponsSection: React.FC = () => {
  const { coupons, selectedCoupon, updateSelectedCoupon, candyMachine } = useCandyMachine()
  return (
    <>
      <div className='flex flex-col gap-6 max-md:hidden'>
        <div className='flex gap-2 items-center'>
          <TicketIcon size={24} />
          <h5 className='text-xl font-semibold leading-[20px] tracking-[0.04px] mt-1'>Discount coupons</h5>
        </div>
        <div className='flex items-center gap-3 flex-wrap'>
          {coupons.map((coupon) => (
            <CouponCardButton
              coupon={coupon}
              discount={getCouponDiscount(candyMachine?.coupons || [], coupon)}
              key={coupon.name}
              isSelected={selectedCoupon ? selectedCoupon.id === coupon.id : false}
              onClick={() => updateSelectedCoupon(coupon)}
            />
          ))}
        </div>
      </div>
      <Expandable
        className='md:hidden'
        title=''
        titleComponent={
          <div className='flex gap-2 items-center'>
            <TicketIcon size={24} />
            <h5 className='text-xl font-semibold leading-[20px] tracking-[0.04px] mt-1'>Discount coupons</h5>
          </div>
        }
      >
        <div className='flex flex-col md:flex-row items-center gap-3'>
          {coupons.map((coupon) => (
            <CouponCardButton
              coupon={coupon}
              discount={getCouponDiscount(candyMachine?.coupons || [], coupon)}
              key={`${coupon.name}-mobile`}
              isSelected={selectedCoupon ? selectedCoupon.id === coupon.id : false}
              onClick={() => updateSelectedCoupon(coupon)}
            />
          ))}
        </div>
      </Expandable>
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
