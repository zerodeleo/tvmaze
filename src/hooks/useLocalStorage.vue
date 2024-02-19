<script lang="ts">
import { GROUP_KEYS, SORT_KEYS } from '@/constants'
import { watch, inject, ref } from 'vue'

export default function useLocalStorage() {
  const selectedGenre = inject('selectedGenre', ref(''))
  const selectedRating = inject('selectedRating', ref(''))
  const sortKey = inject('sortKey', ref(SORT_KEYS[0]))
  const groupKey = inject('groupKey', ref(GROUP_KEYS[0]))
  const isMenuOpen = inject('isMenuOpen', ref(false))

  watch(selectedGenre, (newValue) => {
    if (newValue) {
      localStorage.setItem('selectedGenre', newValue)
    }
  })

  watch(selectedRating, (newValue) => {
    if (newValue) {
      localStorage.setItem('selectedRating', newValue.toString())
    }
  })

  watch(sortKey, (newValue) => {
    if (newValue) {
      localStorage.setItem('sortKey', newValue.toString())
    }
  })

  watch(groupKey, (newValue) => {
    if (newValue) {
      localStorage.setItem('groupKey', newValue.toString())
    }
  })

  watch(isMenuOpen, (newValue) => {
    localStorage.setItem('isMenuOpen', newValue ? newValue.toString() : '')
  })
}
</script>
