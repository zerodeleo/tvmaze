//@ts-nocheck
import { beforeEach, describe, expect, it } from 'vitest'

import {
  groupByDotNotationKey,
  groupByGenre,
  getNestedValue,
  groupByKey,
  groupByYear,
  filterByRating,
  getValuesByKey,
  generateUniqueRandomNumber,
  getRandomNumber,
  numberExistsInArray,
  storeRandomNumbers,
  generateUniqueRandomNumber
} from './'
import type { Show, GroupedShow } from '@/interface/tvmaze'

describe('groupByDotNotationKey', () => {
  const data = [
    { id: 1, details: { category: 'A' } },
    { id: 2, details: { category: 'B' } },
    { id: 3, details: { category: 'A' } },
    { id: 4, details: { category: 'C' } },
    { id: 5, details: { category: 'B' } }
  ]

  it('should group objects by nested key using dot notation', () => {
    const result = groupByDotNotationKey(data, 'details.category')
    expect(result).toEqual([
      {
        groupKey: 'details',
        groupTitle: 'A',
        shows: [
          { id: 1, details: { category: 'A' } },
          { id: 3, details: { category: 'A' } }
        ]
      },
      {
        groupKey: 'details',
        groupTitle: 'B',
        shows: [
          { id: 2, details: { category: 'B' } },
          { id: 5, details: { category: 'B' } }
        ]
      },
      {
        groupKey: 'details',
        groupTitle: 'C',
        shows: [{ id: 4, details: { category: 'C' } }]
      }
    ])
  })

  it('should handle empty input array', () => {
    const result = groupByDotNotationKey([], 'details')
    expect(result).toEqual([])
  })

  it('should handle invalid dot notation keys', () => {
    const result = groupByDotNotationKey(data, 'invalid.key')
    expect(result).toEqual([])
  })
})

describe('groupByGenre', () => {
  const shows = [
    { title: 'Show 1', genres: ['Action', 'Adventure'] },
    { title: 'Show 2', genres: ['Drama'] },
    { title: 'Show 3', genres: ['Comedy', 'Romance'] },
    { title: 'Show 4', genres: ['Action', 'Thriller'] },
    { title: 'Show 5', genres: ['Comedy', 'Family'] }
  ]

  it('should group shows by genre', () => {
    const result: GroupedShow[] = groupByGenre(shows)
    expect(result).toEqual([
      {
        groupKey: 'genres',
        groupTitle: 'Action',
        shows: [
          { title: 'Show 1', genres: ['Action', 'Adventure'] },
          { title: 'Show 4', genres: ['Action', 'Thriller'] }
        ]
      },
      {
        groupKey: 'genres',
        groupTitle: 'Adventure',
        shows: [{ title: 'Show 1', genres: ['Action', 'Adventure'] }]
      },
      {
        groupKey: 'genres',
        groupTitle: 'Drama',
        shows: [{ title: 'Show 2', genres: ['Drama'] }]
      },
      {
        groupKey: 'genres',
        groupTitle: 'Comedy',
        shows: [
          { title: 'Show 3', genres: ['Comedy', 'Romance'] },
          { title: 'Show 5', genres: ['Comedy', 'Family'] }
        ]
      },
      {
        groupKey: 'genres',
        groupTitle: 'Romance',
        shows: [{ title: 'Show 3', genres: ['Comedy', 'Romance'] }]
      },
      {
        groupKey: 'genres',
        groupTitle: 'Thriller',
        shows: [{ title: 'Show 4', genres: ['Action', 'Thriller'] }]
      },
      {
        groupKey: 'genres',
        groupTitle: 'Family',
        shows: [{ title: 'Show 5', genres: ['Comedy', 'Family'] }]
      }
    ])
  })

  it('should handle empty array', () => {
    const result = groupByGenre([])
    expect(result).toEqual([])
  })

  it('should handle shows without genres', () => {
    const showsWithoutGenres = [
      { title: 'Show 1', genres: [] },
      { title: 'Show 2' },
      { title: 'Show 3', genres: ['Comedy', 'Drama'] }
    ]
    const result: GroupedShow[] = groupByGenre(showsWithoutGenres)
    expect(result).toEqual([
      {
        groupKey: 'genres',
        groupTitle: 'Comedy',
        shows: [{ title: 'Show 3', genres: ['Comedy', 'Drama'] }]
      },
      {
        groupKey: 'genres',
        groupTitle: 'Drama',
        shows: [{ title: 'Show 3', genres: ['Comedy', 'Drama'] }]
      }
    ])
  })
})

describe('getNestedValue', () => {
  it('should retrieve nested value from object', () => {
    const obj = {
      a: {
        b: {
          c: {
            d: 123
          }
        }
      }
    }
    expect(getNestedValue(obj, ['a', 'b', 'c', 'd'])).toBe(123)
  })

  it('should return undefined for non-existing keys', () => {
    const obj = {
      a: {
        b: {
          c: 123
        }
      }
    }
    expect(getNestedValue(obj, ['a', 'b', 'd'])).toBe(undefined)
  })

  it('should return undefined for non-existing object', () => {
    const obj = {
      a: {
        b: {
          c: 123
        }
      }
    }
    expect(getNestedValue(obj, ['x', 'b', 'd'])).toBe(undefined)
  })

  it('should return undefined for empty keys array', () => {
    const obj = {
      a: {
        b: {
          c: 123
        }
      }
    }
    expect(getNestedValue(obj, [])).toBe(undefined)
  })
})

describe('groupByKey', () => {
  const shows: Show[] = [
    { id: 1, title: 'Show 1', status: 'Released' },
    { id: 2, title: 'Show 2', status: 'In Production' },
    { id: 3, title: 'Show 3', status: 'Released' },
    { id: 4, title: 'Show 4', status: 'Post-production' },
    { id: 5, title: 'Show 5', status: 'In Production' }
  ]

  it('should group shows by the specified key', () => {
    const groupedByKey: GroupedShow[] = groupByKey(shows, 'status')
    expect(groupedByKey).toEqual([
      { groupKey: 'status', groupTitle: 'Released', shows: [shows[0], shows[2]] },
      { groupKey: 'status', groupTitle: 'In Production', shows: [shows[1], shows[4]] },
      { groupKey: 'status', groupTitle: 'Post-production', shows: [shows[3]] }
    ])
  })

  it('should handle empty array', () => {
    const emptyArray: Show[] = []
    const groupedByKey: GroupedShow[] = groupByKey(emptyArray, 'status')
    expect(groupedByKey).toEqual([])
  })

  it('should handle non-existing keys', () => {
    const groupedByKey: GroupedShow[] = groupByKey(shows, 'nonExistingKey')
    expect(groupedByKey).toEqual([])
  })
})

describe('groupByYear', () => {
  it('should handle shows with missing premiered date', () => {
    const shows = [
      { id: 1, title: 'Show 1', premiered: '2022-06-15' },
      { id: 2, title: 'Show 2' }, // Missing premiered date
      { id: 3, title: 'Show 3', premiered: '2023-04-08' },
      { id: 4, title: 'Show 4' }, // Missing premiered date
      { id: 5, title: 'Show 5', premiered: '2022-12-25' }
    ]
    const result = [
      { groupKey: 'premiered', groupTitle: '2022', shows: [shows[0], shows[4]] },
      { groupKey: 'premiered', groupTitle: '2023', shows: [shows[2]] }
    ]
    const groupedByYear = groupByYear(shows, 'premiered')
    expect(groupedByYear).toEqual(result)
  })

  it('should handle empty input array', () => {
    const shows: Show[] = []
    const result: GroupedShow[] = []
    const groupedByYear = groupByYear(shows, 'premiered')
    expect(groupedByYear).toEqual(result)
  })

  it('should handle invalid premiered date format', () => {
    const shows = [
      { id: 1, title: 'Show 1', premiered: '2022/06/15' }, // Invalid format
      { id: 2, title: 'Show 2', premiered: '2023-12-25' }
    ]
    const result: GroupedShow[] = [{ groupKey: 'premiered', groupTitle: '2023', shows: [shows[1]] }]
    const groupedByYear = groupByYear(shows, 'premiered')
    expect(groupedByYear).toEqual(result)
  })
})

describe('filterByRating', () => {
  const shows: Show[] = [
    { id: 1, title: 'Show 1', rating: { average: 7.5 } },
    { id: 2, title: 'Show 2', rating: { average: 6.8 } },
    { id: 3, title: 'Show 3', rating: { average: 8.2 } },
    { id: 4, title: 'Show 4', rating: { average: 7.5 } },
    { id: 5, title: 'Show 5', rating: { average: 6.5 } }
  ]

  it('should return shows equal to and higher than the specified rating', () => {
    const rating = 7
    const filteredShows = filterByRating(shows, rating)
    const expectedShows = shows.filter((show) => Math.floor(show.rating.average || 0) >= rating)
    expect(filteredShows).toEqual(expectedShows)
  })

  it('should return all shows if rating is not provided', () => {
    const filteredShows = filterByRating(shows, 0)
    expect(filteredShows).toEqual(shows)
  })

  it('should return empty array if no shows match the rating', () => {
    const rating = 9
    const filteredShows = filterByRating(shows, rating)
    expect(filteredShows).toEqual([])
  })
})

describe('getValuesByKey', () => {
  const data = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Alice', age: 25 },
    { id: 3, name: 'Bob', age: 35 },
    { id: 4, name: 'Alice', age: 28 },
    { id: 5, name: 'John', age: 32 }
  ]

  it('should return an array of unique values for the specified key', () => {
    const key = 'name'
    const result = getValuesByKey(data, key)
    const expectedValues = ['John', 'Alice', 'Bob']
    expect(result).toEqual(expectedValues)
  })

  it('should return an empty array if data is empty', () => {
    const key = 'name'
    const result = getValuesByKey([], key)
    expect(result).toEqual([])
  })

  it('should return an empty array if the specified key does not exist in any object', () => {
    const key = 'gender'
    const result = getValuesByKey(data, key)
    expect(result).toEqual([])
  })
})

describe('getRandomNumber', () => {
  it('should return a random number within the specified range', () => {
    const min = 1
    const max = 10
    const randomNumber = getRandomNumber(min, max)

    expect(randomNumber).toBeGreaterThanOrEqual(min)
    expect(randomNumber).toBeLessThanOrEqual(max)
  })
})

describe('numberExistsInArray', () => {
  it('should return true if number exists in the array', () => {
    const arr = [1, 2, 3]
    const number = 2

    const result = numberExistsInArray(arr, number)

    expect(result).toBe(true)
  })

  it('should return false if number does not exist in the array', () => {
    const arr = [1, 2, 3]
    const number = 4

    const result = numberExistsInArray(arr, number)

    expect(result).toBe(false)
  })
})

describe('storeRandomNumbers', () => {
  it('should store the array in localStorage', () => {
    const arr = [1, 2, 3]

    storeRandomNumbers(arr)

    const storedArr = JSON.parse(localStorage.getItem('random') || '[]')
    expect(storedArr).toEqual(arr)
  })
})

describe('generateUniqueRandomNumber', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should return a unique random number within the specified range', () => {
    const min = 1
    const max = 10

    const randomNumber = generateUniqueRandomNumber(min, max)

    const storedArr = JSON.parse(localStorage.getItem('random') || '[]')
    expect(storedArr).toContain(randomNumber)
  })
})
