import type { GroupKey, SortKey } from '@/interface'
import type { Movie } from '@/interface/tvmaze'

export const getStartIndex = (currentPage: number, itemsPerPage: number) =>
  (currentPage - 1) * itemsPerPage
export const getEndIndex = (startIndex: number, itemsPerPage: number) => startIndex + itemsPerPage

export const getPaginatedData = <T>(data: T[], startIndex: number, endIndex: number): T[] =>
  data.slice(startIndex, endIndex)

export const getTotalPages = <T>(arr: T[], itemsPerPage: number) =>
  Math.ceil(arr!.length / itemsPerPage)

export const getValuesByKey = <T>(arr: T[] | null, key: string): string[] => {
  if (!arr) {
    return []
  }
  const values = arr
    .flatMap((d: any) => d[key])
    .reduce<string[]>((cache: any, value: any) => {
      if (!value) {
        return []
      }
      if (cache.includes(value)) {
        return cache
      } else {
        cache.push(value)
        return cache
      }
    }, [])
  return values
}

export const filterByGenre = (arr: Movie[], genre: string) =>
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

export const group = (arr: Movie[], groupKey: GroupKey) => {
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
      return groupByYear(arr, 'premiered')
    case 'ended-asc':
      return groupByYear(arr, 'ended')
    case 'premiered-desc':
      return groupByYear(arr, 'premiered').reverse()
    case 'ended-desc':
      return groupByYear(arr, 'ended').reverse()
    default:
      return groupByGenre(arr)
  }
}

export const groupByYear = (arr: Movie[], objKey: keyof Movie) => {
  const cache: { [year: string]: Movie[] } = {}

  arr.forEach((movie: Movie) => {
    const key = movie[objKey]
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) {
      return
    }

    const year = movie[objKey]?.slice(0, 4)
    if (!year) {
      return
    }

    if (!cache[year]) {
      cache[year] = []
    }
    cache[year].push(movie)
  })
  return Object.entries(cache)
}

export const groupByGenre = (arr: Movie[]) => {
  const cache = arr.reduce((cache: any, movie) => {
    if (!movie.genres) {
      return cache
    }
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

export const groupByDotNotationKey = <T>(arr: T[], objKey: string) => {
  const cache: { [key: string]: T[] } = {}
  arr.forEach((item: T) => {
    const value = getNestedValue(item, objKey.split('.'))
    if (!value) {
      return []
    }
    if (value) {
      if (!cache[String(value)]) {
        cache[String(value)] = []
      }
      cache[String(value)].push(item)
    }
  })
  return Object.entries(cache)
}

export const getNestedValue = <T>(obj: T, keys: string[]): any => {
  if (keys.length === 0) {
    return
  }
  return keys.reduce(
    (acc: any, key: any) => (acc && acc[key] !== undefined ? acc[key] : undefined),
    obj
  )
}

export const groupByKey = (arr: Movie[], objKey: keyof Movie) => {
  const cache = arr.reduce((cache: any, movie: Movie) => {
    const key = movie[objKey]
    if (!key) {
      return cache
    }
    if (!cache[key]) {
      cache[key] = []
    }
    cache[key].push(movie)
    return cache
  }, {})
  return Object.entries(cache)
}
