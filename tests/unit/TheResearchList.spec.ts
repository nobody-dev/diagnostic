import { shallowMount } from '@vue/test-utils'
import TheResearchList from '@/components/TheResearchList.vue'

describe('TheResearchList', () => {
  it('should be render the component', () => {
    const wrapper = shallowMount(TheResearchList)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('[data-test-id="the-research-list"]')).toHaveLength(1)
  })
})
