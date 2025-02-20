import axios from 'axios'

// const apiBase: string = 'https://frontend-take-home-service.fetch.com'
// const apiBase: string = 'http://192.168.42.200:3000'
const apiBase: string = 'http://localhost:3000'

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: apiBase,
  // withCredentials: true,
})

export default axiosInstance
