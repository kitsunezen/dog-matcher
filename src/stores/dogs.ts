import { defineStore } from 'pinia'
import type { Dog } from '@/types/interfaces'

interface DogsState {
  breeds: string[]
  currentSearch: {
    breed: string | null
    page: number
    sortOrder: 'asc' | 'desc'
  }
  searchResults: Dog[]
  totalResults: number
}

export const useDogStore = defineStore('dog', {
  state: (): DogsState => ({
    breeds: [],
    currentSearch: {
      breed: null,
      page: 1,
      sortOrder: 'asc',
    },
    searchResults: [],
    totalResults: 0,
  }),
  getters: {},
  actions: {},
})
