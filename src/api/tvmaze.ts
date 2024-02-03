import type { Movies } from '@/interface/tvmaze'
import axios from 'axios'

export const getMovies = async (page = 1): Promise<Movies> => {
  console.log(`fetching page ${page}...`)
  const response = await axios.get(`https://api.tvmaze.com/shows?page=${page}`)
  return response.data
}
