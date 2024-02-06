import { mount } from '@vue/test-utils'
import ControlsList from '@/components/ControlsList.vue'
import { expect, it, describe } from 'vitest'

describe('ControlsList', () => {
  it('renders control items correctly', () => {
    const controls = [
      { key: '1', display: 'Control 1', isToggled: false },
      { key: '2', display: 'Control 2', isToggled: false }
    ]
    const isMenuOpen = { value: false }

    const wrapper = mount(ControlsList, {
      global: {
        provide: {
          controls: controls,
          isMenuOpen: isMenuOpen
        }
      }
    })

    const controlItems = wrapper.findAll('button')
    expect(controlItems).toHaveLength(controls.length)

    controlItems.forEach((controlItem, index) => {
      expect(controlItem.text()).toBe(controls[index].display)
    })
  })
})
