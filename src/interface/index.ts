export type SortKey =
  | 'a-z'
  | 'ratings-asc'
  | 'ratings-desc'
  | 'updated-asc'
  | 'updated-desc'
  | 'premiered-asc'
  | 'premiered-desc'
  | 'unrated'

export type GroupKey =
  | 'genres'
  | 'rating'
  | 'premiered'
  | 'premiered-asc'
  | 'premiered-desc'
  | 'status'
  | 'language'
  | 'network'
  | 'country'

export interface Control {
  key: string
  display: string
  isToggled: boolean
}
