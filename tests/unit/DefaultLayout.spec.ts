import { shallowMount } from '@vue/test-utils'
import DefaultLayout from '@/layouts/default.vue'

describe('DefaultLayout', () => {
  it('should be render the component', () => {
    const wrapper = shallowMount(DefaultLayout)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('[data-test-id="default-layout"]')).toHaveLength(1)
  })
})
