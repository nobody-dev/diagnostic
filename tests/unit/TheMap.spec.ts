import { shallowMount } from '@vue/test-utils'
import TheMap from '@/components/TheMap.vue'

describe('TheMap', () => {
  it('should be render the component', () => {
    const wrapper = shallowMount(TheMap)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('[data-test-id="the-map"]')).toHaveLength(1)
  })
})
