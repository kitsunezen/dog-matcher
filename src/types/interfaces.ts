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
  breeds: DogBreed[]
  currentSearch: {
    breed: string | null
    page: number
    sortOrder: 'asc' | 'desc'
  }
  loading: boolean
  matchedDog: Dog
  searchResults: Dog[]
  totalResults: number
}

export interface Location {
  zip_code: string
  latitude: number
  longitude: number
  city: string
  state: string
  county: string
}

export interface LoginRequestBody {
  name: string
  email: string
}

export interface User {
  name: string
  email: string
}
