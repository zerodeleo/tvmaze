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
