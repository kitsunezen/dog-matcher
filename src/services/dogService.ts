import axiosInstance from './axiosInstance'
import type { AxiosResponse } from 'axios'
import qs from 'qs'
import breedsData from './data/breeds.json'
import type { Dog, DogBreed, DogSearchParameters, DogSearchResponse } from '@/types/interfaces'

export const getBreeds = async (): Promise<DogBreed[]> => {
  const endpoint: string = '/dogs/breeds'
  try {
    const breedsFromAPI: string[] = await axiosInstance.get(endpoint)
    const apiData = JSON.parse(breedsFromAPI[0])
    const breeds: DogBreed[] = []
    let i: number = 0
    for (i = 0; i < apiData.length; i++) {
      breeds.push({ name: apiData[i], selected: false })
    }
    return breeds
  } catch (error) {
    console.log(`dogService: getBreeds failed: ${error}`)
    return []
  }
}

export const searchDogs = async (params: DogSearchParameters): Promise<DogSearchResponse> => {
  const endpoint: string = '/dogs/search'
  try {
    const response: AxiosResponse = await axiosInstance.get(endpoint, {
      params,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      },
    })
    return response.data
  } catch (error) {
    console.error(`dogService: searchDogs fails: ${error}`)
    return { resultIds: [], total: 0 }
  }
}

export const getDogs = async (ids: string[]): Promise<Dog[]> => {
  const endpoint: string = '/dogs'
  try {
    // This should just return an array of dog objects
    const response: AxiosResponse = await axiosInstance.post(endpoint, ids)
    return response.data
  } catch (error) {
    console.error(`dogService: getDogs failed: ${error}`)
    return []
  }
}

export const getDogMatch = async (ids: string[]): Promise<Dog> => {
  const endpoint: string = '/dogs/match'
  try {
    const response: Dog = await axiosInstance.post(endpoint, ids)
    return response
  } catch (error) {
    console.error(`dogService: getDogMatch failed: ${error}`)
    return { id: '', img: '', name: '', age: 0, zip_code: '', breed: '' }
  }
}

// Fetch breeds from the local JSON file
export const getBreedsLocal = (): DogBreed[] => {
  try {
    const breeds: DogBreed[] = []
    let i: number = 0
    for (i = 0; i < breedsData.length; i++) {
      breeds.push({ name: breedsData[i], selected: false })
    }
    return breeds // Return data directly from the imported JSON file
  } catch (error) {
    console.log(`dogService: getBreedsLocal failed: ${error}`)
    return []
  }
}
