import { describe, expect, it } from 'vitest'
import {
  getStartIndex,
  getEndIndex,
  getPaginatedData,
  getTotalPages,
  getValuesByKey,
  deepFilterAndSortData
} from '@/utils'

describe('getStartIndex function', () => {
  it('should return correct start index', () => {
    expect(getStartIndex(1, 10)).toBe(0)
    expect(getStartIndex(2, 10)).toBe(10)
    expect(getStartIndex(3, 10)).toBe(20)
    // Add more test cases as needed
  })
})

describe('getEndIndex function', () => {
  it('should return correct end index', () => {
    expect(getEndIndex(0, 10)).toBe(10)
    expect(getEndIndex(10, 10)).toBe(20)
    expect(getEndIndex(20, 10)).toBe(30)
    // Add more test cases as needed
  })
})

describe('getPaginatedData function', () => {
  it('should return correct paginated data', () => {
    const testData = [1, 2, 3, 4, 5]
    expect(getPaginatedData(testData, 0, 3)).toEqual([1, 2, 3])
    expect(getPaginatedData(testData, 1, 4)).toEqual([2, 3, 4])
    // Add more test cases as needed
  })
})

describe('getTotalPages function', () => {
  it('should return correct total pages', () => {
    const testData = [1, 2, 3, 4, 5]
    expect(getTotalPages(testData, 2)).toBe(3)
    expect(getTotalPages(testData, 3)).toBe(2)
    // Add more test cases as needed
  })
})

describe('getValuesByKey function', () => {
  it('should return correct values', () => {
    const testData = [{ key: 'value1' }, { key: 'value2' }, { key: 'value3' }]
    expect(getValuesByKey('key', testData)).toEqual(['value1', 'value2', 'value3'])
    // Add more test cases as needed
  })

  it('should handle undefined data', () => {
    expect(getValuesByKey('key', undefined)).toEqual([])
  })
})

// Add tests for deepFilterAndSortData function if needed
