import { fetchOwnedComicIssues } from '@/app/lib/api/comicIssue/queries'
import { fetchMe } from '@/app/lib/api/user/queries'
import { BaseLayout } from '@/components/layout/BaseLayout'
import { LibraryTabs } from '@/components/library/Tabs'

type SlugParamsProps = {
  params: {
    slug: string
  }
}

export default async function OwnedIssuesPage({ params: { slug: comicSlug } }: SlugParamsProps) {
  const me = await fetchMe()
  if (!me) {
    return null
  }

  const ownedIssues = await fetchOwnedComicIssues({ params: { skip: 0, take: 20, comicSlug }, userId: me.id })

  return (
    <BaseLayout showFooter>
      <LibraryTabs ownedIssues={ownedIssues} />
    </BaseLayout>
  )
}
