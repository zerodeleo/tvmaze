import type { Control, GroupKey, SortKey } from '@/interface'

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
  { key: 'premiered-desc', display: 'Premiered Desc' },
  { key: 'premiered-asc', display: 'Premiered Asc' },
  { key: 'status', display: 'Status' },
  { key: 'network', display: 'Network' },
  { key: 'country', display: 'Country' },
  { key: 'language', display: 'Language' }
]

export const CONTROLS: Control[] = [
  { key: 'genres', display: 'Genres', isToggled: false },
  { key: 'ratings', display: 'Ratings', isToggled: false },
  { key: 'sortBy', display: 'Sort By', isToggled: false },
  { key: 'groupBy', display: 'Group By', isToggled: true }
]
