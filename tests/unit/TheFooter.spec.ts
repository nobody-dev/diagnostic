import { shallowMount } from '@vue/test-utils'
import TheFooter from '@/components/TheFooter.vue'

describe('TheFooter', () => {
  it('should be render the component', () => {
    const wrapper = shallowMount(TheFooter)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('[data-test-id="the-footer"]')).toHaveLength(1)
  })
})
