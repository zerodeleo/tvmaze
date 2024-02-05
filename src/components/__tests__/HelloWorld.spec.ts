import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ControlBar from '../ControlBar.vue'

describe('ControlBar', () => {
  it('renders properly', () => {
    const wrapper = mount(ControlBar)
    expect(wrapper.text()).toContain('Group By')
  })
})
