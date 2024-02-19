import type { InfiniteResponse, Show } from '@/interface/tvmaze'
import { reSyncAtPage } from '@/utils'
import axios, { AxiosError, type AxiosResponse } from 'axios'

export const getShows = async (page = 1): Promise<Show[]> => {
  const response = await axios.get(`https://api.tvmaze.com/shows?page=${page}`)
  return response.data
}

export const getInfiniteShows = async ({
  pageParam = 0
}: {
  pageParam: number
}): Promise<InfiniteResponse | undefined> => {
  try {
    const prevShowIdLs = localStorage.getItem('next_show_id')
    const prevShowId = prevShowIdLs ? +prevShowIdLs : 1

    const response: AxiosResponse<Show[], Error> = await axios.get(
      `https://api.tvmaze.com/shows?page=${pageParam}`
    )

    const pageData = response?.data
    const nextShowId = pageData.length + prevShowId + 1
    const nextCursor = reSyncAtPage(nextShowId) + pageParam

    return {
      pageData,
      nextCursor
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 404) {
        localStorage.setItem('next_show_id', '1')
        return {
          pageData: [],
          nextCursor: 0
        }
      }
    }
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
