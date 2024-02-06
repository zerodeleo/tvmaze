//@ts-nocheck
import { mount } from '@vue/test-utils'
import ControlsMenu from '@/components/ControlsMenu.vue'
import { describe, expect, it } from 'vitest'
import { CONTROLS } from '@/constants'

describe('ControlsMenu', () => {
  it('toggles menu open state when clicked', async () => {
    const isMenuOpen = { value: false }
    const controls = { value: [] }
    const wrapper = mount(ControlsMenu, {
      global: {
        provide: {
          isMenuOpen,
          controls
        }
      }
    })
    const menuButton = wrapper.findComponent({ name: 'HamburgerMenuButton' })

    await menuButton.trigger('click')
    expect(isMenuOpen.value).toBe(true)

    await menuButton.trigger('click')
    expect(isMenuOpen.value).toBe(false)
  })

  it('closes menu and resets controls when handleCloseMenu is called', async () => {
    const isMenuOpen = { value: true }
    const controls = {
      value: CONTROLS
    }

    const wrapper = mount(ControlsMenu, {
      global: {
        provide: {
          isMenuOpen,
          controls
        }
      }
    })

    await wrapper.vm.handleCloseMenu()

    expect(isMenuOpen.value).toBe(false)
    expect(controls.value).toEqual(CONTROLS)
  })
})
