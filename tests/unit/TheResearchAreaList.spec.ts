import { shallowMount } from '@vue/test-utils'
import TheResearchAreaList from '@/components/TheResearchAreaList.vue'

describe('TheResearchAreaList', () => {
  it('should be render the component', () => {
    const wrapper = shallowMount(TheResearchAreaList)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('[data-test-id="the-research-area-list"]')).toHaveLength(1)
  })
})
