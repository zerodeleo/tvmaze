import type { GroupKey, SortKey } from '@/interface'

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
  { key: 'premiered-asc', display: 'Premiered Early to Late' },
  { key: 'status', display: 'Status' },
  { key: 'network', display: 'Network' },
  { key: 'country', display: 'Country' },
  { key: 'language', display: 'Language' }
]
