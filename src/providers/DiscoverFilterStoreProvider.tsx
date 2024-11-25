'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useStore } from 'zustand'
import { createDiscoverFilterStore, DiscoverFilterStore, defaultInitState } from '@/stores/DiscoverFilterStore'
import { fetchGenres } from '@/app/lib/api/genre/queries'
import { Genre } from '@/models/genre'

export const store = createDiscoverFilterStore(defaultInitState)
export type DiscoverFilterStoreApi = ReturnType<typeof createDiscoverFilterStore>
export const DiscoverFilterStoreContext = createContext<DiscoverFilterStoreApi | undefined>(undefined)

const fetchData = async (updateCompleteGenresList: (genres: Genre[]) => void) => {
  try {
    const completeGenresList = await fetchGenres({})
    updateCompleteGenresList(completeGenresList)
  } catch (error) {
    console.error('Error fetching genres: ', error)
  }
}

export type DiscoverFilterStoreProviderProps = {
  children: ReactNode
}

export const DiscoverFilterStoreProvider = ({ children }: DiscoverFilterStoreProviderProps) => {
  const updateCompleteGenresList = store.getState().updateCompleteGenresList

  useEffect(() => {
    fetchData(updateCompleteGenresList)
  }, [])

  return <DiscoverFilterStoreContext.Provider value={store}>{children}</DiscoverFilterStoreContext.Provider>
}

export const useDiscoverFilterStore = <T,>(selector: (store: DiscoverFilterStore) => T): T => {
  const storeContext = useContext(DiscoverFilterStoreContext)

  if (!storeContext) {
    throw new Error('useDiscoverFilterStore must be used within DiscoverFilterStoreProvider')
  }

  return useStore(storeContext, selector)
}