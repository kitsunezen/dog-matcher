import axiosInstance from './axiosInstance'
import type { LoginRequestBody, User } from '@/types/interfaces'

export const login = async (user: User): Promise<boolean> => {
  const body: LoginRequestBody = { name: user.name, email: user.email }
  const endpoint: string = '/auth/login'
  try {
    await axiosInstance.post(endpoint, body)
    // XXX Should check for 200 here, etc.
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
