import axiosInstance from './axiosInstance'
import breedsData from './data/breeds.json'
import type { DogBreed } from '@/types/interfaces'

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
