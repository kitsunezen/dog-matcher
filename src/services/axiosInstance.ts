import axios from 'axios'

const apiBase: string = 'https://frontend-take-home-service.fetch.com'

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: apiBase,
  withCredentials: true,
})

export default axiosInstance
