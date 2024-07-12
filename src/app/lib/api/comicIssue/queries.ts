'use server'

import { ComicIssue } from '@/models/comicIssue'
import { ComicIssueParams } from '@/models/comicIssue/comicIssueParams'
import { fetchWrapper } from '../../fetchWrapper'
import { COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'

const { COMIC_ISSUE, GET } = COMIC_ISSUE_QUERY_KEYS

export const fetchComicIssues = async (params: ComicIssueParams): Promise<ComicIssue[]> => {
  const { data } = await fetchWrapper<ComicIssue[]>({
    params,
    path: `${COMIC_ISSUE}/${GET}`,
  })
  return data ?? []
}

export const fetchComicIssue = async (id: string): Promise<ComicIssue | null> => {
  const { data } = await fetchWrapper<ComicIssue>({
    path: `${COMIC_ISSUE}/${GET}/${id}`,
  })

  return data
}
