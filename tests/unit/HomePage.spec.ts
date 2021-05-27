import { shallowMount } from '@vue/test-utils'
import HomePage from '@/pages/index.vue'

describe('HomePage', () => {
  it('should be render the component', () => {
    const wrapper = shallowMount(HomePage)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('[data-test-id="home-page"]')).toHaveLength(1)
  })
})
