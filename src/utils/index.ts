import type { GroupKey, SortKey } from '@/interface'
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

export const group = (arr: Movie[], groupKey: string) => {
  switch (groupKey) {
    case 'genres':
      return groupByGenre(arr)
    case 'status':
      return groupByKey(arr, 'status').sort((a, b) => a[0].localeCompare(b[0]))
    case 'rating':
      return groupByDotNotationKey(arr, 'rating.average')
    case 'network':
      return groupByDotNotationKey(arr, 'network.name').sort((a, b) => a[0].localeCompare(b[0]))
    case 'country':
      return groupByDotNotationKey(arr, 'network.country.name').sort((a, b) =>
        a[0].localeCompare(b[0])
      )
    case 'language':
      return groupByKey(arr, 'language').sort((a, b) => a[0].localeCompare(b[0]))
    case 'premiered-asc':
      return groupByYear(arr)
    case 'ended-asc':
      return groupByYear(arr)
    case 'premiered-desc':
      return groupByYear(arr).reverse()
    case 'ended-desc':
      return groupByYear(arr).reverse()
    default:
      return groupByGenre(arr)
  }
}

const groupByYear = (arr: Movie[]) => {
  const cache = arr.reduce((cache: any, movie: Movie) => {
    const key = movie['premiered']?.slice(0, -6)
    if (!cache[key as keyof Movie]) {
      cache[key as keyof Movie] = []
    }
    cache[key as keyof Movie].push(movie)
    return cache
  }, {})
  return Object.entries(cache)
}

export const groupByGenre = (arr: Movie[]) => {
  const cache = arr.reduce((cache: any, movie) => {
    movie.genres.forEach((genre) => {
      if (!cache[genre]) {
        cache[genre] = []
      }
      cache[genre].push(movie)
    })
    return cache
  }, {})
  return Object.entries(cache)
}

const getNestedValue = (obj: any, keys: string[]) => {
  return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj)
}

export const groupByDotNotationKey = <T>(arr: T[], objKey: string) => {
  const cache: { [key: string]: T[] } = {}
  arr.forEach((movie: T) => {
    const value = getNestedValue(movie, objKey.split('.'))
    if (value !== null) {
      if (!cache[value]) {
        cache[value] = []
      }
      cache[value].push(movie)
    }
  })
  return Object.entries(cache)
}

export const groupByKey = (arr: Movie[], objKey: keyof Movie) => {
  const cache = arr.reduce((cache: any, movie: Movie) => {
    const key = movie[objKey]
    if (!cache[key]) {
      cache[key] = []
    }
    cache[key].push(movie)
    return cache
  }, {})
  return Object.entries(cache)
}

export const SORT_KEYS: { key: SortKey; display: string }[] = [
  { key: 'a-z', display: 'Alphabetical' },
  { key: 'ratings-asc', display: 'Ratings Low to High' },
  { key: 'ratings-desc', display: 'Ratings High to Low' },
  { key: 'updated-asc', display: 'Updated Low to High' },
  { key: 'updated-desc', display: 'Updated High to Low' },
  { key: 'premiered-asc', display: 'Premiered Low to High' },
  { key: 'premiered-desc', display: 'Premiered High to Low' },
  { key: 'unrated', display: 'Unrated' }
]

export const GROUP_KEYS: { key: GroupKey; display: string }[] = [
  { key: 'genres', display: 'Genres' },
  { key: 'rating', display: 'Rating' },
  { key: 'premiered-desc', display: 'Premiered Late to Early' },
  { key: 'ended-desc', display: 'Ended Late to Early' },
  { key: 'premiered-asc', display: 'Premiered Early to Late' },
  { key: 'ended-asc', display: 'Ended Early to Late' },
  { key: 'status', display: 'Status' },
  { key: 'network', display: 'Network' },
  { key: 'country', display: 'Country' },
  { key: 'language', display: 'Language' }
]
