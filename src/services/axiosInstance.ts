import axios from 'axios'

// This is where it SHOULD come from..
// const apiBase: string = 'https://frontend-take-home-service.fetch.com'
// This is where I attempted to put my local proxy into production so as to make this Vue app work in production
// const apiBase: string = 'https://todd-parsons-fetch-proxy.netlify.app/.netlify/functions/api'
// And this, alas, is where it's pointing right now.
const apiBase: string = 'http://localhost:3000'

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: apiBase,
  // If the access token would actually install in the browser, we would just turn this on..
  // withCredentials: true,
})

export default axiosInstance
