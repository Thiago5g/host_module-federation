import { createStore } from 'zustand/vanilla'
import type { StoreApi } from 'zustand/vanilla'

export type GlobalState = {
  count: number
  authToken: string | null
  language: 'pt' | 'en' | 'es'
  setCount: (n: number) => void
  setAuthToken: (t: string | null) => void
  setLanguage: (lng: 'pt' | 'en' | 'es') => void
}

export const globalStore: StoreApi<GlobalState> = createStore<GlobalState>()((set) => ({
  count: 0,
  authToken: null,
  language: 'en',
  setCount: (n: number) => set({ count: n }),
  setAuthToken: (t: string | null) => set({ authToken: t }),
  setLanguage: (lng: 'pt' | 'en' | 'es') => set({ language: lng }),
}))
