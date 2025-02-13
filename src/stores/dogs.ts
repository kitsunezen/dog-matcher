import { defineStore } from 'pinia'
import { getBreeds } from '@/services/dogService'

import type { DogsState } from '@/types/interfaces'
// interface DogsState {
//   breeds: string[]
//   currentSearch: {
//     breed: string | null
//     page: number
//     sortOrder: 'asc' | 'desc'
//   }
//   searchResults: Dog[]
//   totalResults: number
// }

export const useDogStore = defineStore('dog', {
  state: (): DogsState => ({
    breeds: [],
    currentSearch: {
      breed: null,
      page: 1,
      sortOrder: 'asc',
    },
    matchedDog: {
      id: 'NullBoy',
      img: '',
      name: 'Nobody',
      age: 0,
      zip_code: '00000',
      breed: 'NullDog',
    },
    searchResults: [],
    totalResults: 0,
  }),
  getters: {},
  actions: {
    async getBreeds() {
      const breeds: string[] = await getBreeds()
      this.$patch({ breeds: breeds })
    },
  },
})
