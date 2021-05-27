import { shallowMount } from '@vue/test-utils'
import TheHeader from '@/components/TheHeader.vue'

describe('TheHeader', () => {
  it('should be render the component', () => {
    const wrapper = shallowMount(TheHeader)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('[data-test-id="the-header"]')).toHaveLength(1)
  })
})
