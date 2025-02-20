import { defineStore } from 'pinia'
import type { DogSearchParameters } from '@/types/interfaces'
export const useParamsStore = defineStore('params', {
  state: (): DogSearchParameters => ({
    breeds: [],
    zipCodes: [],
    size: 100,
  }),
  getters: {},
  actions: {
    addZipcode(zipcode: string) {
      if (!this.zipCodes) {
        this.zipCodes = []
      }
      if (this.zipCodes.indexOf(zipcode) === -1) {
        this.zipCodes.push(zipcode)
      }
    },
    removeZipcode(zipcode: string) {
      if (this.zipCodes && this.zipCodes.length > 0) {
        const index = this.zipCodes.indexOf(zipcode)
        if (index > -1) {
          this.zipCodes.splice(index, 1)
        }
      }
    },
    addBreed(breed: string) {
      if (!this.breeds) {
        this.breeds = []
      }
      if (this.breeds.indexOf(breed) === -1) {
        this.breeds.push(breed)
      }
    },
    removeBreed(breed: string) {
      if (this.breeds && this.breeds.length > 0) {
        const index = this.breeds.indexOf(breed)
        if (index > -1) {
          this.breeds.splice(index, 1)
        }
      }
    },
  },
})
