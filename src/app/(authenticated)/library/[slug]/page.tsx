import { fetchAssets } from '@/app/lib/api/asset/queries'
import { fetchMe } from '@/app/lib/api/user/queries'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { LibraryTabs } from '@/components/library/Tabs'
import { SlugParamsProps } from '@/lib/types'

export default async function OwnedIssuesPage({ params: { slug } }: SlugParamsProps) {
  const me = await fetchMe()
  if (!me) {
    return null
  }

  const ownedAssets = await fetchAssets({
    comicSlug: slug,
    userId: me.id,
  })

  return (
    <BaseLayout showFooter>
      <LibraryTabs ownedAssets={ownedAssets} />
    </BaseLayout>
  )
}
