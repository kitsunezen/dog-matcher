import { defineStore } from 'pinia'
import { getLocations, getLocationsWithBoundingBox } from '@/services/locationsService'
import type { Location, LocationsState, LocationSearchResponse } from '@/types/interfaces'

export const useLocationStore = defineStore('location', {
  state: (): LocationsState => ({
    boundingBoxSize: 0,
    boundingBoxLocations: [],
    currentLocations: [],
    currentZips: [],
    loading: false,
    location: { zip_code: '', latitude: 0, longitude: 0, city: '', state: '', county: '' },
    totalLocationResults: 0,
  }),
  getters: {},
  actions: {
    async getLocations(zipcodes: string[]) {
      this.loading = true
      try {
        const locations: Location[] = await getLocations(zipcodes)
        this.currentLocations = locations
        if (zipcodes.length === 1 && this.currentLocations?.length === 1) {
          this.location = this.currentLocations[0]
        }
      } catch (error) {
        console.error(`Locations store: getLocations: Failed: ${error}`)
      } finally {
        this.loading = false
      }
    },
    async getNearbyLocations(location: Location, distance: number) {
      this.loading = true
      try {
        const locationsResponse: LocationSearchResponse = await getLocationsWithBoundingBox(
          location,
          distance,
        )
        this.currentLocations = locationsResponse.results
        this.currentZips = this.currentLocations.map((location) => location.zip_code)
        this.totalLocationResults = locationsResponse.total
      } catch (error) {
        console.error(`Locations store: getNearbyLocations: Failed: ${error}`)
      } finally {
        this.loading = false
      }
    },
    async getCurrentLocation(zipcode: string) {
      console.log(`Getting location for ${zipcode}`)
      await getLocations([zipcode])
      if (this.currentLocations?.length > 0) {
        this.location = this.currentLocations[0]
      }
    },
  },
})
