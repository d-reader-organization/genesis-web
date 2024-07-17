import React from 'react'
import { Dialog, DialogContent } from '@/components/ui/Dialog'
import { Asset } from '@/models/asset'
import { ComicRarity } from '@/enums/comicRarity'
import { Loader } from '../Loader'
import { ComicIssue } from '@/models/comicIssue'
import { getRarityIcon } from '@/utils/rarity'
import Image from 'next/image'
import clsx from 'clsx'
import Link from 'next/link'
import { Button, ButtonLink } from '@/components/ui/Button'
import useToggle from '@/hooks/useToggle'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { RoutePath } from '@/enums/routePath'
import { UnwrapWarningDialog, unwrapWarningKey } from './UnwrapWarningDialog'
import { CommonDialogProps } from '@/models/common'

type Props = {
  comicIssue: ComicIssue
  isAuthenticated: boolean
} & CommonDialogProps

export const AssetMintedDialog: React.FC<Props> = ({ comicIssue, isAuthenticated, open, toggleDialog }) => {
  const [unwrapWarningDialog, toggleUnwrapDialog] = useToggle(false)
  const [isUnwrapWarningRead] = useLocalStorage(unwrapWarningKey, false)
  const asset: Asset = {
    address: '9oCJ3T7BgQLvqhssHcKCTW6z1EnPxiHjownLsq72iYzK',
    uri: 'https://arweave.net/sAv5BM67BeSQ2_YeNdQvIgv5iixToMHcNB5R64EwouY',
    image: 'https://arweave.net/EX0Mooo8ForD3Dyf9UL-VZPanqJqq1LBhmeIp5vTl-Q',
    name: 'Tome of Knowledge #18',
    description:
      'The Lupers of Arx Urbis are a proud and noble race of wolves descended from the she-wolf of Lupercal, who raised Romulus and Remus',
    ownerAddress: '5hJKqD4uzZYb2Q95mJ2ZGbSVwrgNFzjw8cpbSCfyeiRs',
    royalties: 5.4,
    isUsed: false,
    isSigned: false,
    rarity: ComicRarity.Common,
    comicName: 'Lupers',
    comicIssueName: 'Tome of Knowledge',
    comicIssueId: 5,
    attributes: [
      {
        trait: 'rarity',
        value: 'Common',
      },
      {
        trait: 'used',
        value: 'false',
      },
      {
        trait: 'signed',
        value: 'false',
      },
    ],
    isListed: false,
  }
  const twitterIntentComicMinted = 'TODO'

  const handleUnwrap = async () => {}
  return (
    <>
      <Dialog open={open} onOpenChange={toggleDialog}>
        <DialogContent className='h-screen max-h-full max-w-screen p-6' showCloseIcon={false}>
          <div className='fixed top-0 left-0 w-full h-full -z-[1]'>
            <video autoPlay className='w-full h-full object-cover' loop muted>
              <source src='/assets/animations/mint-loop.mp4' type='video/mp4' />
            </video>
          </div>
          <div className='flex flex-col items-center gap-6 relative w-full h-full min-h-16 mx-auto max-w-[444px] overflow-y-scroll p-6'>
            {asset ? (
              <>
                <span className='text-grey-100 text-base font-medium leading-5'>
                  {comicIssue.title} - EP&nbsp;{comicIssue.number}
                </span>
                <span className='text-white text-2xl font-bold leading-7'>
                  Congrats! You got #{asset.name.split('#')[1]}
                </span>
                <div
                  className={clsx(
                    'flex items-center gap-1 rounded-[4px] border border-white py-0.5 px-1.5 text-lg',
                    asset.rarity === ComicRarity.Common && 'text-white',
                    asset.rarity === ComicRarity.Uncommon && 'text-yellow-100',
                    asset.rarity === ComicRarity.Rare && 'text-blue-500',
                    asset.rarity === ComicRarity.Epic && 'text-pink-500',
                    asset.rarity === ComicRarity.Legendary && 'text-purple-500'
                  )}
                >
                  {getRarityIcon(asset.rarity)} {asset.rarity}
                </div>
                <Image
                  src={asset.image}
                  width={690}
                  height={1000}
                  alt='Comic'
                  className='w-[400px] max-w-full h-auto'
                />

                <Link
                  href={twitterIntentComicMinted ?? ''}
                  target='_blank'
                  className='w-max self-center mt-4 box-border py-1 px-3 border-2 border-white bg-black text-white rounded-lg font-medium cursor-pointer'
                >
                  Share on &#120143;
                </Link>

                <div className='flex flex-col gap-4 w-full'>
                  {isAuthenticated ? (
                    <Button
                      onClick={async () => {
                        if (!isUnwrapWarningRead) {
                          toggleUnwrapDialog()
                          return
                        }
                        await handleUnwrap()
                      }}
                    >
                      Unwrap & Read
                    </Button>
                  ) : (
                    <ButtonLink
                      className='text-grey-600'
                      href={`${RoutePath.Login}?redirectTo=/comic-issue/${comicIssue.id}/read`}
                      backgroundColor='important'
                    >
                      Login to Read
                    </ButtonLink>
                  )}
                  <Button className='text-grey-50 border border-grey-50' onClick={toggleDialog} variant='ghost'>
                    Close
                  </Button>
                </div>
              </>
            ) : (
              <Loader />
            )}
          </div>
        </DialogContent>
      </Dialog>
      <UnwrapWarningDialog
        open={unwrapWarningDialog}
        toggleDialog={toggleUnwrapDialog}
        handleUnwrap={async () => {}}
        isLoading={false}
      />
    </>
  )
}
