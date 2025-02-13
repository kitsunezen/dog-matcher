import axiosInstance from './axiosInstance'
import axios from 'axios'
import type { LoginRequestBody, User } from '@/types/interfaces'

export const login = async (user: User): Promise<boolean> => {
  const body: LoginRequestBody = { name: user.name, email: user.email }
  const endpoint: string = 'https://frontend-take-home-service.fetch.com/auth/login'
  try {
    await axios.post(endpoint, body)
    return true
  } catch (error) {
    console.error(`authServices: Login failed: ${error}`)
    return false
  }
}

export const logout = async (): Promise<boolean> => {
  const endpoint: string = '/auth/logout'
  try {
    await axiosInstance.post(endpoint)
    return true
  } catch (error) {
    console.error(`authServices: Logout failed: ${error}`)
    return false
  }
}
