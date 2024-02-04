import type { SortKey } from '@/interface'
import type { Movie } from '@/interface/tvmaze'

export const getStartIndex = (currentPage: number, itemsPerPage: number) =>
  (currentPage - 1) * itemsPerPage
export const getEndIndex = (startIndex: number, itemsPerPage: number) => startIndex + itemsPerPage

export const getPaginatedData = <T>(data: T[], startIndex: number, endIndex: number): T[] =>
  data.slice(startIndex, endIndex)

export const getTotalPages = <T>(arr: T[], itemsPerPage: number) =>
  Math.ceil(arr!.length / itemsPerPage)

export const getValuesByKey = <T>(key: string, data: T[] | undefined): string[] => {
  if (data) {
    const values = data
      .flatMap((d: any) => d[key])
      .reduce<string[]>((cache, value) => {
        if (cache.includes(value)) {
          return cache
        } else {
          cache.push(value)
          return cache
        }
      }, [])
    return values
  }
  return []
}

export const deepFilterAndSortData = <T, U>(arr: T[], arr2: U[], key: string, sortKey: string) =>
  arr
    .filter((arr3: any) => arr2.every((r) => arr3[key].includes(r)))
    .sort((a: any, b: any) => a[sortKey].localeCompare(b[sortKey])) ?? []

export const filterByGenre = (genre: string, arr: Movie[]) =>
  genre ? arr.filter((item) => item.genres.includes(genre)) : arr

export const filterByRating = (rating: number, arr: Movie[]) => {
  if (!rating) {
    return arr
  }
  const ratingFloor = Math.floor(rating)
  return arr.filter(
    (item) => Math.floor(item.rating.average ? item.rating.average : 0) === ratingFloor
  )
}

export const sortMovies = (arr: Movie[], sortKey: SortKey) => {
  switch (sortKey) {
    case 'a-z':
      return arr.sort((a, b) => a.name.localeCompare(b.name))
    case 'ratings-asc':
      return arr
        .filter((a) => a.rating.average)
        .sort((a, b) => (a.rating.average || 0) - (b.rating.average || 0))
    case 'ratings-desc':
      return arr
        .filter((a) => a.rating.average)
        .sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0))
    case 'updated-asc':
      return arr.sort((a, b) => a.updated - b.updated)
    case 'updated-desc':
      return arr.sort((a, b) => b.updated - a.updated)
    case 'premiered-asc':
      return arr.sort(
        (a, b) => new Date(a.premiered || 0).getTime() - new Date(b.premiered || 0).getTime()
      )
    case 'premiered-desc':
      return arr.sort(
        (a, b) => new Date(b.premiered || 0).getTime() - new Date(a.premiered || 0).getTime()
      )
    case 'unrated':
      return arr.filter((a) => !a.rating.average)
    default:
      return arr
  }
}

export const SORT_KEYS = [
  { key: 'a-z', display: 'Alphabetical' },
  { key: 'ratings-asc', display: 'Ratings Low to High' },
  { key: 'ratings-desc', display: 'Ratings High to Low' },
  { key: 'updated-asc', display: 'Updated Low to High' },
  { key: 'updated-desc', display: 'Updated High to Low' },
  { key: 'premiered-asc', display: 'Premiered Low to High' },
  { key: 'premiered-desc', display: 'Premiered High to Low' },
  { key: 'unrated', display: 'Unrated' }
]
