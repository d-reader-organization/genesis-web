import { CommonDialogProps } from '@/models/common'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import React from 'react'
import CHECK_CIRCLE_ICON from 'public/assets/vector-icons/check-circle.svg'
import { CouponType } from '@/models/candyMachine/candyMachineCoupon'
import { useCandyMachineStore } from '@/providers/CandyMachineStoreProvider'
import { getCouponDiscount } from '@/utils/mint'
import { Button } from '@/components/ui'
import { RoutePath } from '@/enums/routePath'
import { ComicIssue } from '@/models/comicIssue'
import { useRouter } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'
import useAuthorizeWallet from '@/hooks/useAuthorizeWallet'
import { useConnectUserWallet } from '@/api/auth'

export const CouponDescriptionDialog: React.FC<CommonDialogProps & {comicIssue:ComicIssue}> = ({ open, toggleDialog, comicIssue }) => {
  const { coupons, candyMachine } = useCandyMachineStore((state) => state)
  const router = useRouter();
  const {  } = useAuthorizeWallet()

  const getCouponAction = (couponType: CouponType)=>{
    switch(couponType){
      case CouponType.RegisteredUser: return <span onClick={()=>router.push(`${RoutePath.Register}?redirectTo=/mint/${comicIssue.id}`)}>Register →</span>
      case CouponType.PublicUser: return <span onClick={connectUserWallet}>Connect</span>;
      default: return ""
    }
  }
  return (
    <Dialog open={open}>
      <DialogContent
        aria-describedby=''
        className='bg-grey-400 rounded-[12px] flex flex-col items-center w-[80%] sm:max-w-[485px] p-[32px 24px 24px 24px] gap-[32px] overflow-hidden'
        overlayClassName='bg-transparent'
        showCloseIcon={false}
      >
        <DialogTitle className='font-satoshi leading-[24px] text-xl'>Check eligibilty</DialogTitle>
        <div className='flex flex-col gap-[8px] w-full'>
          {
            coupons.map(coupon=>{
              const discount = getCouponDiscount(candyMachine?.coupons ?? [],coupon);
              return (
                <div className='inline-block rounded-[12px] sm:rounded-[12px] bg-grey-500 p-[16px] gap-[16px] flex flex-row  max-w-[437px] h-[104px]'>
              <div className='w-[20px] h-[20px]'><CHECK_CIRCLE_ICON /></div>
              <div className='gap-[8px] w-[100%] max-w-[369px] max-h-[72px]'>
                  <p className='xs:text-sm sm:text-base font-bold leading-[22.4px]'>{coupon.name} { discount ? `-${discount}% off` : null}</p>
                  <p className='xs:text-sm sm:text-base font-medium text-grey-100 leading-[22.4px] text-ellipsis overflow-hidden'>{coupon.description}</p>
                  <p className='xs:text-xs sm:text-sm text-end text-grey-100 leading-[19.6px] underline decoration-1 cursor-pointer'>{getCouponAction(coupon.type)}</p>
              </div>
            </div>
              )
            })
          }
          <Button variant='secondary' className='rounded-[16px] font-bold text-base' onClick={toggleDialog}>Got it!</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}