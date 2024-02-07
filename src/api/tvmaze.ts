import type { InfiniteResponse, Show } from '@/interface/tvmaze'
import { generateUniqueRandomNumber } from '@/utils'
import axios, { type AxiosResponse } from 'axios'

export const getShows = async (page = 1): Promise<Show[]> => {
  const response = await axios.get(`https://api.tvmaze.com/shows?page=${page}`)
  return response.data
}

export const getInfiniteShows = async ({ pageParam = 1 }): Promise<InfiniteResponse> => {
  const randomNumber = generateUniqueRandomNumber(1, 300)
  const response: AxiosResponse<Show[], Error> = await axios.get(
    `https://api.tvmaze.com/shows?page=${randomNumber}`
  )
  return {
    pageData: response?.data || [],
    nextCursor: pageParam + 1
  }
}

export const getShowBySearchQuery = async ({
  searchQuery
}: {
  searchQuery: string
}): Promise<Show | null> => {
  if (searchQuery === '') {
    return null
  }
  const response: AxiosResponse<Show, Error> = await axios.get(
    `https://api.tvmaze.com/singlesearch/shows?q=${searchQuery}`
  )
  return response?.data || null
}

export const getShowById = async ({ id }: { id: number }) => {
  const response: AxiosResponse<Show, Error> = await axios.get(`https://api.tvmaze.com/shows/${id}`)
  return response?.data || null
}
