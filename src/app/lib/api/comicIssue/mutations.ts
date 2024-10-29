'use server'

import { COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { RateComicIssue } from '@/models/comicIssue/rateComicIssue'
import { fetchWrapper } from '../../fetchWrapper'
import { revalidatePath } from 'next/cache'
import { RoutePath } from '@/enums/routePath'

const { COMIC_ISSUE, FAVOURITISE, RATE } = COMIC_ISSUE_QUERY_KEYS

export const rateComicIssue = async ({
  id,
  request,
}: {
  id: string | number
  request: RateComicIssue
}): Promise<void> => {
  await fetchWrapper<void>({
    path: `${COMIC_ISSUE}/${RATE}/${id}`,
    body: request,
    method: 'PATCH',
    isTextResponse: true,
  })
  revalidatePath(RoutePath.ComicIssue(id))
}

export const favouritiseComicIssue = async (id: string | number): Promise<void> => {
  await fetchWrapper<void>({ path: `${COMIC_ISSUE}/${FAVOURITISE}/${id}`, method: 'PATCH', isTextResponse: true })
  revalidatePath(RoutePath.ComicIssue(id))
}
