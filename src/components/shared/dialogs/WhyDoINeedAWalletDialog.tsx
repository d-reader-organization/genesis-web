import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { WHAT_IS_A_WALLET, WHY_DO_I_NEED_A_WALLET } from '@/constants/staticText'

export const WhyDoINeedAWalletDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='text-grey-100' variant='ghost'>
          Why do I need a wallet?
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[444px] p-2'>
        <strong className='mt-2'>What is a wallet?</strong>
        {WHAT_IS_A_WALLET}
        <p />
        <strong>Why do I need a wallet?</strong>
        {WHY_DO_I_NEED_A_WALLET}
      </DialogContent>
    </Dialog>
  )
}
