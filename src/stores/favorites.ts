import { defineStore } from 'pinia'
import type { Dog } from '@/types/interfaces'

interface FavoritesState {
  favoriteIds: string[]
  matchedDog: Dog | null
}

export const useFavoritesStore = defineStore('favorites', {
  state: (): FavoritesState => ({
    favoriteIds: [],
    matchedDog: null,
  }),
  getters: {},
  actions: {},
})
