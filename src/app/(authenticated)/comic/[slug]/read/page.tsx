import { fetchComicIssues } from '@/app/lib/api/comicIssue/queries'
import { RoutePath } from '@/enums/routePath'
import { SortOrder } from '@/enums/sortOrder'
import { ComicIssueSortTag } from '@/models/comicIssue/comicIssueParams'
import { redirect, RedirectType } from 'next/navigation'

type Props = {
  params: {
    slug: string
  }
}

export default async function ComicReadPage({ params: { slug } }: Props) {
  const issues = await fetchComicIssues({
    skip: 0,
    take: 1,
    comicSlug: slug,
    sortTag: ComicIssueSortTag.Latest,
    sortOrder: SortOrder.ASC,
  })

  if (!issues.length) {
    return null
  }

  redirect(RoutePath.ReadComicIssue(issues.at(0)!.id), RedirectType.replace)
}
