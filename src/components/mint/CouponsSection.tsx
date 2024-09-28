'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CandyMachineCoupon, CouponType } from '@/models/candyMachine/candyMachineCoupon'
import { TicketIcon } from 'lucide-react'
import { useFetchCandyMachine } from '@/api/candyMachine/queries'
import { useWallet } from '@solana/wallet-adapter-react'
import { cn } from '@/lib/utils'
import { Expandable } from '../shared/Expandable'
import { getCouponDiscount, getPublicCoupon } from '@/utils/mint'
import { CandyMachine } from '@/models/candyMachine'

type Props = {
  candyMachine: CandyMachine
  setCoupon: Dispatch<SetStateAction<CandyMachineCoupon | undefined>>
  selectedCoupon: CandyMachineCoupon | undefined
}

export const CouponsSection: React.FC<Props> = ({ candyMachine, selectedCoupon, setCoupon}) => {
  const filterCoupons = (coupons:CandyMachineCoupon[]) =>{
    return coupons.filter(coupon=>!(coupon.type == CouponType.PublicUser || coupon.name == 'dAuth'))
  }

  const coupons = filterCoupons(candyMachine?.coupons ?? []);
  useEffect(()=>{
    if(candyMachine){
      const publicCoupon = getPublicCoupon(candyMachine.coupons || []);
      setCoupon(publicCoupon)
    }
  },[candyMachine])

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
              discount={getCouponDiscount(candyMachine?.coupons || [],coupon)}
              key={coupon.name}
              isSelected={selectedCoupon ? selectedCoupon.id === coupon.id : false}
              onClick={() => setCoupon(coupon)}
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
              discount={getCouponDiscount(candyMachine?.coupons || [],coupon)}
              key={`${coupon.name}-mobile`}
              isSelected={selectedCoupon ? selectedCoupon.id === coupon.id : false}
              onClick={() => setCoupon(coupon)}
            />
          ))}
        </div>
      </Expandable>
    </>
  )
}

type CardProps = {
  coupon: CandyMachineCoupon
  isSelected: boolean
  discount: number
  onClick: () => void
}

const CouponCardButton: React.FC<CardProps> = ({ coupon, discount, isSelected, onClick }) => {
  return (
    <button
      className={cn(
        'flex md:flex-col justify-between md:justify-center items-center md:items-start gap-3 p-4 rounded-xl bg-black bg-opacity-20 border border-dashed border-grey-200 w-full md:max-w-[212px]',
        isSelected && 'border border-solid border-yellow-500 bg-yellow-500 bg-opacity-10'
      )}
      onClick={onClick}
    >
      <div className='flex gap-3 items-center'>
        <div className='flex md:flex-col gap-1 pr-3 border-r border-dashed border-r-grey-200 text-2xl font-semibold leading-[24px] tracking-[0.048px]'>
          <h6>{discount}%</h6>
          <h6 className='text-green-accent'>OFF</h6>
        </div>
        <span className='text-base font-medium leading-[22.4px]'>{coupon.name}</span>
      </div>
      <div className='flex max-md:flex-col justify-center items-center rounded-lg bg-black py-2 px-1'>
        <span className='text-xs md:text-base font-medium leading-[22.4px] text-grey-50'>Used&nbsp;</span>
        <div className='flex items-center'>
          <span className='text-xs md:text-base font-medium leading-[22.4px] text-grey-200'>{coupon.stats.itemsMinted ?? 0}&nbsp;</span>
          <span className='text-xs md:text-base font-medium leading-[140%] text-grey-200'>&nbsp;/&nbsp;{coupon.numberOfRedemptions}</span>
        </div>
      </div>
    </button>
  )
}
