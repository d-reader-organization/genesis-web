import { ComicParams } from '@/models/comic/comicParams'
import { ComicIssueParams } from '@/models/comicIssue/comicIssueParams'
import { CreatorParams } from '@/models/creator/creatorParams'
import { Genre } from '@/models/genre'
import { createStore } from 'zustand/vanilla'

export type DiscoverFilterState = {
  completeGenresList: Genre[]
  comicParams: ComicParams
  comicIssueParams: ComicIssueParams
  creatorParams: CreatorParams
}

export type DiscoverFilterActions = {
  resetToDefaultInitState: () => void
  updateCompleteGenresList: (genres: Genre[]) => void
  updateAllParamGenreSlugs: (genreSlugs: string[]) => void
  updateComicParams: (params: Partial<ComicParams>) => void
  updateComicIssueParams: (params: Partial<ComicIssueParams>) => void
  updateCreatorParams: (params: Partial<CreatorParams>) => void
}

export type DiscoverFilterStore = DiscoverFilterState & DiscoverFilterActions

export const defaultInitState: DiscoverFilterState = {
  completeGenresList: [],
  comicParams: {
    skip: 0,
    take: 20,
    genreSlugs: undefined,
    sortOrder: undefined,
    creatorSlug: undefined,
    titleSubstring: undefined,
    filterTag: undefined,
    sortTag: undefined,
  },
  comicIssueParams: {
    skip: 0,
    take: 20,
    genreSlugs: undefined,
    sortOrder: undefined,
    creatorSlug: undefined,
    comicSlug: undefined,
    titleSubstring: undefined,
    filterTag: undefined,
    sortTag: undefined,
  },
  creatorParams: {
    skip: 0,
    take: 20,
    genreSlugs: undefined,
    sortOrder: undefined,
    nameSubstring: undefined,
    filterTag: undefined,
    sortTag: undefined,
  },
}

export const createDiscoverFilterStore = (initState: DiscoverFilterState = defaultInitState) => {
  return createStore<DiscoverFilterStore>()((set) => ({
    ...initState,
    resetToDefaultInitState: () =>
      set((state) => ({
        ...defaultInitState,
        completeGenresList: state.completeGenresList,
      })),
    updateCompleteGenresList: (genres) =>
      set(() => ({
        completeGenresList: genres,
      })),
    updateAllParamGenreSlugs: (genreSlugs) =>
      set((state) => ({
        comicParams: {
          ...state.comicParams,
          genreSlugs: genreSlugs.length ? genreSlugs : undefined,
        },
        comicIssueParams: {
          ...state.comicIssueParams,
          genreSlugs: genreSlugs.length ? genreSlugs : undefined,
        },
        creatorParams: {
          ...state.creatorParams,
          genreSlugs: genreSlugs.length ? genreSlugs : undefined,
        },
      })),
    updateComicParams: (params) =>
      set((state) => ({
        comicParams: { ...state.comicParams, ...params },
      })),
    updateComicIssueParams: (params) =>
      set((state) => ({
        comicIssueParams: { ...state.comicIssueParams, ...params },
      })),
    updateCreatorParams: (params) =>
      set((state) => ({
        creatorParams: { ...state.creatorParams, ...params },
      })),
  }))
}
