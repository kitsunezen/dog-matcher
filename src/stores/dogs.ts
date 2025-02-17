import { defineStore } from 'pinia'
import { getBreeds, getBreedsLocal } from '@/services/dogService'

import type { DogBreed, DogsState } from '@/types/interfaces'

export const useDogStore = defineStore('dog', {
  state: (): DogsState => ({
    breeds: [],
    currentSearch: {
      breed: null,
      page: 1,
      sortOrder: 'asc',
    },
    loading: false,
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
      this.$patch({ loading: true })
      let breeds: DogBreed[] = await getBreeds()
      if (breeds.length === 0) {
        console.log('Falling back to local data')
        breeds = getBreedsLocal()
      }
      this.$patch({ breeds: breeds, loading: false })
    },
  },
})
