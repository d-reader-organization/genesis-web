/* 
- Header widget
- Candy machine details widget
- Coupons widget
-  expandable description text, genre tags.
- Preview pages widget    
Rarity chip: border-radius 10px, border 2.593px, color black - background it depends on rarity color.
*/

import { fetchPublicComicIssue } from '@/app/lib/api/comicIssue/queries'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { CoverSlider } from '@/components/mint/CoverSlider'
import { CandyMachineDetails } from '@/components/shared/CandyMachineDetails'
import { ComicIssuePageParams } from '@/models/common'

export default async function NewMintPage({ params }: ComicIssuePageParams) {
  const comicIssue = await fetchPublicComicIssue(params.id)
  if (!comicIssue) return null

  return (
    <BaseLayout>
      <div className='flex gap-6'>
        <CoverSlider covers={comicIssue.statelessCovers ?? []} />
        <CandyMachineDetails comicIssue={comicIssue} isAuthenticated />
      </div>
    </BaseLayout>
  )
}
