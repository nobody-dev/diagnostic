import { shallowMount } from '@vue/test-utils'
import TheSearchBar from '@/components/TheSearchBar.vue'

describe('TheSearchBar', () => {
  it('should be render the component', () => {
    const wrapper = shallowMount(TheSearchBar)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('[data-test-id="the-search-bar"]')).toHaveLength(1)
  })
})
