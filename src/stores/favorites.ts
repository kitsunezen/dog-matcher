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
  actions: {
    addFavorite(id: string) {
      if (this.favoriteIds.indexOf(id) === -1) {
        this.favoriteIds.push(id)
      }
    },
    removeFavorite(id: string) {
      const index = this.favoriteIds.indexOf(id)
      if (index > -1) {
        this.favoriteIds.splice(index, 1)
      }
    },
  },
})
