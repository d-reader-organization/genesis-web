import { Dialog, DialogContent } from '@/components/ui/Dialog'
import { CommonDialogProps } from '@/models/common'

type Props = {
  videoUrl: string
} & CommonDialogProps

export const YoutubeVideoDialog: React.FC<Props> = ({ videoUrl, open, toggleDialog }) => {
  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent className='max-w-[1080px] h-auto p-0 bg-transparent' showCloseIcon={false}>
        <iframe
          src={`${videoUrl}&autoplay=0&controls=1&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&vq=hd720`}
          className='w-full h-auto aspect-video'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          title='Genesis promotional video'
          referrerPolicy='strict-origin-when-cross-origin'
        />
      </DialogContent>
    </Dialog>
  )
}
