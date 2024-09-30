'use server'

import { ComicIssue } from '@/models/comicIssue'
import { ComicIssueParams } from '@/models/comicIssue/comicIssueParams'
import { fetchWrapper } from '../../fetchWrapper'
import { COMIC_ISSUE_QUERY_KEYS } from '@/api/comicIssue/comicIssueKeys'
import { Nullable } from '@/models/common'
import { ComicPage } from '@/models/comic/comicPage'

const { COMIC_ISSUE, GET, GET_PUBLIC, PAGES, PREVIEW_PAGES } = COMIC_ISSUE_QUERY_KEYS

export const fetchComicIssues = async (params: ComicIssueParams): Promise<ComicIssue[]> => {
  const { data } = await fetchWrapper<ComicIssue[]>({
    params,
    path: `${COMIC_ISSUE}/${GET}`,
  })
  return data ?? []
}

export const fetchComicIssue = async (id: string): Promise<Nullable<ComicIssue>> => {
  const { data } = await fetchWrapper<ComicIssue>({
    path: `${COMIC_ISSUE}/${GET}/${id}`,
  })

  return data
}

export const fetchPublicComicIssue = async (id: string | number): Promise<Nullable<ComicIssue>> => {
  const response = await fetchWrapper<ComicIssue>({ path: `${COMIC_ISSUE}/${GET_PUBLIC}/${id}` })
  return response.data
}

export const fetchComicIssuePages = async (id: string | number): Promise<ComicPage[]> => {
  const response = await fetchWrapper<ComicPage[]>({ path: `${COMIC_ISSUE}/${GET}/${id}/${PAGES}` })
  return response.data ?? []
}

export const fetchComicIssuePreviewPages = async (id: string | number): Promise<ComicPage[]> => {
  const response = await fetchWrapper<ComicPage[]>({ path: `${COMIC_ISSUE}/${GET}/${id}/${PREVIEW_PAGES}` })
  return response.data ?? []
}
