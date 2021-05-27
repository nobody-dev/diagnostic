import axios, { AxiosInstance } from 'axios'

const api = axios.create({
  baseURL: process.env.NUXT_ENV_API_URL
})

export function useApi (): AxiosInstance {
  return api
}
