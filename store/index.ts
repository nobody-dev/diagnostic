import Vue from 'vue'

import Vuex, {
  Store,
  StoreOptions
} from 'vuex'

import {
  RootState
} from './types'

import { city } from './city'
import { location } from './location'
import { research } from './research'
import { seo } from './seo'
import { asideMenu } from './asideMenu'

Vue.use(Vuex)

const storeOptions: StoreOptions<RootState> = {
  modules: {
    city,
    location,
    research,
    seo,
    asideMenu
  },

  state: {
    partnerId: null,
    assetVersion: null,
    isGtmVisible: false,
    gtmDimensionIndex: null,
    gtmBqHitSenderHost: '',
    gtmAccountCode: ''
  },

  mutations: {},

  actions: {
    async nuxtServerInit ({ dispatch }, { error }) {
      try {
        await Promise.all([
          dispatch('city/getCityList'),
          dispatch('city/getCurrentCity'),
          dispatch('research/getResearchList'),
          dispatch('research/getResearchAreaList')
        ])

        await Promise.all([
          dispatch('seo/getData'),
          dispatch('location/getLocationList')
        ])
      } catch (err) {
        error({
          statusCode: err.statusCode,
          message: err.message
        })
      }
    }
  }
}

const store = new Vuex.Store<RootState>(storeOptions)

export function useStore (): Store<RootState> {
  return store
}

export default useStore
