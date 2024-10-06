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
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { toast } from '@/components/ui'
import { sleep } from '@/utils/helpers'
import { useQueryClient } from '@tanstack/react-query'
import { comicIssueKeys } from '@/api/comicIssue'
import { useRouter } from 'next/navigation'
import { assetKeys } from '@/api/asset'
import { useFetchMe } from '@/api/user'
import { Loader } from 'lucide-react'

type Props = {
  comicIssue: ComicIssue
  isAuthenticated: boolean
} & CommonDialogProps

export const AssetMintedDetails: React.FC<{ asset: AssetEventData }> = ({ asset }) => {


  return (
    <div className='flex flex-col items-center relative min-w-full min-h-full justify-between mx-auto overflow-y-scroll'>
      <Image src={asset.image} width={690} height={1000} alt='Comic' className='max-w-[300px] w-full h-auto' />
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

  const [isUnwrapTransactionLoading,setUnwrapTransactionLoading] = useState<boolean>(false);
  const { publicKey, signTransaction } = useWallet();

  const { push } = useRouter()
  const {connection} = useConnection();
  const queryClient = useQueryClient()

  const { data: me } = useFetchMe()
	const myId = me?.id || 0

  const {data:twitterIntentComicMinted}  = useFetchTwitterIntentComicMinted({
    comicAddress: assets[selectedIndex].address ?? '',
    utmSource: UtmSource.WEB,
  })

  const handleUnwrap = async (selectedAsset: AssetEventData) => {
    if(!publicKey){
      toast({description:"Please connect wallet before unwrapping",variant:'error'});
      return;
    }
    try{
			setUnwrapTransactionLoading(true)

      const unwrapTransaction = await fetchUseComicIssueAssetTransaction({assetAddress:selectedAsset.address,ownerAddress:publicKey.toString()})
      if (unwrapTransaction) {
				if (!signTransaction) return
				const latestBlockhash = await connection.getLatestBlockhash()
				const signedTransaction = await signTransaction(unwrapTransaction)

				const signature = await connection.sendRawTransaction(signedTransaction.serialize())
				const response = await connection.confirmTransaction({ signature, ...latestBlockhash })
				if (!!response.value.err) {
					console.log('Response error log: ', response.value.err)
					toast({description:'Error while unwrapping the comic', variant:'error'})
					throw Error()
				}
				await sleep(1000)
			}

			queryClient.invalidateQueries({queryKey:comicIssueKeys.get(comicIssue.id)})
			queryClient.invalidateQueries({queryKey:comicIssueKeys.getByOwner(myId)})
			queryClient.invalidateQueries({queryKey:assetKeys.getMany({ comicIssueId: comicIssue.id })})
      queryClient.invalidateQueries({queryKey:comicIssueKeys.getPages(comicIssue.id)})

      push(RoutePath.ReadComicIssue(comicIssue.id), { scroll: false })
			toast({description:'Comic unwrapped! Lets get to reading 🎉', variant:'success'})
    }catch(e){
      console.log(e)
      toast({description:"Failed to unwrap, please try again!",variant:'error'});
      setUnwrapTransactionLoading(false);
    }
  }

  const hideArrows = (assets.length <= 1);
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
          <div className='relative flex mx-auto items-center sm:gap-[24px] w-full xs:gap-[4px] xs:max-w-[330px] sm:max-w-[480px] mx-auto'>
           <Arrow
              arrowOrientation='LEFT'
              className={hideArrows ? 'invisible' : ''}
              onClick={() => {
                emblaApi?.scrollPrev()
              }}
            />
            <div className='xs:max-w-[250px] sm:max-w-[350px] 2 flex flex-col items-center gap-6 relative justify-between mx-auto overflow-y-scroll'>
              <p className='text-grey-100 text-base sm:text-[16px] xs:text-[14px] leading-5 text-center'>
                {comicIssue.title} &nbsp;&bull;&nbsp; EP&nbsp;{comicIssue.number}
              </p>
              <p className='text-white sm:text-[32px] xs:text-[26px] font-obviouslyNarrow font-semibold leading-8'>
                Congrats! You got #{assets[selectedIndex].name.split('#')[1]}
              </p>
              <RarityChip className='-mt-3.5' rarity={assets[selectedIndex].rarity} />
              <p className='text-grey-100 text-base sm:text-[16px] xs:text-[14px] leading-5 text-center'>{selectedIndex+1}/{assets.length}</p>
              <div className='overflow-hidden w-full' ref={emblaRef}>
                <div className='flex flex-row items-center gap-4 min-w-full'>
                  {assets.map((asset, index) => (
                    <AssetMintedDetails asset={asset} key={index} />
                  ))}
                </div>
              </div>
              <Link
                href={twitterIntentComicMinted ?? ''}
                target='_blank'
                className='w-max self-center box-border py-1 px-3 border-2 border-white bg-black text-white rounded-lg font-medium cursor-pointer'
              >
                Share on &#120143;
              </Link>
              <div className='flex flex-col w-full max-w-[300px] gap-4'>
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
                    {isUnwrapTransactionLoading ? <Loader /> : "Unwrap & Read"}
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
              className={hideArrows ? 'invisible' : ''}
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
        isLoading={isUnwrapTransactionLoading}
        handleUnwrap={()=>handleUnwrap(assets[selectedIndex])}
      />
    </>
  )
}
