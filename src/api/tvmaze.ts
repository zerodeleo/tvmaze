import type { InfiniteResponse, Movie } from '@/interface/tvmaze'
import { generateUniqueRandomNumber } from '@/utils'
import axios, { type AxiosResponse } from 'axios'

export const getMovies = async (page = 1): Promise<Movie[]> => {
  console.log(`fetching page ${page}...`)
  const response = await axios.get(`https://api.tvmaze.com/shows?page=${page}`)
  return response.data
}

export const getInfiniteMovies = async ({ pageParam = 1 }): Promise<InfiniteResponse> => {
  try {
    const randomNumber = generateUniqueRandomNumber(1, 300)
    const isTouchScreen = window.matchMedia('(pointer: coarse)').matches
    const fetchMaxPages = isTouchScreen ? 1 : 5
    const response: AxiosResponse<Movie[], Error> = await axios.get(
      `https://api.tvmaze.com/shows?page=${randomNumber}`
    )
    return {
      pageData: response?.data || [],
      nextCursor: pageParam === fetchMaxPages ? undefined : pageParam + 1
    }
  } catch (err) {
    console.error(err)
    throw new Error("Couldn't fetch")
  }
}
