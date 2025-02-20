import axiosInstance from './axiosInstance'
import type { AxiosResponse } from 'axios'
import qs from 'qs'
import breedsData from './data/breeds.json'
import type { Dog, DogBreed, DogSearchParameters, DogSearchResponse } from '@/types/interfaces'
// import { mask } from '@turf/turf'

export const getBreeds = async (): Promise<string[]> => {
  const endpoint: string = '/dogs/breeds'
  try {
    const response: AxiosResponse = await axiosInstance.get(endpoint)
    return response.data
  } catch (error) {
    console.log(`dogService: getBreeds failed: ${error}`)
    return []
  }
}
// export const searchDogs = async (params: DogSearchParameters): Promise<DogSearchResponse> => {
//   const endpoint: string = '/dogs/search'
//   const maxUrlLength = 1354 // Maximum allowed URL length
//   const minBatchSize = 5 // Minimum number of zip codes per batch

//   const calculateBatchSize = (params: DogSearchParameters): number => {
//     const baseParams = { ...params, zipCodes: [], breeds: [] }
//     const baseParamsLength = qs.stringify(baseParams, { arrayFormat: 'repeat' }).length
//     const breedsLength =
//       (params.breeds?.join(',').length || 0) + 'breeds='.length * (params.breeds?.length || 0)
//     const availableLength = maxUrlLength - baseParamsLength - breedsLength

//     // Estimate zip code length (including URL encoding)
//     const avgZipLength = 8 // Average length of a zip code when URL-encoded
//     const batchSize = Math.floor(availableLength / avgZipLength)

//     return Math.max(batchSize, minBatchSize)
//   }

//   const batchSize = calculateBatchSize(params)
//   let allResults: string[] = []
//   let totalCount = 0

//   for (let i = 0; i < (params.zipCodes?.length || 0); i += batchSize) {
//     const batchParams = {
//       ...params,
//       zipCodes: params.zipCodes?.slice(i, i + batchSize),
//     }
//     try {
//       const response: AxiosResponse = await axiosInstance.get(endpoint, {
//         params: batchParams,
//         paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
//       })
//       allResults = [...allResults, ...response.data.resultIds]
//       totalCount += response.data.total
//     } catch (error) {
//       console.error(`dogService: searchDogs batch request fails: ${error}`)
//     }
//   }

//   return { resultIds: allResults, total: totalCount }
// }

export const searchDogs = async (params: DogSearchParameters): Promise<DogSearchResponse> => {
  const maxUrlLength = 1354
  const zipCodes = params.zipCodes
  params.zipCodes = []
  const baseParamsLength = qs.stringify(params, { arrayFormat: 'repeat' }).length
  if (baseParamsLength < maxUrlLength && zipCodes && zipCodes.length > 0) {
    const allowableZipcodes = Math.floor((maxUrlLength - baseParamsLength) / 15)
    params.zipCodes = zipCodes?.slice(0, allowableZipcodes)
  }
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
export const getBreedsLocal = (): string[] => {
  try {
    // const breeds: DogBreed[] = []
    // let i: number = 0
    // for (i = 0; i < breedsData.length; i++) {
    //   breeds.push({ name: breedsData[i], selected: false })
    // }
    // return breeds // Return data directly from the imported JSON file
    return breedsData
  } catch (error) {
    console.log(`dogService: getBreedsLocal failed: ${error}`)
    return []
  }
}
