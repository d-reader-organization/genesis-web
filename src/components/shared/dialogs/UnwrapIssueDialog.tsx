'use client'

import { Dialog, DialogContent } from '@/components/ui/Dialog'
import { Asset } from '@/models/asset'
import { ComicIssue } from '@/models/comicIssue'
import { UnwrapIssueDialogItem } from '@/components/comicIssue/UnwrapIssueDialogItem'
import { useToggle } from '@/hooks/useToggle'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { UnwrapButton } from '../buttons/UnwrapButton'

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
      {showUnwrapButton && (
        <DialogTrigger>
          <UnwrapButton isLoading={false} onClick={toggleDialog} />
        </DialogTrigger>
      )}
      <DialogContent aria-describedby='' className='flex flex-col justify-between gap-8 bg-grey-400 p-5 rounded-lg'>
        <h3>Choose to open</h3>
        <p>In order to read the full comic issue, at least one Asset should be unwrapped.</p>
        {unusedAssets.map((asset) => (
          <UnwrapIssueDialogItem key={asset.address} asset={asset} comicIssue={comicIssue} />
        ))}
      </DialogContent>
    </Dialog>
  )
}
