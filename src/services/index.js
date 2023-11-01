import axios from 'axios'

const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const $apiWithToken = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

$apiWithToken.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  return {
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${token}` },
  }
})

export { $api, $apiWithToken }
