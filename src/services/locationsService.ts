import axiosInstance from './axiosInstance'
import { createBoundingBoxTurf } from '@/utils/handleCoords'
import type { AxiosResponse } from 'axios'
import type { Location, LocationSearchBody, LocationSearchResponse } from '@/types/interfaces'

export const getLocations = async (zipcodes: string[]): Promise<Location[]> => {
  const endpoint: string = '/locations'
  try {
    console.log('locationService.getLocations: Getting locations for:')
    console.log(zipcodes)
    const response: AxiosResponse<Location[]> = await axiosInstance.post(endpoint, zipcodes)
    const locations: Location[] = response.data
    console.log(`locationService.getLocations: Got ${locations.length} locations`)
    return locations
  } catch (error) {
    console.log(`locationsService: getLocations failed: ${error}`)
    return []
  }
}

export const getLocationsWithBoundingBox = async (
  location: Location,
  distance: number,
): Promise<LocationSearchResponse> => {
  const endpoint: string = '/locations/search'
  const boundingBox = createBoundingBoxTurf(location.latitude, location.longitude, distance)
  const body: LocationSearchBody = {
    geoBoundingBox: { bottom_right: boundingBox.bottomRight, top_left: boundingBox.topLeft },
    size: 1000,
  }
  try {
    const response: AxiosResponse<LocationSearchResponse> = await axiosInstance.post(endpoint, body)
    const searchResult: LocationSearchResponse = response.data
    return searchResult
  } catch (error) {
    console.error(`locationsService: getLocationsWithBoundingBox failse: ${error}`)
    return {
      results: [],
      total: 0,
    }
  }
}
