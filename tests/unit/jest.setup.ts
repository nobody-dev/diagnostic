// import { Vue } from 'vue'
import { config, createLocalVue } from '@vue/test-utils'
const localVue = createLocalVue()

localVue.config.silent = true

// Mock Nuxt components
config.stubs.nuxt = { template: '<div></div>' }
config.stubs['nuxt-link'] = { template: '<a><slot /></a>' }
config.stubs['no-ssr'] = { template: '<span><slot /></span>' }
