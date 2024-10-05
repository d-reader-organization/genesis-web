import React, { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/Dialog'
import { ComicIssue } from '@/models/comicIssue'
import Image from 'next/image'
import Link from 'next/link'
import { Button, ButtonLink } from '@/components/ui/Button'
import useToggle from '@/hooks/useToggle'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { RoutePath } from '@/enums/routePath'
import { UnwrapWarningDialog, unwrapWarningKey } from './UnwrapWarningDialog'
import { CommonDialogProps } from '@/models/common'
import { useFetchTwitterIntentComicMinted } from '@/api/twitter/queries/useFetchIntentComicMinted'
import { UtmSource } from '@/models/twitter/twitterIntentComicMintedParams'
import { RarityChip } from '../RarityChip'
import { AssetEventData } from '@/models/asset/assetMintEvent'
import { Arrow } from '../Arrow'
import useEmblaCarousel from 'embla-carousel-react'
import { fetchUseComicIssueAssetTransaction } from '@/app/lib/api/transaction/queries'
import { useWallet } from '@solana/wallet-adapter-react'
import { toast } from '@/components/ui'

type Props = {
  comicIssue: ComicIssue
  isAuthenticated: boolean
} & CommonDialogProps

export const AssetMintedDetails: React.FC<{ asset: AssetEventData }> = ({ asset }) => {
  const { data: twitterIntentComicMinted } = useFetchTwitterIntentComicMinted({
    comicAddress: asset.address ?? '',
    utmSource: UtmSource.WEB,
  })

  return (
    <div className='flex flex-col items-center gap-6 relative min-w-full min-h-full justify-between mx-auto overflow-y-scroll'>
      <p className='text-white sm:text-[32px] xs:text-[26px] font-obviouslyNarrow font-semibold leading-8'>
        Congrats! You got #{asset.name.split('#')[1]}
      </p>
      <RarityChip className='-mt-3.5' rarity={asset.rarity} />
      <Image src={asset.image} width={690} height={1000} alt='Comic' className='max-w-[330px] w-full h-auto' />
      <Link
        href={twitterIntentComicMinted ?? ''}
        target='_blank'
        className='w-max self-center box-border py-1 px-3 border-2 border-white bg-black text-white rounded-lg font-medium cursor-pointer'
      >
        Share on &#120143;
      </Link>
    </div>
  )
}

export const AssetMintedDialog: React.FC<Props & { assets: AssetEventData[] }> = ({
  assets,
  comicIssue,
  isAuthenticated,
  open,
  toggleDialog,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [unwrapWarningDialog, toggleUnwrapDialog] = useToggle(false)
  const [isUnwrapWarningRead] = useLocalStorage(unwrapWarningKey, false)

  const { publicKey } = useWallet()
  const handleUnwrap = async (selectedAsset: AssetEventData) => {
    if(!publicKey){
      toast({description:"Please connect wallet before unwrapping",variant:'error'});
      return;
    }
    try{
      await fetchUseComicIssueAssetTransaction({assetAddress:selectedAsset.address,ownerAddress:publicKey.toString()})
    }catch(e){
      toast({description:"Failed to unwrap, please try again!",variant:'error'});
    }
  }

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    onSelect()
    emblaApi?.on('select', onSelect)
    return () => {
      emblaApi?.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <>
      <Dialog open={open} onOpenChange={toggleDialog}>
        <DialogContent className='w-full h-full' showCloseIcon={false}>
          <div className='fixed top-0 left-0 w-full h-full -z-[1]'>
            <video autoPlay className='w-full h-full object-cover' loop muted>
              <source src='/assets/animations/mint-loop.mp4' type='video/mp4' />
            </video>
          </div>
          <div className='relative flex mx-auto items-center sm:gap-[24px] w-full xs:gap-[4px] xs:max-w-[268px] sm:max-w-[480px]'>
            <Arrow
              arrowOrientation='LEFT'
              onClick={() => {
                emblaApi?.scrollPrev()
              }}
            />
            <div className='xs:max-w-[210px] sm:max-w-[350px]'>
              <p className='text-grey-100 text-base sm:text-[16px] xs:text-[14px] leading-5 text-center'>
                {comicIssue.title} &nbsp;&bull;&nbsp; EP&nbsp;{comicIssue.number}
              </p>
              <div className='overflow-hidden w-full' ref={emblaRef}>
                <div className='flex flex-row items-center gap-4 min-w-full'>
                  {assets.map((asset, index) => (
                    <AssetMintedDetails asset={asset} key={index} />
                  ))}
                </div>
              </div>
              <div className='flex flex-col w-full max-w-[330px] mt-10 gap-4'>
                {isAuthenticated ? (
                  <Button
                    className='rounded-[12px]'
                    onClick={async () => {
                      if (!isUnwrapWarningRead) {
                        toggleUnwrapDialog()
                        return
                      }
                      await handleUnwrap(assets[selectedIndex])
                    }}
                  >
                    Unwrap & Read
                  </Button>
                ) : (
                  <ButtonLink
                    className='text-grey-600 rounded-[12px]'
                    href={`${RoutePath.Login}?redirectTo=/comic-issue/${comicIssue.id}/read`}
                    backgroundColor='important'
                  >
                    Login to Read
                  </ButtonLink>
                )}
                <Button
                  className='text-grey-50 border border-grey-50 rounded-[12px]'
                  onClick={toggleDialog}
                  variant='ghost'
                >
                  Close
                </Button>
              </div>
            </div>

            <Arrow
              arrowOrientation='RIGHT'
              onClick={() => {
                emblaApi?.scrollNext()
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
      <UnwrapWarningDialog
        open={unwrapWarningDialog}
        toggleDialog={toggleUnwrapDialog}
        handleUnwrap={()=>handleUnwrap(assets[selectedIndex])}
        isLoading={false}
      />
    </>
  )
}
