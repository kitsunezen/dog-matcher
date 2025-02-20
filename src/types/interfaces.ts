// import type { Coord } from '@turf/turf'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export interface Coordinates {
  lat: number
  lon: number
}

export interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export interface DogBreed {
  name: string
  selected: boolean
}

export interface DogsState {
  breeds: string[]
  currentSearch: {
    breed?: string
    page?: number
    sortOrder?: 'asc' | 'desc'
  }
  loading: boolean
  matchedDog: Dog
  searchResults?: Dog[]
  totalResults: number
}

export interface DogSearchParameters {
  breeds?: string[]
  zipCodes?: string[]
  ageMin?: number
  ageMax?: number
  size?: number
  from?: number
  // This should have its own type..
  sort?: string
}

export interface DogSearchResponse {
  resultIds: string[]
  total: number
  next?: string
  prev?: string
}

export interface Location {
  zip_code: string
  latitude: number
  longitude: number
  city: string
  state: string
  county: string
}

export interface LocationsState {
  boundingBoxSize: number
  boundingBoxLocations: Location[]
  currentLocations: Location[]
  currentZips: string[]
  loading: boolean
  location: Location
  totalLocationResults: number
}

export interface LocationSearchBody {
  city?: string
  states?: string[]
  geoBoundingBox?: {
    top?: Coordinates
    left?: Coordinates
    bottom?: Coordinates
    right?: Coordinates
    bottom_right?: Coordinates
    top_left?: Coordinates
  }
  size?: number
  from?: number
}

export interface LocationSearchResponse {
  results: Location[]
  total: number
}

export interface LoginRequestBody {
  name: string
  email: string
}

export interface ParamsState {
  params: DogSearchParameters
}

export interface User {
  name: string
  email: string
}
