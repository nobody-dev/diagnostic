import { shallowMount } from '@vue/test-utils'
import UiContainer from '@/components/UiContainer.vue'

describe('UiContainer', () => {
  it('should be render the component', () => {
    const wrapper = shallowMount(UiContainer)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('[data-test-id="ui-container"]')).toHaveLength(1)
    expect(wrapper.element.tagName).toBe('DIV')
  })

  describe('with tag property', () => {
    it('should be render the component', () => {
      const wrapper = shallowMount(UiContainer, {
        propsData: {
          tag: 'header'
        }
      })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.findAll('[data-test-id="ui-container"]')).toHaveLength(1)
      expect(wrapper.element.tagName).toBe('HEADER')
    })
  })
})
