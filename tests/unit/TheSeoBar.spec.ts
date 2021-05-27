import { shallowMount } from '@vue/test-utils'
import TheSeoBar from '@/components/TheSeoBar.vue'

describe('TheSeoBar', () => {
  it('should be render the component', () => {
    const wrapper = shallowMount(TheSeoBar)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('[data-test-id="the-seo-bar"]')).toHaveLength(1)
  })
})
