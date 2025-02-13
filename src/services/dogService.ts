import axiosInstance from './axiosInstance'
// import type { Dog } from '@/types/interfaces'

export const getBreeds = async (): Promise<string[]> => {
  const endpoint: string = '/dogs/breeds'
  try {
    const breeds: string[] = await axiosInstance.get(endpoint)
    return breeds
  } catch (error) {
    console.log(`dogService: getBreeds failed: ${error}`)
    return []
  }
}
