import type { Movies } from '@/interface/tvmaze'

export const getMovies = async (page = 1): Promise<Movies> => {
  const result = await fetch(`https://api.tvmaze.com/shows?page=${page}`)
  const data = await result.json()
  return data
}
