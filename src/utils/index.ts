import type { GroupKey, SortKey } from '@/interface'
import type { GroupedShow, Show } from '@/interface/tvmaze'

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

export const filterBySearchQuery = (arr: Show[], searchQuery: string) =>
  searchQuery
    ? arr.filter((item) => item.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))
    : arr

export const filterByGenre = (arr: Show[], genre: string) =>
  genre ? arr.filter((item) => item.genres.includes(genre)) : arr

export const filterByRating = (arr: Show[], rating: string) => {
  if (!rating) {
    return arr
  }
  const ratingFloor = Math.floor(+rating)
  return arr.filter(
    (item) => Math.floor(item.rating.average ? item.rating.average : 0) >= ratingFloor
  )
}

export const sortShows = (arr: Show[], sortKey: SortKey) => {
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

const generateGroupedShowArray = <T>(
  cache: { [key: string]: Show[] | T[] },
  groupKey: GroupKey
) => {
  return Object.entries(cache).map(([groupTitle, shows]) => ({
    groupKey,
    groupTitle,
    shows
  })) as GroupedShow[]
}

export const group = (arr: Show[], groupKey: GroupKey): GroupedShow[] => {
  switch (groupKey) {
    case 'genres':
      return groupByGenre(arr).sort((a, b) => a.groupTitle.localeCompare(b.groupTitle))
    case 'status':
      return groupByKey(arr, 'status').sort((a, b) => a.groupTitle.localeCompare(b.groupTitle))
    case 'rating':
      return groupByDotNotationKey<Show>(arr, 'rating.average').sort((a, b) =>
        a.groupTitle.localeCompare(b.groupTitle)
      )
    case 'network':
      return groupByDotNotationKey(arr, 'network.name').sort((a, b) =>
        a.groupTitle.localeCompare(b.groupTitle)
      )
    case 'country':
      return groupByDotNotationKey(arr, 'network.country.name').sort((a, b) =>
        a.groupTitle.localeCompare(b.groupTitle)
      )
    case 'language':
      return groupByKey(arr, 'language').sort((a, b) => a.groupTitle.localeCompare(b.groupTitle))
    case 'premiered-asc':
      return groupByYear(arr, 'premiered').sort((a, b) => a.groupTitle.localeCompare(b.groupTitle))
    case 'premiered-desc':
      return groupByYear(arr, 'premiered')
        .sort((a, b) => a.groupTitle.localeCompare(b.groupTitle))
        .reverse()
    default:
      return groupByGenre(arr)
  }
}

export const groupByYear = (arr: Show[], groupKey: GroupKey): GroupedShow[] => {
  const cache: { [year: string]: Show[] } = {}

  arr.forEach((show: Show) => {
    const key = show[groupKey as keyof Show]
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) {
      return
    }

    const year = show[groupKey as keyof Show]?.slice(0, 4)
    if (!year) {
      return
    }

    if (!cache[year]) {
      cache[year] = []
    }
    cache[year].push(show)
  })

  return generateGroupedShowArray(cache, groupKey)
}

export const groupByGenre = (arr: Show[]) => {
  const cache = arr.reduce((cache: any, show) => {
    if (!show.genres) {
      return cache
    }
    show.genres.forEach((genre) => {
      if (!cache[genre]) {
        cache[genre] = []
      }
      cache[genre].push(show)
    })
    return cache
  }, {})

  return generateGroupedShowArray(cache, 'genres')
}

export const groupByDotNotationKey = <T>(arr: T[], groupKey: string): GroupedShow[] => {
  const cache: { [key: string]: T[] } = {}
  arr.forEach((item: T) => {
    const value = getNestedValue(item, groupKey.split('.'))
    if (!value) {
      return
    }
    if (value) {
      if (!cache[value]) {
        cache[value] = []
      }
      cache[value].push(item)
    }
  })

  const key = groupKey.split('.')[0] as GroupKey

  const result = generateGroupedShowArray<T>(cache, key)

  return result
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

export const groupByKey = (arr: Show[], groupKey: GroupKey): GroupedShow[] => {
  const cache = arr.reduce((cache: any, show: Show) => {
    const key = show[groupKey as keyof Show]
    if (!key) {
      return cache
    }
    if (!cache[key]) {
      cache[key] = []
    }
    cache[key].push(show)
    return cache
  }, {})

  return generateGroupedShowArray(cache, groupKey)
}

export const getRandomNumber = (min: number, max: number) => {
  if (min >= max) {
    throw new Error('Min must be less than or equal to max')
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export const numberExistsInArray = (arr: number[], number: number) => {
  if (Array.isArray(arr)) {
    return arr.includes(number)
  }
  console.error('First argument is not an array')
  return 0
}

export const generateUniqueRandomNumber = (min: number, max: number): number => {
  const arr = getStoredRandomNumbers()

  let randomNumber
  do {
    randomNumber = getRandomNumber(min, max)
  } while (numberExistsInArray(arr, randomNumber))

  arr.push(randomNumber)
  storeRandomNumbers(arr)

  return randomNumber
}

const getStoredRandomNumbers = (): number[] => {
  let arr: any[] | string = localStorage.getItem('random') || []
  if (!Array.isArray(arr)) {
    arr = JSON.parse(arr)
  } else {
    if (arr.find((item: any) => typeof item !== 'number')) {
      console.warn('Not a numbers array, will return 0 as random number')
      return []
    }
  }
  return arr as number[]
}

export const storeRandomNumbers = (arr: number[]): void => {
  localStorage.setItem('random', JSON.stringify(arr))
}
