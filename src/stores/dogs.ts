import { defineStore } from 'pinia'
import { getBreeds, getBreedsLocal, getDogs, searchDogs } from '@/services/dogService'
import type { Dog, DogSearchParameters, DogSearchResponse, DogsState } from '@/types/interfaces'

export const useDogStore = defineStore('dog', {
  state: (): DogsState => ({
    breeds: [],
    currentSearch: {
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
    totalResults: 0,
  }),
  getters: {},
  actions: {
    async getBreeds() {
      this.loading = true
      try {
        let breeds: string[] = await getBreeds()
        if (breeds.length === 0) {
          console.log('Falling back to local data')
          breeds = getBreedsLocal()
        }
        this.breeds = breeds
      } catch (error) {
        console.error(error)
        this.loading = false
      } finally {
        this.loading = false
      }
    },
    async searchDogs(params: DogSearchParameters) {
      this.loading = true
      try {
        const dogResults: DogSearchResponse = await searchDogs(params)
        this.totalResults = dogResults.total
        return dogResults.resultIds
      } catch (error) {
        console.error('Failed to search dogs:', error)
        this.totalResults = 0
        return []
      } finally {
        this.loading = false
      }
    },

    async fetchDogDetails(ids: string[]) {
      this.loading = true
      try {
        const allDogs: Dog[] = []
        const batches = Math.ceil(ids.length / 100)

        for (let i = 0; i < batches; i++) {
          const start = i * 100
          const batchIds = ids.slice(start, start + 100)
          const batchDogs = await getDogs(batchIds)
          allDogs.push(...batchDogs)
        }

        this.searchResults = allDogs
        return allDogs
      } catch (error) {
        console.error('Failed to fetch dog details:', error)
        this.searchResults = []
        return []
      } finally {
        this.loading = false
      }
    },

    // Composite action if you need to do both operations
    async findDogs(params: DogSearchParameters) {
      const ids = await this.searchDogs(params)
      if (ids.length > 0) {
        return this.fetchDogDetails(ids)
      }
      return []
    },
    async init() {
      this.getBreeds()
    },
  },
})
