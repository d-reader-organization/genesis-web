'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useStore } from 'zustand'
import {
  createDiscoverQueryParamsStore,
  DiscoverQueryParamsStore,
  defaultInitState,
} from '@/stores/DiscoverQueryParamsStore'
import { fetchGenres } from '@/app/lib/api/genre/queries'
import { Genre } from '@/models/genre'

export const store = createDiscoverQueryParamsStore(defaultInitState)
export type DiscoverQueryParamsStoreApi = ReturnType<typeof createDiscoverQueryParamsStore>
export const DiscoverQueryParamsStoreContext = createContext<DiscoverQueryParamsStoreApi | undefined>(undefined)

const fetchData = async (updateCompleteGenresList: (genres: Genre[]) => void) => {
  const completeGenresList = await fetchGenres()
  updateCompleteGenresList(completeGenresList)
}

export type DiscoverQueryStoreProviderProps = {
  children: ReactNode
}

export const DiscoverQueryStoreProvider = ({ children }: DiscoverQueryStoreProviderProps) => {
  const updateCompleteGenresList = store.getState().updateCompleteGenresList

  useEffect(() => {
    fetchData(updateCompleteGenresList)
  }, [])

  return <DiscoverQueryParamsStoreContext.Provider value={store}>{children}</DiscoverQueryParamsStoreContext.Provider>
}

export const useDiscoverQueryStore = <T,>(selector: (store: DiscoverQueryParamsStore) => T): T => {
  const storeContext = useContext(DiscoverQueryParamsStoreContext)

  if (!storeContext) {
    throw new Error('useDiscoverFilterStore must be used within DiscoverFilterStoreProvider')
  }

  return useStore(storeContext, selector)
}
