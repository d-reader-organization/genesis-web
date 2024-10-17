'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog'
import { Asset } from '@/models/asset'
import { ComicIssue } from '@/models/comicIssue'
import { UnwrapIssueDialogItem } from '@/components/comicIssue/UnwrapIssueDialogItem'
import { useToggle } from '@/hooks/useToggle'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Text } from '@/components/ui'

type Props = {
  assets: Asset[]
  comicIssue: ComicIssue
  showUnwrapButton?: boolean
}

export const UnwrapIssueDialog: React.FC<Props> = ({ assets, comicIssue, showUnwrapButton = true }) => {
  const [unwrapIssueDialog, toggleDialog] = useToggle()
  const unusedAssets = assets.filter((asset) => !asset.isUsed)
  return (
    <Dialog open={unwrapIssueDialog} onOpenChange={toggleDialog}>
      {!showUnwrapButton && (
        <DialogTrigger className='bg-yellow-500 rounded-lg text-black p-2 font-semibold text-base min-w-28 w-min mx-auto'>
          Unwrap
        </DialogTrigger>
      )}
      <DialogContent
        aria-describedby=''
        className='flex flex-col justify-between items-center gap-8 bg-grey-400 p-5 rounded-lg'
      >
        <DialogTitle className='sr-only'>Unwrap issue dialog</DialogTitle>
        <Text as='h3' styleVariant='primary'>
          Choose to open
        </Text>
        <Text as='p' styleVariant='body-large' className='text-center'>
          In order to read the full comic issue, at least one Asset should be unwrapped.
        </Text>
        {unusedAssets.map((asset) => (
          <UnwrapIssueDialogItem key={asset.address} asset={asset} comicIssue={comicIssue} />
        ))}
      </DialogContent>
    </Dialog>
  )
}
