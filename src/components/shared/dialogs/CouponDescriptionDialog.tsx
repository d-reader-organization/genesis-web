import { CommonDialogProps } from '@/models/common'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import React from 'react'
import CHECK_CIRCLE_ICON from 'public/assets/vector-icons/check-circle.svg'
import CROSS_CIRCLE_ICON from 'public/assets/vector-icons/cross-circle.svg'
import { CouponType } from '@/models/candyMachine/candyMachineCoupon'
import { useCandyMachineStore } from '@/providers/CandyMachineStoreProvider'
import { getCouponDiscount } from '@/utils/mint'
import { Button } from '@/components/ui'
import { RoutePath } from '@/enums/routePath'
import { ComicIssue } from '@/models/comicIssue'
import { ConnectButton } from '../buttons/ConnectButton'

export const CouponDescriptionDialog: React.FC<CommonDialogProps & {comicIssue:ComicIssue}> = ({ open, toggleDialog, comicIssue }) => {
  const { coupons, candyMachine } = useCandyMachineStore((state) => state)

  const getCouponAction = (couponType: CouponType)=>{
    switch(couponType){
      case CouponType.RegisteredUser || CouponType.WhitelistedUser: return (
      <div>
        <a className='underline' href={`${RoutePath.Register}?redirectTo=/mint/${comicIssue.id}`}>Register</a>
        {' '}/{' '}
        <a className ='underline' href={`${RoutePath.Login}?redirectTo=/mint/${comicIssue.id}`}>Login →</a>
      </div>
      )
      case CouponType.WhitelistedWallet || CouponType.PublicUser: return (
        <div className='underline'>
          <ConnectButton className='[all:unset]' onClick={async()=>{}} />
        </div>
      )
      default: return ""
    }
  }
  return (
    <Dialog open={open}>
      <DialogContent
        aria-describedby=''
        className='rounded-[12px] flex flex-col items-center shadow-none w-full h-full bg-transparent p-[32px 24px 24px 24px] gap-[32px] overflow-hidden'
        overlayClassName='bg-transparent'
        showCloseIcon={false}
      >
        <div className='bg-grey-400 rounded-[12px] flex flex-col items-center sm:max-w-[485px] p-6 gap-[32px] overflow-hidden m-auto'>
        <DialogTitle className='font-satoshi leading-[24px] text-xl'>Check eligibilty</DialogTitle>
        <div className='flex flex-col gap-[8px] w-full'>
          {
            coupons.map((coupon,index)=>{
              const discount = getCouponDiscount(candyMachine?.coupons ?? [],coupon);
              const isEligible = coupon.stats.isEligible;
              return (
              <div className='inline-block rounded-[12px] sm:rounded-[12px] bg-grey-500 p-[16px] gap-[16px] flex flex-row  max-w-[437px]' key={index}>
                <div className='w-[20px] h-[20px]'>{isEligible ? <CHECK_CIRCLE_ICON />: <CROSS_CIRCLE_ICON/>}</div>
                <div className='inline-block gap-[8px] w-[100%] max-w-[369px]'>
                    <p className='xs:text-sm sm:text-base font-bold leading-[22.4px]'>{coupon.name} { discount ? `-${discount}% off` : null}</p>
                    <p className='xs:text-sm sm:text-base font-medium text-grey-100 leading-[22.4px] text-ellipsis overflow-auto'>{coupon.description}</p>
                    {!isEligible ? <p className='xs:text-xs sm:text-sm text-end text-grey-100 leading-[19.6px] decoration-1 cursor-pointer'>{getCouponAction(coupon.type)}</p>: null}
                </div>
              </div>
              )
            })
          }
          <Button variant='secondary' className='rounded-[16px] font-bold text-base' onClick={toggleDialog}>Got it!</Button>
        </div>
        </div>
        
      </DialogContent>
    </Dialog>
  )
}