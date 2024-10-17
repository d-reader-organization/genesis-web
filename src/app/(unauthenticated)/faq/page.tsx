import { Text } from '@/components/ui'
import Link from 'next/link'
import React from 'react'

export default function FaqPage() {
  return (
    <>
      <main className='flex flex-col gap-1 justify-center items-center mt-20'>
        <h1 className='title'>FAQ</h1>
        <p className='text-center'>Find answers to your questions! For any details contact us at </p>
        <Text as='p' styleVariant='body-xlarge' className='text-important-color'>
          support@dreader.io
        </Text>
        <br />
        If you&apos;d like to report your bug use the&nbsp;
        <div className='text-important-color'>
          <Link href='https://forms.gle/pXH2DFaVPyquv1Yv9' target='_blank'>
            bug report form
          </Link>
        </div>
        <div>FAQ</div>
      </main>
    </>
  )
}
