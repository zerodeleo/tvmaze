//@ts-nocheck
import { describe, expect, it } from 'vitest'

import {
  groupByDotNotationKey,
  groupByGenre,
  getNestedValue,
  groupByKey,
  groupByYear,
  filterByRating,
  getValuesByKey
} from './'
import type { Movie } from '@/interface/tvmaze'

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
      [
        'A',
        [
          { id: 1, details: { category: 'A' } },
          { id: 3, details: { category: 'A' } }
        ]
      ],
      [
        'B',
        [
          { id: 2, details: { category: 'B' } },
          { id: 5, details: { category: 'B' } }
        ]
      ],
      ['C', [{ id: 4, details: { category: 'C' } }]]
    ])
  })

  it('should handle objects with missing nested keys', () => {
    const invalidData = [
      { id: 1, details: { category: 'A' } },
      { id: 2 },
      { id: 3, details: { category: 'B' } }
    ]
    const result = groupByDotNotationKey(invalidData, 'details.category')
    expect(result).toEqual([
      ['A', [{ id: 1, details: { category: 'A' } }]],
      ['B', [{ id: 3, details: { category: 'B' } }]]
    ])
  })

  it('should handle empty input array', () => {
    const result = groupByDotNotationKey([], 'details.category')
    expect(result).toEqual([])
  })

  it('should handle invalid dot notation keys', () => {
    const result = groupByDotNotationKey(data, 'invalid.key')
    expect(result).toEqual([])
  })
})

describe('groupByGenre', () => {
  const movies = [
    { title: 'Movie 1', genres: ['Action', 'Adventure'] },
    { title: 'Movie 2', genres: ['Drama'] },
    { title: 'Movie 3', genres: ['Comedy', 'Romance'] },
    { title: 'Movie 4', genres: ['Action', 'Thriller'] },
    { title: 'Movie 5', genres: ['Comedy', 'Family'] }
  ]

  it('should group movies by genre', () => {
    const result = groupByGenre(movies)
    expect(result).toEqual([
      [
        'Action',
        [
          { title: 'Movie 1', genres: ['Action', 'Adventure'] },
          { title: 'Movie 4', genres: ['Action', 'Thriller'] }
        ]
      ],
      ['Adventure', [{ title: 'Movie 1', genres: ['Action', 'Adventure'] }]],
      ['Drama', [{ title: 'Movie 2', genres: ['Drama'] }]],
      [
        'Comedy',
        [
          { title: 'Movie 3', genres: ['Comedy', 'Romance'] },
          { title: 'Movie 5', genres: ['Comedy', 'Family'] }
        ]
      ],
      ['Romance', [{ title: 'Movie 3', genres: ['Comedy', 'Romance'] }]],
      ['Thriller', [{ title: 'Movie 4', genres: ['Action', 'Thriller'] }]],
      ['Family', [{ title: 'Movie 5', genres: ['Comedy', 'Family'] }]]
    ])
  })

  it('should handle empty array', () => {
    const result = groupByGenre([])
    expect(result).toEqual([])
  })

  it('should handle movies without genres', () => {
    const moviesWithoutGenres = [
      { title: 'Movie 1', genres: [] },
      { title: 'Movie 2' },
      { title: 'Movie 3', genres: ['Comedy', 'Drama'] }
    ]
    const result = groupByGenre(moviesWithoutGenres)
    expect(result).toEqual([
      ['Comedy', [{ title: 'Movie 3', genres: ['Comedy', 'Drama'] }]],
      ['Drama', [{ title: 'Movie 3', genres: ['Comedy', 'Drama'] }]]
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
  const movies = [
    { id: 1, title: 'Movie 1', status: 'Released' },
    { id: 2, title: 'Movie 2', status: 'In Production' },
    { id: 3, title: 'Movie 3', status: 'Released' },
    { id: 4, title: 'Movie 4', status: 'Post-production' },
    { id: 5, title: 'Movie 5', status: 'In Production' }
  ]

  it('should group movies by the specified key', () => {
    const groupedByKey = groupByKey(movies, 'status')
    expect(groupedByKey).toEqual([
      ['Released', [movies[0], movies[2]]],
      ['In Production', [movies[1], movies[4]]],
      ['Post-production', [movies[3]]]
    ])
  })

  it('should handle empty array', () => {
    const emptyArray: Movie[] = []
    const groupedByKey = groupByKey(emptyArray, 'status')
    expect(groupedByKey).toEqual([])
  })

  it('should handle non-existing keys', () => {
    const groupedByKey = groupByKey(movies, 'nonExistingKey')
    expect(groupedByKey).toEqual([])
  })
})

describe('groupByYear', () => {
  it('should extract year from string', () => {
    const movies = [{ id: 1, title: 'Movie 1', premiered: '2022-06-15' }]
    const result = [['2022', [movies[0]]]]
    const groupedByYear = groupByYear(movies, 'premiered')
    expect(groupedByYear[0][0]).toEqual(result[0][0])
  })
  it('should handle movies with missing premiered date', () => {
    const movies = [
      { id: 1, title: 'Movie 1', premiered: '2022-06-15' },
      { id: 2, title: 'Movie 2' }, // Missing premiered date
      { id: 3, title: 'Movie 3', premiered: '2023-04-08' },
      { id: 4, title: 'Movie 4' }, // Missing premiered date
      { id: 5, title: 'Movie 5', premiered: '2022-12-25' }
    ]
    const result = [
      ['2022', [movies[0], movies[4]]],
      ['2023', [movies[2]]]
    ]
    const groupedByYear = groupByYear(movies, 'premiered')
    expect(groupedByYear).toEqual(result)
  })

  it('should handle empty input array', () => {
    const movies: Movie[] = []
    const result: [string, Movie[]][] = []
    const groupedByYear = groupByYear(movies, 'premiered')
    expect(groupedByYear).toEqual(result)
  })

  it('should handle invalid premiered date format', () => {
    const movies = [
      { id: 1, title: 'Movie 1', premiered: '2022/06/15' }, // Invalid format
      { id: 2, title: 'Movie 2', premiered: '2023-12-25' }
    ]
    const result = [['2023', [movies[1]]]]
    const groupedByYear = groupByYear(movies, 'premiered')
    expect(groupedByYear).toEqual(result)
  })
})

describe('filterByRating', () => {
  const movies: Movie[] = [
    { id: 1, title: 'Movie 1', rating: { average: 7.5 } },
    { id: 2, title: 'Movie 2', rating: { average: 6.8 } },
    { id: 3, title: 'Movie 3', rating: { average: 8.2 } },
    { id: 4, title: 'Movie 4', rating: { average: 7.5 } },
    { id: 5, title: 'Movie 5', rating: { average: 6.5 } }
  ]

  it('should return movies with the specified rating', () => {
    const rating = 7
    const filteredMovies = filterByRating(rating, movies)
    const expectedMovies = movies.filter(
      (movie) => Math.floor(movie.rating.average || 0) === rating
    )
    expect(filteredMovies).toEqual(expectedMovies)
  })

  it('should return all movies if rating is not provided', () => {
    const filteredMovies = filterByRating(0, movies)
    expect(filteredMovies).toEqual(movies)
  })

  it('should return empty array if no movies match the rating', () => {
    const rating = 9
    const filteredMovies = filterByRating(rating, movies)
    expect(filteredMovies).toEqual([])
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
