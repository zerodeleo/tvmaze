import type { Control, GroupKey, SortKey } from '@/interface'

export const SORT_KEYS: { key: SortKey; display: string }[] = [
  { key: 'a-z', display: 'Alphabetical' },
  { key: 'unrated', display: 'Unrated' },
  { key: 'ratings-asc', display: 'Ratings (asc)' },
  { key: 'ratings-desc', display: 'Ratings (desc)' },
  { key: 'updated-asc', display: 'Updated (asc)' },
  { key: 'updated-desc', display: 'Updated (desc)' },
  { key: 'premiered-asc', display: 'Premiered (desc)' },
  { key: 'premiered-desc', display: 'Premiered (desc)' }
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
  { key: 'options', display: 'Options', isToggled: false },
  { key: 'genres', display: 'Genres', isToggled: false },
  { key: 'ratings', display: 'Ratings', isToggled: false },
  { key: 'sortBy', display: 'Sort By', isToggled: false },
  { key: 'groupBy', display: 'Group By', isToggled: false }
]
